const lcs_length = (X, Y) => {
  var m = X.length;
  var n = Y.length;
  //could also use:
  //Array(row).fill(null).map(() => Array(col).fill(0));
  var b = [];//let b and c be new tables //dice pseudocodigo de Cormen
  for (var row = 0; row <= m - 1; row++)//0 to m-1,0 to n-1//m by n
    b[row] = new Array(n);
  var c = [];
  for (var row = 0; row <= m; row++)//or 0 to m,0 to n //m+1 by n+1
    c[row] = new Array(n + 1);
  //console.log(b, c);
  //line 4 in pseudocode vvvvvvvv
  for (var i = 0; i <= m; i++)
    c[i][0] = 0;
  for (var j = 0; j <= n; j++)
    c[0][j] = 0;
  //console.table(b);
  //console.table(c);
  for (var i = 1; i <= m; i++)//0 to m-1,0 to n-1 //or 1 to m,1 to n
    for (var j = 1; j <= n; j++) {
      //console.log(i, j);
      if (X[i - 1] == Y[j - 1]) {
        c[i][j] = c[i - 1][j - 1] + 1;
        b[i - 1][j - 1] = "↖";//fixes unaligned tables
      }
      else if (c[i - 1][j] >= c[i][j - 1]) {
        c[i][j] = c[i - 1][j];
        b[i - 1][j - 1] = "↑";
      }
      else {
        c[i][j] = c[i][j - 1];
        b[i - 1][j - 1] = "←";
      }
    }
  return { c, b };
}

var AnsLcs = []

const print_lcs = (b, X, i, j) => {
  if (i == -1 || j == -1)//to nonexistent 0, but in js should be -1
    return;
  if (b[i][j] == "↖") {
    print_lcs(b, X, i - 1, j - 1);
    AnsLcs.push(X[i]);//print x_i;
  }
  else if (b[i][j] == "↑")
    print_lcs(b, X, i - 1, j);
  else print_lcs(b, X, i, j - 1);
}

const wrapLCS = (...rest) => {
  var X = rest[0];
  var Y = rest[1];
  //console.log(X, Y);
  var time0 = performance.now();
  var { c, b } = lcs_length(X, Y);
  var time1 = performance.now();
  //console.table(b);
  //console.table(c);

  //ordering html pretty answer/////////////////
  let m = X.length; //rows
  let n = Y.length; //cols
  //c is [0...m][0...n] //or 0 to m,0 to n  //m+1 by n+1
  //var answer = '<div style="display: inline-block;">';
  var answer = '<table style="display: inline-block; table-layout: fixed">';
  for (var row = 0; row <= m; row++) {
    //answer += '<p>' + c[row].toString() + '</p>';
    answer += '<tr>';
    for (var col = 0; col < c[row].length; col++) {
      //console.log(row,col,c[row][col],c[row][col].toString())
      answer += '<td style="width: 16px; height: 20px;">' + c[row][col].toString() + '</td>';
    }
    answer += '</tr>';
  }
  //answer += '</div>';
  answer += '</table>';
  //console.log(answer)
  //b is [1...m][1...n] //or 0 to m-1,0 to n-1 //m by n
  answer += '<table style="display: inline-block;">';
  for (var row = 0; row <= m - 1; row++) {
    //answer += '<p>' + b[row].toString() + '</p>';
    answer += '<tr>';
    for (var col = 0; col < b[row].length; col++)
      answer += '<td style="width: 16px; height: 20px;">' + b[row][col] + '</td>';//should already be a string
    answer += '</tr>';
  }
  answer += '</table>';

  AnsLcs = [];
  ///////////////////PRINT_LCS
  var time2 = performance.now();
  print_lcs(b, X, X.length - 1, Y.length - 1); //initial call de Cormen pg.395
  var time3 = performance.now();
  console.log(AnsLcs);
  answer += '<div style="display: inline-block;">';
  answer += '<p> Respusta SCML: ' + AnsLcs.toString() + '</p>';
  answer += '<p> Tiempo de LCS-LENGTH: ' + Number((time1 - time0).toFixed(11)); + '</p>';
  answer += '<p> Tiempo de &emsp;PRINT-LCS: ' + Number((time3 - time2).toFixed(11)); + '</p>';
  answer += '</div>';

  return answer; //print HTML ready answer
}
export default wrapLCS;