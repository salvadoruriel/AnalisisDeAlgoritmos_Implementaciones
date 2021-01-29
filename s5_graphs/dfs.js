import { newAdjListGraph } from '../sz_functions/adjList.js';

var time; //global variable as Cormen mentions p.604
export const dfs = (G) => {
  var U = G.V;// each vertex v in G.V
  for (var i = 0; i < U.length; i++) {
    U[i].color = 'WHITE';//U[i] is the u vertex
    U[i].pi = null;
  }
  time = 0;
  //U = G.V;// each vertex v in G.V
  for (var i = 0; i < U.length; i++) {
    if (U[i].color == 'WHITE')
      dfs_visit(G, U[i]);
  }
}
export const dfs_visit = (G, u) => {
  time = time + 1;                       // white vertex u hast just been discovered
  u.d = time
  u.color = 'GRAY'
  var V = u.Adj;// each vertex v in G.Adj[u]
  for (var i = 0; i < V.length; i++) { // explore edge (u,v)
    if (V[i].color == 'WHITE') {
      V[i].pi = u;
      dfs_visit(G, V[i]);
    }
  }
  u.color = 'BLACK';
  time = time + 1;
  u.f = time;
}

var AnsDfs = [];
export const print_path = (G, s, v) => {
  if (v.name == s.name) //doesnt accept v == s for some reason lol
    AnsDfs.push(s.name);//print s
  else if (!v.pi && v.pi !== 0) //check if v.pi == null
    AnsDfs.push("no path from " + s.name + " to " + v.name + " exists. ");
  else {
    print_path(G, s, v.pi);
    AnsDfs.push(v.name);//print v
  }
}

const wrapDFS = (...rest) => {
  var timeG0 = performance.now();
  var G = newAdjListGraph(rest[0], "G");
  var timeG1 = performance.now();

  var time0 = performance.now();
  dfs(G);
  var time1 = performance.now();
  console.log(G);

  AnsDfs = [];
  var search = G.V.find(v => v.name == rest[1]);
  //Verify node input exists //typeof guarantess a returned string
  search = (typeof search == 'undefined') ? { name: rest[1], pi: null } : search;
  var time2 = performance.now();
  print_path(G, G[0], search); //from root to entry
  var time3 = performance.now();

  ///Prepare answer and print/////////////////777
  var answer = '';
  answer += '<div style="display: inline-block;">';
  answer += '<p> Respusta DFS: <b>' + AnsDfs.join(' → ') + '</b></p>';
  answer += '<p> Tiempo de &emsp;&emsp;&emsp;&emsp;&emsp;DFS: ' + Number((time1 - time0).toFixed(11)); + '</p>';
  answer += '<p> Tiempo de &emsp;PRINT-PATH: ' + Number((time3 - time2).toFixed(11)); + '</p>';
  answer += '<p>Tiempo en construir gráfica: ' + Number((timeG1 - timeG0).toFixed(11)); + '</p>';
  answer += '</div>';
  return answer;
}

export default wrapDFS;