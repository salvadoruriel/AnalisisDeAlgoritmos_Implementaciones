import { newWeightedAdjListGraph } from '../sz_functions/adjList.js';
import * as aux from '../s6_graficasDir/auxiliar.js';
import { w, extract_min } from '../s6_graficasDir/dijkstra.js'

export const mst_prim = (G, w, r) => {
  for (var i = 0; i < G.V.length; i++) { //for each u in G.V
    G.V[i].key = Number.MAX_SAFE_INTEGER; //sentinela en JavaScript
    G.V[i].pi = null;
  }
  r.key = 0;
  var Q = [...G.V]; //Can be improved by Q being min heap or min priority
  while (Q && Q.length > 0) { //while Q != empty
    var u = extract_min(Q); //associated weight in node.d
    for (var i = 0; i < u.Adj.length; i++) {//for each vertex v in G.Adj[u]
      var v = u.Adj[i];
      if (Q.some(ver => ver.name == v.name) && w(u, v) < v.key) {
        v.pi = u;
        v.key = w(u, v);
      }
    }
  }
}

const wrapPrim = (...rest) => {
  var timeG0 = performance.now();
  var G = newWeightedAdjListGraph(rest[0], "Prim");
  var timeG1 = performance.now();
  //console.log(G);
  //return ' ';

  var time0 = performance.now();
  mst_prim(G, w, G[0]); //using r root node
  var time1 = performance.now();
  console.log(G);


  ///Prepare answer and print/////////////////777
  var answer = '';
  answer += '<div style="display: inline-block;">';
  answer += '<p> Tiempo de &emsp;&emsp;&emsp; Prim: ' + Number((time1 - time0).toFixed(11)); + '</p>';
  answer += '<p>Tiempo en construir gráfica: ' + Number((timeG1 - timeG0).toFixed(11)); + '</p>';
  answer += '</div>';
  return answer;
}
export default wrapPrim;