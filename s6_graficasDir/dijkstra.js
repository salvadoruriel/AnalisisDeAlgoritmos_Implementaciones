import { newWeightedAdjListGraph } from '../sz_functions/adjList.js';
import * as aux from '../s6_graficasDir/auxiliar.js';

export const w = (u, v) => {
  for (var i = 0; i < u.Adj.length; i++) //for each edge
    if (u.Adj[i].name == v.name) //search if its the searched edge
      return u.Weights[i] //return weight
  return null; //that edge doesnt exist
}

//can be improved to make Q remain a min heap
export const extract_min = (Q) => {
  var min = { ...Q[0] };
  var pos = 0;
  for (var i = 1; i < Q.length; i++) //fin min weight by values keyed with .d
    if (Q[i].d < min.d) {
      min = { ...Q[i] };
      pos = i;
    }
  Q.splice(pos, 1); //remove min node from the list
  return min;
}

export const dijkstra = (G, w, s) => {
  aux.initialize_single_source(G, s);
  var S = [];
  //Q is keyed by d values
  var Q = [...G.V]; //Can be improved by Q being min heap or min priority
  while (Q && Q.length > 0) { //while Q != empty
    var u = extract_min(Q); //associated weight in node.d
    S = [...S, u];
    for (var i = 0; i < u.Adj.length; i++) {//for each vertex v in G.Adj[u]
      aux.relax(u, u.Adj[i], w); //w is the function declared up there
    }
  }
}

const wrapDijkstra = (...rest) => {
  var timeG0 = performance.now();
  var G = newWeightedAdjListGraph(rest[0], "Dijkstra");
  var timeG1 = performance.now();

  var time0 = performance.now();
  dijkstra(G, w, G[0]); //using root node
  var time1 = performance.now();
  console.log(G);


  ///Prepare answer and print/////////////////777
  var answer = '';
  answer += '<div style="display: inline-block;">';
  answer += '<p> Tiempo de &emsp;&emsp; Dijkstra: ' + Number((time1 - time0).toFixed(11)); + '</p>';
  answer += '<p>Tiempo en construir gráfica: ' + Number((timeG1 - timeG0).toFixed(11)); + '</p>';
  answer += '</div>';
  return answer;
}
export default wrapDijkstra;