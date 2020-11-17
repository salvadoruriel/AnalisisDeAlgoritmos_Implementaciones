const selectionSort = (A) => {
  for(var i=0; i< A.length -1; i++){
    var key = i;
    var min= A[i];
    for(var j=i+1; j < A.length; j++){
      if(A[j] < min){
        key = j
        min = A[j]
      }
    }
    min = A[i]
    A[i] = A[key]
    A[key] = min
  }
  return A;
}

export default selectionSort;