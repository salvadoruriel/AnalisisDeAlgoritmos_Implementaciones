import * as qu from '../sz_functions/queue.js';
import { newAdjListGraph } from '../sz_functions/adjList.js';
//https://exploringjs.com/es6/ch_modules.html
//the default wrap and all the functions in this file can be imported respectively as
//import wrapBFS, * as bfs from 'src/bfs.js';

//comparing by property .name and object is almost equal: https://jsben.ch/P1UJB
//  but I stick with the pseudocode source for now.
export const bfs = (G, s) => {
  var U = G.V.filter(ver => ver != s);// each vertex u in G.V -{s}
  for (var i = 0; i < U.length; i++) {//for each
    U[i].color = 'WHITE';
    U[i].d = Number.MAX_SAFE_INTEGER; //sentinela en JavaScript
    U[i].pi = null; //sentinela en JavaScript
  }
  s.color = 'GRAY';
  s.d = 0;
  s.pi = null;
  var Q = qu.newQueue(G.length);
  qu.enqueue(Q, s);
  while (!qu.isEmpty(Q)) {
    //console.log(Q);
    var u = qu.dequeue(Q);
    //console.log(Q,u,Q.isEmpty);
    U = u.Adj;// each vertex v in G.Adj[u]
    //console.log(U,u,u.Adj);
    for (var i = 0; i < U.length; i++) {
      var v = U[i];
      if (v.color == 'WHITE') {
        v.color = 'GRAY';
        v.d = u.d + 1;
        v.pi = u;
        qu.enqueue(Q, v);
      }
    }
    u.color = 'BLACK';
  }
}

var AnsBfs = [];
export const print_path = (G, s, v) => {
  if (v.name == s.name) //doesnt accept v == s for some reason lol
    AnsBfs.push(s.name);//print s
  else if (!v.pi && v.pi !== 0) //check if v.pi == null
    AnsBfs.push("no path from " + s.name + " to " + v.name + " exists. ");
  else {
    print_path(G, s, v.pi);
    AnsBfs.push(v.name);//print v
  }
}

const wrapBFS = (...rest) => {
  //test adjacency list makes correct graph
  var timeG0 = performance.now();
  var G = newAdjListGraph(rest[0], "G");
  var timeG1 = performance.now();
  //Tests with default example
  //console.log(G,G.V);//correctly the same
  //console.log(G.V[0], G.V[0] != G.V[1], G.V[0] == G[0]);//Test nodes and references
  //console.log(G.V[0].name == G.V[1].Adj[1].name ); //check referencing by name
  //Sucess! ^^^^ valid by node or .name, but .name is  printable

  var time0 = performance.now();
  bfs(G, G[0]); //first element as root
  var time1 = performance.now();
  console.log(G);

  var time2 = performance.now();
  print_path(G, G[0], G[2]); //from "s" to "v"
  //print_path(G, G[0], G.V.find(v => v.name == rest[1])); //from root to entry
  var time3 = performance.now();
  
  ///Prepare answer and print/////////////////777
  var answer = '';
  answer += '<div style="display: inline-block;">';
  answer += '<p> Respusta BFS: <b>' + AnsBfs.join(',') + '</b></p>';
  answer += '<p> Tiempo de &emsp;&emsp;&emsp;&emsp&emsp;;BFS: ' + Number((time1 - time0).toFixed(11)); + '</p>';
  answer += '<p> Tiempo de &emsp;PRINT-PATH: ' + Number((time3 - time2).toFixed(11)); + '</p>';
  answer += '<p>Tiempo en construir gráfica: ' + Number((timeG1 - timeG0).toFixed(11)); + '</p>';
  answer += '</div>';
  return answer;
}

export default wrapBFS;