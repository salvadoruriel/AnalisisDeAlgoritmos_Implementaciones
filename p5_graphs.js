import wrapBFS from './s5_graphs/bfs.js';

//explicacion en s1_sorting.js //totally converted to generic
const actualPromise = (func, ...rest) => {
  var promise = new Promise(function (resolve, reject) {
    var t0 = performance.now();
    var isRestEmpty = (rest && rest.length > 0) ? false : true;
    var ans;
    if (!isRestEmpty) {
      ans = func(...rest);
    } else {
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
    const time = t1 - t0;
    const msg = 'Este algoritmo tardo ' + time + ' milisegundos.';
    console.log(msg);
    document.getElementById(idOutTime).innerHTML = msg;
    var ansOut = document.getElementById(idOutAns)
    if (!ans && ans !== 0) ansOut.innerHTML = 'nulo';
    else ansOut.innerHTML = ans.toString();
    //MathJax.typeset(); //to update any added math formulas//v3 //doesnt work lmao
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
    case 'bfs':
      //de https://web.archive.org/web/20190905055615/https://stackoverflow.com/questions/8125709/javascript-how-to-split-newline
      var text = document.getElementById(idEntry).value.split(/\r?\n/);
      //var ArrS = text.map((txt) => parseInt(txt, 10));
      //console.log(text);
      measureAndOutputTime(idOutAns, idOutTime, wrapBFS, text);
      break;
    default:
      console.log("Error:" + func);
      return;
  }
  document.getElementById(idOutAns).innerHTML = 'Si este mensaje dura más de 5 segundos entonces hubo un ¡Error! Checar consola.';
}
window.runFunc = runFunc;

const hideShow = (idDiv, objBut) => {
  var section = document.getElementById(idDiv);
  objBut.innerHTML = objBut.innerHTML == '[ Mostrar ]' ? '[ Ocultar ]' : '[ Mostrar ]';
  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}
window.hideShow = hideShow;