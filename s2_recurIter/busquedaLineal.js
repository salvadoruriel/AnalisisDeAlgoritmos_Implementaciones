export const busqueda_lineal_R = (x, i, j, Arr) => {
  if (Arr[i] == x)
    return i;
  else if (i == j)
    return null;
  else return busqueda_lineal_R(x, i + 1, j, Arr);
}

export const busqueda_lineal_I = (x, i, j, Arr) => {
  for ( i; i <= j; i++) {
    if (Arr[i] == x)
      return i;
  }
  return null;
}