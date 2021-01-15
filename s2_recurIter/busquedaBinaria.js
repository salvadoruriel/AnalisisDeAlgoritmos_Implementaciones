//javascript es paso por referencia (paso por "sharing" mas bien)
export const busqueda_binaria_R = (x, i, j, Arr) => {
  var m = Math.ceil((i + j - 1) / 2);
  if (x == Arr[m])
    return m;
  else if (x < Arr[m] && i < m)
    return busqueda_binaria_R(x, i, m - 1, Arr);
  else if (x > Arr[m] && j > m)
    return busqueda_binaria_R(x, m + 1, j, Arr);
  return null;
}

export const busqueda_binaria_I = (x, i, j, Arr) => {
  while (i <= j) {
    var mitad = Math.floor((i + j) / 2);
    //console.log(x,i,j,mitad,Arr[mitad]);
    if (x == Arr[mitad])
      return mitad;
    if (x > Arr[mitad])
      i = mitad + 1;
    else
      j = mitad - 1;
  }
  return null;
}