export const makeRandomList = () =>{
  var t0 = performance.now();

  var nNums = parseInt(document.getElementById('nNums').value,10);
  var Arr = new Array(nNums)
  var minVal = 0;
  var maxVal = nNums*3;
  for(var i =0; i< nNums; i++){
    Arr[i] = Math.floor(Math.random() * (maxVal-minVal) ) + minVal;
  }
  document.getElementById('f_numeros').value = Arr.toString(); 

  var t1 = performance.now();
  console.log('Time Rand2: ' + (t1-t0) );
}
/*comparacion con nNums = 999999
https://jsben.ch/G6Wc9
//con nNums = 42000
https://jsben.ch/Jejq1
*/