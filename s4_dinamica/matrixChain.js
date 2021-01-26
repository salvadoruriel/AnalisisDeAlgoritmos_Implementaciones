var sri = 1, sci = 2; //s row/col inicio desplazo//introducido por listas raras
const matrix_chain_order = (p) => {
  var n = p.length - 1;
  //let m and s be new tables //dice pseudocodigo de Cormen
  //Array(row).fill(null).map(() => Array(col).fill(0));
  //m is n by n //1..n,1..n //or 0..n-1,0..n-1
  var m = Array(n).fill(null).map(() => Array(n).fill(null));
  var mri = 1, mci = 1; //m row/col inicio desplazo
  //s is n-1 by n-1 //1..n-1,2..n //or 0..n-1,0..n-1
  var s = Array(n - 1).fill(null).map(() => Array(n - 1).fill(null));
  //sri = 1, sci = 2;//desplazo //movido a ajuste global
  for (var i = 0; i < n; i++)//i=1 to n
    m[i][i] = 0;
  for (var l = 2; l <= n; l++)//l=2 to n //l is the chain length
    for (var i = 1; i <= n - l + 1; i++) {//i=1 to n-l+1
      var j = i + l - 1;
      m[i - mri][j - mci] = Number.MAX_SAFE_INTEGER; //sentinela en JavaScript
      for (var k = i; k <= j - 1; k++) {//k=i to j-1
        var q = m[i - mri][k - mci]
          + m[k + 1 - mri][j - mci]
          + p[i - 1] * p[k] * p[j];
        if (q < m[i - mri][j - mci]) {
          m[i - mri][j - mci] = q;
          s[i - sri][j - sci] = k;
        }
      }
    }
  return { m, s };
}

var AnsMat = [];///////////////////PRINT-OPTIMAL-PARENTS
const print_optimal_parents = (s, i, j) => {
  if (i == j)
    AnsMat.push('A<sub>' + i.toString()+'</sub>');//print 'A'_i;
  else {
    AnsMat.push('(');//print '('
    print_optimal_parents(s, i, s[i - sri][j - sci]);
    print_optimal_parents(s, s[i - sri][j - sci] + 1, j);
    AnsMat.push(')');//print ')'
  }
}


const wrapMatrixChain = (...rest) => {
  var p = rest[0];
  //MATRIX-CHAIN-ORDER//////////////////
  var time0 = performance.now();
  var { m, s } = matrix_chain_order(p);
  var time1 = performance.now();
  //console.table(m);
  //console.table(s);

  //ordering html pretty answer/////////////////
  var temp;
  var hpx = 40  +2, wpx = 40 +2//px + padding in both directions
  var htot = hpx * m.length + (m.length);//cells + border, only 1 direction border
  var wtot = wpx * m[0].length + (m.length);
  //diagonal dimmension for correct square output, +1 for table border bottom and right
  var size = Math.ceil( Math.sqrt(htot * htot + wtot * wtot) )+1; //c = sqrt( a^2 +b^2)
  var answer = '';
  answer += '<div style="display: inline-flex; justify-content: center; align-items: center;'
  answer += ' height:' + size.toString() + 'px;';
  answer += ' width:' + size.toString() + 'px;';
  answer += '">'
  answer += '<table style="display: inline-block; transform: rotate(-45deg); empty-cells: hide;">';
  for (var row = 0; row < m.length; row++) {
    //answer += '<p>' + c[row].toString() + '</p>';
    answer += '<tr>';
    for (var col = 0; col < m[row].length; col++) {
      //console.log(row, col, temp)
      //if (!temp && temp !== 0) continue; //is null
      temp = m[row][col];
      temp = (!temp && temp !== 0) ? '' : temp.toString(); //better to hide empty-cells
      answer += '<td style="width: 40px; height: 40px; transform: rotate(45deg); text-align:center;">' + temp + '</td>';
    }
    answer += '</tr>';
  }
  answer += '</table>';
  answer += '</div>'
  //console.log(answer)

  htot = hpx * s.length + (s.length);//cells + border, only 1 direction border
  wtot = wpx * s[0].length + (s.length);
  //diagonal dimmension for correct square output, +1 for table border bottom and right
  size = Math.ceil( Math.sqrt(htot * htot + wtot * wtot) ) +1; //c = sqrt( a^2 +b^2)
  answer += '';
  answer += '<div style="display: inline-flex; justify-content: center; align-items: center;'
  answer += ' height:' + size.toString() + 'px;';
  answer += ' width:' + size.toString() + 'px;';
  answer += '">'
  answer += '<table style="display: inline-block;  transform: rotate(-45deg); empty-cells: hide;">';
  for (var row = 0; row < s.length; row++) {
    answer += '<tr>';
    for (var col = 0; col < s[row].length; col++) {
      temp = s[row][col];
      temp = (!temp && temp !== 0) ? '' : temp.toString();
      answer += '<td style="width: 40px; height: 40px; transform: rotate(45deg); text-align:center;">' + temp + '</td>';
    }
    answer += '</tr>';
  }
  answer += '</table>';
  answer += '</div>'

  AnsMat = [];
  ///////////////////PRINT-OPTIMAL-PARENTS
  var time2 = performance.now();
  //print_optimal_parents(s, 0, p.length - 1);  //ajustado con variable desplazo
  print_optimal_parents(s, 1, p.length - 1); //initial call de Cormen pg.377 //n= p.length - 1
  var time3 = performance.now();
  //console.log(AnsMat.join(''));
  //console.log(AnsMat.toString());
  answer += '<div style="display: inline-block;">';
  answer += '<p> Respusta SCML: ' + AnsMat.join('') + '</p>';
  answer += '<p> Tiempo de MATRIX-CHAIN-ORDER: ' + Number((time1 - time0).toFixed(11)); + '</p>';
  answer += '<p> Tiempo de PRINT-OPTIMAL-PARENTS: ' + Number((time3 - time2).toFixed(11)); + '</p>';
  answer += '</div>';

  return answer; //print HTML ready answer
}
export default wrapMatrixChain;