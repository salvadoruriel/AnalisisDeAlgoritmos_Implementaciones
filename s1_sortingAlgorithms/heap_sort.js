//NOTA: en JavaScript como los Arrays son objetos,
//  es valido hacer el elemento heap size y usarlo
//  como en el pseudo codigo:
const heapSort = (A) =>{
  build_max_heap(A);
  for(var i= A.length -1; i>=1 ; i--){
    [A[0] , A[i]] = [A[i], A[0]]; //swap values in JS
    A.heapsize = A.heapsize -1;
    max_heapify(A,0);
  }
  return A; //opcional
}

export default heapSort;

const build_max_heap = (A) =>{
  A.heapsize = A.length -1;
  for(var i = Math.floor(A.length /2); i>=0 ;i--)
    max_heapify(A,i);
}

const max_heapify = (A,i) => {
  var l = left(i);
  var r = right(i);
  if(l <= A.heapsize && A[l] > A[i])
    var largest = l
  else var largest = i
  if(r <= A.heapsize && A[r] > A[largest])
    largest = r
  if(largest != i){
    [A[i] , A[largest]] = [A[largest], A[i]];
    max_heapify(A,largest);
  }
}

const parent = i => Math.floor(i/2);
const left = i => 2*i;
const right = i => 2*i +1;