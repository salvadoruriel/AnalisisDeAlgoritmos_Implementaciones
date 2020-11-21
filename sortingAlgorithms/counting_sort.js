const countingSort = (A,B,k) => {
  var C = new Array(k+1);//arreglo auxiliar de 0 a k inclusivo
  for(var i = 0; i<=k ; i++)
    C[i] = 0;
  for(var j = 0; j < A.length ; j++)
    C[A[j]] = C[A[j]] +1;
  for(var i = 1; i<=k ; i++)
    C[i] = C[i] +C[i-1];
  for(var j = A.length-1; j >= 0  ; j--){
    B[C[A[j]]] = A[j];
    C[A[j]] = C[A[j]] -1;
  }
  B.shift(); //quita primer elemento, necesario por las listas en pseudocodigo.
  return B; //ordered array
}

export default countingSort;