export const initialize_single_source = (G, s) => {
  for (var i = 0; i < G.V.length; i++) {//for each vertex v in G.V
    G.V[i].d = Number.MAX_SAFE_INTEGER; //sentinela en JavaScript
    G.V[i].pi = null;
  }
  s.d = 0;
}

//w is weight function to be passed
export const relax = (u, v, w) => {
  if (v.d > u.d + w(u, v)) {
    v.d = u.d + w(u, v);
    v.pi = u;
  }
}