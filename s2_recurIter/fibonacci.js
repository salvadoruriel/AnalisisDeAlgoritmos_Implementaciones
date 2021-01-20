export const fibonacci_R = (n) => {
  if (n == 0)
    return 0;
  else if (n == 1)
    return 1;
  else {
    var x = fibonacci_R(n - 1);
    var y = fibonacci_R(n - 2);
    return x + y;
  }
}

export const fibonacci_I = (n) => {
  if (n == 0)
    return 0;
  else {
    var x = 0;
    var y = 1;
    var z; //added
    for (var i = 1; i <= n - 1; i++) {
      z = x + y;
      x = y;
      y = z;
    }
  }
  return y;
}