import { build_min_heap } from '../sz_functions/buildHeap.js';
import { posicion_insercion_binaria_I } from '../sz_functions/binarySearch.js';

//Implemeneted as a tree cuz the notation didn't make sense for
//  a list with the return, from which as a tree everything can be recovered. 
//The original return doesn't allow for an implemented visualization in a list
//  and I would change that to output the min heap list Q to see the 1 and 0s.

let node1 = {
  "character": "a",
  "freq": 0, //frequency
  "left": null,
  "right": null
}
let node_example = {
  "character": "a",
  "freq": 0, //frequency
  "left": node1,
  "right": null
}
let listNodes = [
  node1,
  node_example
]

const huffman = (C) => { //////HUFFMAN//////////////////
  var n = C.length;
  var Q = [...C]; //
  //build_min_heap(Q, "freq"); //Cormen comments on pg.433
  //but since C is already ordered what is the point?
  for (var i = 0; i < n-1; i++) {
    var z = { //allocate a new node z
      "character": '',
      "freq": null, //frequency
      "left": null,
      "right": null
    };
    //console.log(Q);
    var x = extract_min(Q);
    z.left = x;
    var y = extract_min(Q);
    z.right = y;
    z.freq = x.freq + y.freq;
    //console.log(z);
    insert(Q, z);
    //console.log(Q);
    //console.log('----------------------');
  }
  return extract_min(Q); //return the root of the tree, only element left in list
}

const wraphuff = (...rest) => { ////Wrapper/////////
  //processing list of characters and frequencies
  var Arr = rest[0];
  var Processed = new Array(Arr.length);//new empty array with n spots
  var temp;//temporary to split value/frequency
  var node = { //temporary node object
    "character": '',
    "freq": null, //frequency
    "left": null,
    "right": null
  };
  for (var i = 0; i < Arr.length; i++) {
    temp = Arr[i].split(':'); //split character and number
    node.character = temp[0];
    node.freq = parseInt(temp[1], 10);
    Processed[i] = { ...node };
  }

  //calling function
  //console.log(Processed);
  var answer = huffman(Processed);
  //console.log(Processed);
  //console.log(answer);

  //finish and return answer to print
  return answer.freq;
}
export default wraphuff;


/////////Additional functions/////////////
const insert = (Q, z) => { //inserts in correct position in ordered list
  //finds right position
  var index = posicion_insercion_binaria_I(z.freq,0,Q.length-1,'freq')
  Q.splice(index, 0, { ...z }); //{...z} to shallow copy an object
}
const extract_min = (Q) => {
  var a = {...Q[0]}//since we use min heap the first element is the smallest
  //console.log(a);
  Q.splice(0, 1); 
  //console.log(Q);
  return a;
}