import { factorial_R, factorial_I } from './s2_recurIter/factorial.js';
import { power_R, power_I } from './s2_recurIter/power.js';
import { busqueda_lineal_R, busqueda_lineal_I } from './s2_recurIter/busquedaLineal.js';
import { busqueda_binaria_R, busqueda_binaria_I } from './s2_recurIter/busquedaBinaria.js';

//explicacion en s1_sorting.js //slight changes to be more generic
const actualPromise = (func, val1, ...rest) => {
  var promise = new Promise(function (resolve, reject) {
    var t0 = performance.now();
    var isRestEmpty = (rest && rest.length > 0) ? false : true;
    var ans;
    if (isRestEmpty) {
      ans = func(val1);
    } else if (rest.length <= 2) {
      ans = func(val1, rest[0], rest.slice(1));
    } else {//the searches, {x,i,j,Arr}
      ans = func(val1, rest[0], rest[1], rest[2]);
    }
    var t1 = performance.now();
    resolve({ ans, t0, t1 });
  });
  return promise;
}
const measureAndOutputTime = async (idOutAns, idOutTime, func, val1, ...rest) => {
  const { ans, t0, t1 } = await actualPromise(func, val1, ...rest);
  setTimeout(() => {
    //document.getElementById("loading").style.display = "none";
    //TODO: Implement floating loading element
    const time = Number((t1 - t0).toFixed(11));
    const msg = 'Este algoritmo tardo ' + time + ' millisegundos.';
    console.log(msg);
    document.getElementById(idOutTime).innerHTML = msg;
    //https://stackoverflow.com/questions/6003884/how-do-i-check-for-null-values-in-javascript
    if (!ans && ans !== 0) document.getElementById(idOutAns).innerHTML = 'nulo';
    else document.getElementById(idOutAns).innerHTML = ans.toString();
  }, 0);
  return 1;
}

const toArr = (idArr) => {
  var text = document.getElementById(idArr).value.split(',');
  var Arr = text.map((txt) => parseInt(txt, 10));
  return Arr;
}
window.toArr = toArr

const runFunc = (idEntry, idOutAns, idOutTime, func, ...rest) => {
  //preparing elements of function to just measure it
  if (typeof idEntry != "string") {
    console.log("idEntry no es string, es de tipo: " + typeof idEntry);
    return;
  }
  if (typeof idOutAns != "string") {
    console.log("idOutAns no es string, es de tipo: " + typeof idOutAns);
    return;
  }
  if (typeof idOutTime != "string") {
    console.log("idOutTime no es string, es de tipo: " + typeof idOutTime);
    return;
  }
  //document.getElementById("loading").style.display = "block";
  var needsArray = false;
  switch (func) { //dirty but avoids exposing to html and cluttering stuff.
    case 'fact_R': func = factorial_R;
      break;
    case 'fact_I': func = factorial_I;
      break;
    case 'pow_R': func = power_R;
      break;
    case 'pow_I': func = power_I;
      break;
    case 'lineal_R': func = busqueda_lineal_R;
      needsArray = true;
      break;
    case 'lineal_I': func = busqueda_lineal_I;
      needsArray = true;
      break;
    case 'binary_R': func = busqueda_binaria_R;
      needsArray = true;
      break;
    case 'binary_I': func = busqueda_binaria_I;
      needsArray = true;
      break;
    default:
      console.log("Error:" + func);
      return;
  }

  var val1 = parseInt(document.getElementById(idEntry).value, 10);
  //getting extra elementId values or just running
  if (needsArray) {
    var valArr = rest[0];
    measureAndOutputTime(idOutAns, idOutTime, func, val1, 0, valArr.length - 1, valArr);
  }
  else if (rest && rest.length > 0) {//rest is not empty
    var val2 = parseInt(document.getElementById(rest[0]).value, 10);
    measureAndOutputTime(idOutAns, idOutTime, func, val1, val2, rest.slice(1));
  }
  else measureAndOutputTime(idOutAns, idOutTime, func, val1, ...rest);

  document.getElementById(idOutAns).innerHTML = 'Si este mensaje dura más de 3 segundos entonces hubo un ¡Error! Checar consola.';
}
window.runFunc = runFunc