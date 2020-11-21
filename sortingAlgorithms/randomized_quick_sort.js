const randomizedQuickSort = (A,p,r) =>{
  if(p<r){
    var q = randomized_partition(A,p,r)
    randomizedQuickSort(A,p,q-1)
    randomizedQuickSort(A,q+1,r)
  }
  return A; //opcional
}

export default randomizedQuickSort;

const randomized_partition = (A,p,r) =>{
  //intervalo (p,r) inclusivo a r con el +1
  var i = Math.floor(Math.random() * (r-p +1) ) + p;
  [A[r],A[i]] = [A[i],A[r]] //swap in Javascript
  return partition(A,p,r)
}

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