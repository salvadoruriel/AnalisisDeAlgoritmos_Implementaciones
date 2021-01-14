//javascript es paso por referencia (paso por "sharing" mas bien)
export const busqueda_binaria_R = (x, i, j, Arr) => {
  var m = Math.ceil((i + j - 1) / 2);
  if (x == Arr[m])
    return m;
  else if (x < Arr[m] && i < m)
    return busqueda_binaria_R(x, i, m - 1);
  else if (x > Arr[m] && j > m)
    return busqueda_binaria_R(x, m + 1, j);
  return null;
}
export const busqueda_binaria_I = (x, i, j, Arr) => {
  return null;
}