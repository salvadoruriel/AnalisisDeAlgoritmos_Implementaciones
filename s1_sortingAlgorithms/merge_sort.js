const mergeSort = (A,p,r) => {
  if(p<r){
    var q = Math.floor( (p+r) /2 );
    mergeSort(A,p,q);
    mergeSort(A,q+1,r);
    merge(A,p,q,r);
  }
  return A; //opcional
}

export default mergeSort;

const merge = (A,p,q,r) => {
  var n1 = q-p+1;
  var n2 = r-q;
  var L = new Array(n1+1);
  var R = new Array(n2+1);
  for(var i=0; i < n1; i++)
    L[i] = A[p+i]
    //L[i] = A[p+i-1] //causa error
  for(var j=0; j < n2; j++)
    R[j] = A[q+j +1]
    //R[j] = A[q+j] //repite elementos
  L[n1] = Number.MAX_SAFE_INTEGER //sentinela en JavaS
  R[n2] = Number.MAX_SAFE_INTEGER
  i = 0
  j = 0
  for(var k = p; k <= r; k++){
    if(L[i] !=Number.MAX_SAFE_INTEGER && L[i] <= R[j]){
      A[k] = L[i]
      i = i+1
    }
    else {
      A[k] = R[j]
      j = j+1
    }
  }
}
//Se puede cambiar Number.MAX_SAFE_INTEGER por Number.MAX_VALUE
//  para garantizar a casi cualquier valor el sentinela.
//  Pero para ilustrar el algoritmo es suficiente asi.