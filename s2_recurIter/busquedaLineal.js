export const busqueda_lineal_R = (x, i, j, Arr) => {
  //console.log(i, Arr[i], x)
  if (Arr[i] == x)
    return i;
  else if (i == j)
    return null;
  else return busqueda_lineal_R(x, i + 1, j, Arr);
}
export const busqueda_lineal_I = (x, i, j, Arr) => {
  return null;
}