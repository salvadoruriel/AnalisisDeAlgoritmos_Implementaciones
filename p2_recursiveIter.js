import { factorial_R, factorial_I } from './s2_recurIter/factorial.js';

//explicacion en s1_sorting.js
//slight changes to be more generic
const actualPromise = (func, var1, ...rest) => {
  var promise = new Promise(function (resolve, reject) {
    var t0 = performance.now();
    var isRestEmpty = (rest && rest.length > 0) ? false : true;
    var ans = isRestEmpty ? func(var1) : func(var1, rest[0], rest.slice(1));
    var t1 = performance.now();
    resolve({ ans, t0, t1 });
  });
  return promise;
}
const measureAndOutputTime = async (idOutAns, idOutTime, func, var1, ...rest) => {
  const { ans, t0, t1 } = await actualPromise(func, var1, ...rest);
  setTimeout(() => {
    //document.getElementById("loading").style.display = "none";
    //TODO: Implement floating loading element
    //const time = t1 - t0;
    const time = Number((t1 - t0).toFixed(11));
    const msg = 'Este algoritmo tardo ' + time + ' millisegundos.';
    console.log(msg);
    document.getElementById(idOutTime).innerHTML = msg;
    document.getElementById(idOutAns).innerHTML = ans.toString();
  }, 0)
}

const runFunc = (idEntry, idOutAns, idOutTime, func, ...rest) =>{
  switch(func){ //dirty but avoids exposing to html and cluttering stuff.
    case 'fact_R': func = factorial_R;
      break;
    case 'fact_I': func = factorial_I;
      break;
    default:  
      console.log("Error:" + func);
      return;
  }

  if(typeof idEntry != "string"){
    console.log("idEntry no es string, es de tipo: " + typeof idEntry);
    return;
  }
  if(typeof idOutAns != "string"){
    console.log("idOutAns no es string, es de tipo: "+ typeof idOutAns);
    return;
  }
  if(typeof idOutTime != "string"){
    console.log("idOutTime no es string, es de tipo: " + typeof idOutTime);
    return;
  }
  //document.getElementById("loading").style.display = "block";
  var var1 = parseInt(document.getElementById(idEntry).value, 10);
  measureAndOutputTime(idOutAns, idOutTime, func, var1, ...rest);
}
window.runFunc = runFunc