const recursive_activity_selector = (S, F, k, n) => {
  var m = k + 1;
  while (m <= n && S[m] < F[k]) //find the first activity in Sk to finish
    m = m + 1;
  if (m <= n) { //returning union set
    var Aux = recursive_activity_selector(S, F, m, n);
    //console.log(Aux);
    if (!Array.isArray(Aux)) return [m, Aux];//Aux is null or single value
    else return [m, ...Aux];
  }
  else return null;
}
export const wrapRecurActSelect = (...rest) => {
  var S = rest[0];
  var F = rest[1];
  //starts in first node -1, to count the actual first node,
  //mentions Cormen in pg.419 and in diagram pg.420
  var answer = recursive_activity_selector(S, F, -1, F.length - 1);
  //console.log(answer)
  return answer;
}


const greedy_activity_selector = (S, F) => {
  var n = S.length;
  var A = [0]; //first activity {a1}
  var k = 0;
  for (var m = 2; m < n; m++) {
    if (S[m] >= F[k]) {
      //A = Array.isArray(A) ? [...A, m] : [A, m];
      A = [...A, m];
      k = m;
    }
  }
  return A;
}
export const wrapGreedyActSelect = (...rest) => {
  var S = rest[0];
  var F = rest[1];
  var answer = greedy_activity_selector(S, F);
  return answer;
}