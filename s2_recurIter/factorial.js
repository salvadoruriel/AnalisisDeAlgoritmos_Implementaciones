export const factorial_R = (n) => {
  if(n==0) return 1;
  else return n*factorial_R(n-1);
}

export const factorial_I = (n) => {
  var x = 1;
  for(var i=1; i<=n; i++){
    x = i*x;
  }
  return x;
}