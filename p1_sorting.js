import insertionSort from './s1_sortingAlgorithms/insertion_sort.js';
import selectionSort from './s1_sortingAlgorithms/selection_sort.js';
import mergeSort from './s1_sortingAlgorithms/merge_sort.js';
import heapSort from './s1_sortingAlgorithms/heap_sort.js';
import quickSort from './s1_sortingAlgorithms/quick_sort.js';
import randomizedQuickSort from './s1_sortingAlgorithms/randomized_quick_sort.js';
import countingSort from './s1_sortingAlgorithms/counting_sort.js';
import radixSort from './s1_sortingAlgorithms/radix_sort.js';
import { makeRandomList } from './randomHandling.js';
window.makeRandomList = makeRandomList //make html aware of function

//regarding graph visualization:
//https://stackoverflow.com/questions/7034/graph-visualization-library-in-javascript
//JavaScript is pass by value on primitives
//  and call by sharing (copy of a reference) in objects (or arrays)

window.f1 = function f1() {
  console.log("test hello");
}
/* arrow functions:
https://www.freecodecamp.org/news/arrow-function-javascript-tutorial-how-to-declare-a-js-function-with-the-new-es6-syntax/
*/
/*useful resources for promises
https://stackoverflow.com/questions/24928846/get-return-value-from-settimeout
https://www.digitalocean.com/community/tutorials/javascript-promises-for-dummies
https://www.geeksforgeeks.org/javascript-promises/
*/
/*rest parameters:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
https://javascript.info/rest-parameters-spread
*/
const actualPromise = (func, Arr, ...rest) => {
  //console.log("actPromise: " + [...rest] + "|" + rest[0] + " " + rest[1]);
  //soporte de hasta 2 argumentos, el resto quedara en el rest.slice
  var promise = new Promise(function (resolve, reject) {
    var t0 = performance.now();
    var isRestEmpty = (rest && rest.length > 0) ? false : true;
    var ans = isRestEmpty ? func(Arr) : func(Arr, rest[0], rest[1], rest.slice(2));
    var t1 = performance.now();
    //resolve([ans,t0,t1]);
    resolve({ ans, t0, t1 });
  });
  return promise;
}

const promiseHandler = async (func, Arr, ...rest) => {
  //const {ans,t0,t1} = await actualPromise(func,Arr);
  //console.log("arguments: " + [...rest] + "|" + rest[0] + " " + rest[1]);
  const { ans, t0, t1 } = await actualPromise(func, Arr, ...rest);
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    //const time = t1 - t0;
    const time = Number((t1 - t0).toFixed(11));
    const msg = 'Este algoritmo tardo ' + time + ' millisegundos.';
    //func doesn't retain name.
    //const msg = 'Este algoritmo (' + func +')tardo ' + time + ' millisegundos.';
    console.log(msg);
    document.getElementById('delay').innerHTML = msg;
    document.getElementById('ans').innerHTML = ans.toString();
    //document.getElementById('ans').innerHTML = Arr.toString(); //modificamos original
  }, 0)
  //return promise;
}


const order = (alg) => {
  document.getElementById("loading").style.display = "block";
  var text = document.getElementById('f_numeros').value.split(',');
  /*
  var t0 = performance.now();
  var Arr = text.map(Number);
  var t1 = performance.now();
  console.log('Tiempo 1: ' + (t1-t0) );

  var Arr = []
  //for(const txt in text ){ //NOT ok, wrong info mixed
  for(var i = 0; i< text.length; i++){
    Arr.push(parseInt(text[i], 10));
  }
  */
  //TODO: ask on stackoverflow why with short example.
  //Actually the fastest
  var Arr = text.map((txt) => parseInt(txt, 10));

  var res = 'err';
  switch (alg) {
    case 'insSor':
      //res = insertionSort(Arr);
      //res = measureAlgorithm(insertionSort,Arr);
      res = promiseHandler(insertionSort, Arr);
      //console.log(Arr); //sí modifica arreglo original
      break;
    case 'selSor':
      res = promiseHandler(selectionSort, Arr);
      break;
    case 'merSor':
      res = promiseHandler(mergeSort, Arr, 0, Arr.length-1);
      break;
    case 'heaSor':
      res = promiseHandler(heapSort, Arr);
      break;
    case 'quiSor':
      res = promiseHandler(quickSort, Arr, 0, Arr.length-1);
      break;
    case 'ranSor':
      res = promiseHandler(randomizedQuickSort, Arr, 0, Arr.length-1);
      break;
    case 'couSor':
      var Barr = new Array(Arr.length);
      res = promiseHandler(countingSort, Arr, Barr, findMax(Arr));
      break;
    case 'radSor':
      res = promiseHandler(radixSort, Arr, findMax(Arr));
      break;
    default:
      console.log("err " + alg);
      break;
  }

  if (res != 'err') {//todo bien
  } else {
    document.getElementById('ans').innerHTML = 'Algo paso! Checar consola.'
  }
}
window.order = order

//para arreglos muy grandes tiene que ser manual la busqueda
//mejor solucion comprobada(por mi obvio) en : https://jsben.ch/ckr3c
const findMax = (Arr) => {
  var max = Arr[0];
  for(var i=1; i< Arr.length; i++){
    max = Arr[i] > max ? Arr[i] : max;
  }
  return max;
}


///////////////////UNUSED LEGACY
/////
/////
/////
const measureAlgorithm = (func, Arr) => {
  //alternativamente (con mismo string en console para medir tiempos correctos)
  //console.time('foo')
  //foo()
  //console.timeEnd('foo')
  var t0 = performance.now();
  var ans = func(Arr);
  //const ans = await promiseHandler();
  var t1 = performance.now();
  console.log("Esta funcion tomo: " + (t1 - t0) + " millisegundos.");
  return ans;
}
//codigo por salvador
//adaptaciones de algoritmos vistos en clases o de libro Cormen, en ultimo caso hechos por mi