const quickSort = (A,p,r) =>{
  if(p<r){
    var q = partition(A,p,r)
    quickSort(A,p,q-1)
    quickSort(A,q+1,r)
  }
  return A; //opcional
}

export default quickSort;

const partition = (A,p,r) =>{
  var x = A[r];
  var i = p-1;
  for(var j = p; j<=r-1 ;j++){
    if(A[j] <= x){
      i = i+1;
      [A[i],A[j]] = [A[j],A[i]];
    }
  }
  [A[i+1],A[r]] = [A[r],A[i+1]]
  return i+1;
}