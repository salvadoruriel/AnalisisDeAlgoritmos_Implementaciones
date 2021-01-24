import nQueens from './s3_backGreedy/recursiveNqueens.js';
import huffman from './s3_backGreedy/huffman.js';

//explicacion en s1_sorting.js //totally converted to generic
const actualPromise = (func, ...rest) => {
  var promise = new Promise(function (resolve, reject) {
    var t0 = performance.now();
    var isRestEmpty = (rest && rest.length > 0) ? false : true;
    var ans;
    if (!isRestEmpty) {
      ans = func(...rest);
    } else{
      console.log('Error: No parameter function?');
      ans = null;
    }
    var t1 = performance.now();
    resolve({ ans, t0, t1 });
  });
  return promise;
}

const measureAndOutputTime = async (idOutAns, idOutTime, func, ...rest) => {
  const { ans, t0, t1 } = await actualPromise(func, ...rest);
  setTimeout(() => {
    const time = t1-t0;
    const msg = 'Este algoritmo tardo ' + time + ' milisegundos.';
    console.log(msg);
    document.getElementById(idOutTime).innerHTML = msg;
    if (!ans && ans !== 0) document.getElementById(idOutAns).innerHTML = 'nulo';
    else document.getElementById(idOutAns).innerHTML = ans.toString();
  }, 0);
  return 1;
}

const runFunc = (idOutAns, idOutTime, func, idEntry, ...rest) => {
  //preparing elements of function to just measure it
  if (typeof idOutAns != "string") {
    console.log("idOutAns no es string, es de tipo: " + typeof idOutAns);
    return;
  }
  if (typeof idOutTime != "string") {
    console.log("idOutTime no es string, es de tipo: " + typeof idOutTime);
    return;
  }
  if (typeof idEntry != "string") {
    console.log("idEntry no es string, es de tipo: " + typeof idEntry);
    return;
  }
  //adjusting each different function and sending to measure
  //MUST use WRAPPERS inside each function to be this generic.
  switch (func) { //dirty but avoids exposing to html and cluttering stuff.
    case 'a': //func = a;
      break;
    case 'nQueens':
      var nNums = parseInt(document.getElementById(idEntry).value, 10);
      measureAndOutputTime(idOutAns, idOutTime, nQueens, nNums);
      break;
    case 'huffman':
      var list = document.getElementById(idEntry).value.split(',');
      measureAndOutputTime(idOutAns, idOutTime, huffman, list);
      break;
    default:
      console.log("Error:" + func);
      return;
  }
  document.getElementById(idOutAns).innerHTML = 'Si este mensaje dura más de 5 segundos entonces hubo un ¡Error! Checar consola.';
}
window.runFunc = runFunc

const hideShow = (idDiv,objBut) => {
  var section = document.getElementById(idDiv);
  objBut.innerHTML = objBut.innerHTML == '[ Mostrar ]'?'[ Ocultar ]':'[ Mostrar ]';
  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}
window.hideShow = hideShow;