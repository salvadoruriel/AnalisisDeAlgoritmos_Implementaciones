export const power_R = (a, n) => {
  if (n == 0) return 1;
  else return a * power_R(a, n - 1);
}

export const power_I = (a, n) => {
  var x = 1;
  for (var i = 1; i <= n; i++) {
    x = a * x;
  }
  return x;
}