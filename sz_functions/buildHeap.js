////MIN-HEAP///////////////////////////////////////////////////////
//supports objects
//can receive property as extra parameter to min heap a list A of objects 
//property must be string if thats the case
export const build_min_heap = (A,...rest) =>{
  A.heapsize = A.length -1;
  if(rest && rest.length > 0)//if rest is not empty //use property to compare/evaluate
    for(var i = Math.floor(A.length /2); i>=0 ;i--)
      custom_min_heapify(A,i,rest[0]);
  else//rest is empty, normal array of numbers
    for(var i = Math.floor(A.length /2); i>=0 ;i--)
      min_heapify(A,i);
}
const min_heapify = (A,i) => {
  var l = left(i);
  var r = right(i);
  if(l <= A.heapsize && A[l] < A[i])
    var smallest = l;
  else var smallest = i;
  if(r <= A.heapsize && A[r] < A[smallest])
    smallest = r;
  if(smallest != i){
    [A[i] , A[smallest]] = [A[smallest], A[i]]; //exchange
    min_heapify(A,smallest);
  }
}
const custom_min_heapify = (A,i,prop) => { //use property to compare
  var l = left(i);
  var r = right(i);
  if(l <= A.heapsize && A[l][prop] < A[i][prop])
    var smallest = l;
  else var smallest = i;
  if(r <= A.heapsize && A[r][prop] < A[smallest][prop])
    smallest = r;
  if(smallest != i){
    [A[i] , A[smallest]] = [A[smallest], A[i]]; //exchange objects
    custom_min_heapify(A,smallest,prop);
  }
}

////MAX-HEAP///////////////////////////////////////////////////////
export const build_max_heap = (A) =>{
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
    [A[i] , A[largest]] = [A[largest], A[i]];//exchange
    max_heapify(A,largest);
  }
}
/////helper functions//////////////////////////////////////////////////
const parent = i => Math.floor(i/2);
const left = i => 2*i;
const right = i => 2*i +1;