///////Search closest match in ordered array using property
//Iterativa
export const posicion_insercion_binaria_I = (val, i, j, Arr, prop) => {
  while (i <= j) {
    var mitad = Math.floor((i + j) / 2);
    //console.log(val,i,j,mitad,Arr[mitad]);
    if (val == Arr[mitad][prop])
      return mitad;
    if (val > Arr[mitad][prop])
      i = mitad + 1;
    else
      j = mitad - 1;
  }
  return i;
}
///////Classic search on array
export const busqueda_binaria_I = (val, i, j, Arr) => {
  while (i <= j) {
    var mitad = Math.floor((i + j) / 2);
    if (val == Arr[mitad])
      return mitad;
    if (val > Arr[mitad])
      i = mitad + 1;
    else
      j = mitad - 1;
  }
  return null;
}