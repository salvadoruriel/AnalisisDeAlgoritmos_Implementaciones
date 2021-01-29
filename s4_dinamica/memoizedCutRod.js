const memoized_cut_rod = (p, n) => {
  var r = new Array(n + 1); //0..n
  for (var i = 0; i <= n; i++)
    r[i] = Number.MIN_SAFE_INTEGER; //sentinela en JavaScript
  return memoized_cut_rod_aux(p, n, r);
}
const memoized_cut_rod_aux = (p, n, r) => {
  if (r[n] >= 0)
    return r[n];
  var q;
  if (n == 0)
    q = 0;
  else {
    q = Number.MIN_SAFE_INTEGER; //sentinela negativo en JavaScript
    for (var i = 1; i <= n; i++) {
      var temp = p[i-1] + memoized_cut_rod_aux(p, n - i, r)
      q = (q > temp) ? q : temp; //max implementation
    }
  }
  r[n] = q;
  //console.log(r);
  return q;
}

const wrapMemCut = (...rest) => {
  //console.log(rest[0])
  var time0 = performance.now();
  var ans = memoized_cut_rod(rest[0], rest[0].length);
  var time1 = performance.now();

  ///Prepare answer and print/////////////////777
  var answer = '';
  answer += '<div style="display: inline-block;">';
  answer += '<p> Respuesta: ' + ans + '</p>';
  answer += '<p> Tiempo de MEMOIZED-CUT-ROD: ' + Number((time1 - time0).toFixed(11)) + '</p>';
  
  answer += '</div>';
  return answer;
}
export default wrapMemCut;