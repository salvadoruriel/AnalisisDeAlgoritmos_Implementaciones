const pre_radixSort = (A, maxVal) => {
  var kdigits = 0;
  //del supeusto que maxVal y A deben ser enteros
  while( maxVal >= 1){
    kdigits++;
    maxVal /= 10;
  }
  return radixSort(A,kdigits);
}

const radixSort = (A, k) => {
  var B = new Array(A.length); //arreglo auxiliar para counting
  for (var i = 1; i <= k; i++){
    //con este cambio evito copias y trabajo sobre el arreglo a ordenar
    if(i % 2 != 0) countingSort_digitMod(A,B,i,9);
    else countingSort_digitMod(B,A,i,9);
  }
  //similarmente regreso el arreglo auxilidar de counting
  //  que resulta ser el ordenado.
  i--;
  if(i % 2 != 0) return B;
  else return A;
}

export default pre_radixSort;

const countingSort_digitMod = (A, B, dig, k) => {
  var val = 0;

  var C = new Array(k + 1);//arreglo auxiliar de 0 a k inclusivo
  for (var i = 0; i <= k; i++)
    C[i] = 0;

  for (var j = 0; j < A.length; j++){
    val = getDigit(A[j], dig);
    C[val] = C[val] + 1;
  }

  for (var i = 1; i <= k; i++)
    C[i] = C[i] + C[i - 1];
  for (var i = 0; i <= k; i++)
    C[i]--; //ajustando con valor en posicion 0

  for (var j = A.length - 1; j >= 0; j--) {
    val = getDigit(A[j], dig)
    B[C[val]] = A[j];
    C[val] = C[val] - 1;
  }
  return B; //ordered array
  //A = B.slice(0);
}
//slice is fastest copy
//https://jsben.ch/lO6C5

//de https://stackoverflow.com/a/41712226/14096042
function getDigit(number, n) {
  return Math.floor((number / Math.pow(10, n - 1)) % 10);
}