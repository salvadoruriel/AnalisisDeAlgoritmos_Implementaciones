import { newWeightedAdjListGraph } from '../sz_functions/adjList.js';
import * as aux from '../s6_graficasDir/auxiliar.js';
import { w } from '../s6_graficasDir/dijkstra.js'

export const bellman = (G, w, s) => {
  aux.initialize_single_source(G, s);
  for (var i = 1; i <= G.V.length - 1; i++) { //for i=1 to |G.V| -1
    //for each edge (u,v) in G.E
    for (var ver = 0; ver < G.V.length; ver++) {
      for (var edge = 0; edge < G.V[ver].Adj.length; edge++) {
        var v =  G.V[ver].Adj[edge], u = G.V[ver];
        aux.relax(u, v, w);
      }
    }
  }
  //for each edge (u,v) in G.E
  for (var ver = 0; ver < G.V.length; ver++) {
    for (var edge = 0; edge < G.V[ver].Adj.length; edge++) {
      var v =  G.V[ver].Adj[edge], u = G.V[ver];
      if (v.d > u.d + w(u, v))
        return false;
    }
  }
  return true;
}

const wrapBellman = (...rest) => {
  var timeG0 = performance.now();
  var G = newWeightedAdjListGraph(rest[0], "Bellman");
  var timeG1 = performance.now();

  var time0 = performance.now();
  bellman(G, w, G[0]); //using root node
  var time1 = performance.now();
  console.log(G);


  ///Prepare answer and print/////////////////777
  var answer = '';
  answer += '<div style="display: inline-block;">';
  answer += '<p> Tiempo de &emsp;&emsp; Bellman: ' + Number((time1 - time0).toFixed(11)); + '</p>';
  answer += '<p>Tiempo en construir gráfica: ' + Number((timeG1 - timeG0).toFixed(11)); + '</p>';
  answer += '</div>';
  return answer;
}
export default wrapBellman;