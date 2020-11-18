export const makeRandomList = () =>{
  var t0 = performance.now();

  var nNums = parseInt(document.getElementById('nNums').value,10);
  var Arr = []
  //var minVal = Number.MIN_SAFE_INTEGER;
  //var maxVal = Number.MAX_SAFE_INTEGER;
  var minVal = 0;
  var maxVal = nNums*3;
  for(var i =0; i< nNums; i++){
    //Entero con min incluido y max excluido
    Arr.push(Math.floor(Math.random() * (maxVal-minVal) ) + minVal);
  }
  document.getElementById('f_numeros').value = Arr.toString(); 

  var t1 = performance.now();
  console.log('Time Rand: ' + (t1-t0) );
}