//QUEUE First in, First out (FIFO)///////////////////
//algoritmo y metodos descritos en pg.234,235 Cormen
//necesariamente la cadena necesita tamaño predefinido para hacer operacion en tiempo constante
//importing all:
//import * as qu from '../sz_functions/queue.js';
//https://exploringjs.com/es6/ch_modules.html

export const newQueue = (size) => {
  var Q = new Array(size);
  Q.tail = 0;
  Q.head = 0;
  return Q;
}

export const enqueue = (Q, x) => {//insertar //theta (1)
  Q[Q.tail] = x;
  if (Q.tail == Q.length - 1)
    Q.tail = 0;//Q.tail = 1;
  else Q.tail = Q.tail + 1;
}

export const dequeue = (Q) => {//delete //theta(1)
  var x = { ...Q[Q.head] }; //shallow copy to remove
  Q[Q.head] = null;//set to empty/null to check empty call
  if (Q.head == Q.length - 1)
    Q.head = 0;//Q.head = 1;
  else Q.head = Q.head + 1;
  return x;
}
export const isEmpty = (Q) =>{
  return (!Q[Q.head] && Q[Q.head] !== 0);//using null to check
}







/////////////////////OLD CLASS BASED,replaced to maintain notation////////
class Queue {
  constructor(size = 8) {
    //this.items = [];
    this.Q = new Array(size);
    this.Q.tail = 0;
    this.Q.head = 0;
  }

  //Methods
  add(element) { //theta(1) //push, increases size but shifts everything
    this.items.push(element);
  }

  enqueue(Q, x) {//insertar //theta (1)
    Q[Q.tail] = x;
    if (Q.tail == Q.length - 1)
      Q.tail = 0;//Q.tail = 1;
    else Q.tail = Q.tail + 1;
  }
  dequeue(Q) {//delete //theta(1)
    var x = Q[Q.head];
    if (Q.head == Q.length - 1)
      Q.head = 0;//Q.head = 1;
    else Q.head = Q.head + 1;
    return x;
  }
}


//implementacion dinamica podria basarse en:
//https://web.archive.org/web/20171219104049/http://www.cdn.geeksforgeeks.org/implementation-queue-javascript/
