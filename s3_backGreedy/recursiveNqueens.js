var Ans = []
//Arr.push() sends new objects to the end
const recursiveNqueens = (Q, r) => {
  //console.log(Q)
  if (r == Q.length)
    Ans.push([...Q]);//print(Q); 
  else
    for (var j = 0; j < Q.length; j++) {
      var legal = true
      for (var i = 0; i <= r - 1; i++)
        if (Q[i] == j || Q[i] == j + r - i || Q[i] == j - r + i) legal = false
      if (legal) {
        Q[r] = j;
        recursiveNqueens(Q, r + 1);
      }
    }
}

const wrapQueens = (...rest) => {
  Ans = []; //empty array to print
  var Arr = new Array(rest[0]);
  recursiveNqueens(Arr, 0);
  /*
  console.log("---------")
  console.log(Arr)
  console.log(Ans)*/
  return Ans;
}

export default wrapQueens;

