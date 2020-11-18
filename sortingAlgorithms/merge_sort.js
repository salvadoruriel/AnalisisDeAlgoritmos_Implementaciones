const merge_sort = (A,p,r) => {
  if(p<r){
    var q = Math.floor( (p+r) /2 );
    merge_sort(A,p,q);
    merge_sort(A,q+1,r);
    console.log(p+" " +q+" "+ r + "- Arr1: "+ A);
    merge(A,p,q,r);
    console.log(p+" " +q+" "+ r + "- Arr2: "+ A);
  }
  return A; //opcional
}

export default merge_sort;

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
    console.log("k:"+k+" - "+L[i] +" : "+ (L[i] !=Number.MAX_SAFE_INTEGER && L[i] <= R[j])+ " "+A )
    if(L[i] !=Number.MAX_SAFE_INTEGER && L[i] <= R[j]){
      A[k] = L[i]
      i = i+1
    }
    else {
      A[k] = R[j]
      j = j+1
    }
    console.log("k----------------"+ (L[i] !=Number.MAX_SAFE_INTEGER && L[i] <= R[j])+ " "+A )
  }
}
//Se puede cambiar Number.MAX_SAFE_INTEGER por Number.MAX_VALUE
//  para garantizar a casi cualquier valor el sentinela.
//  Pero para ilustrar el algoritmo es suficiente asi.