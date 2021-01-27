//adjacency list graph

//G = name of graph
//G.V = list (array) of vertices v
//
//v.Adj = adjacency list as array with references to other adjacent vertices in G.V
//v.name = name of the vertex, useful for comparison

//all other functions come from normal arrays

//receives an array of arrays
//first element in each array is a node
//all other elements are the edges
export const newAdjListGraph = (list, name) => {
  var G = new Array(list.length);
  G.name = name;
  //to comply with Cormen notation
  //G.V is also list of nodes or vertices
  G.V = G;
  //////Make list of vertices//////////////////////////
  for (var i = 0; i < G.V.length; i++) {
    //get all edges as nodes in a list, first one is the actual node
    var nodes = list[i].split(',')//WARNING could cause error in single nodes
    //G.V[i] = i; //make the node value its position in array, could allow for direct access
    /*
    G.V[i] = nodes[0]; //first element in array is the node name (string/character)
    G.V[i].name = nodes[0];
    //////Prepare adjacency list//////////////////////////
    G.V[i].Adj = new Array(nodes.length - 1); //edges for that node minus the node itself
    */
    G.V[i] = { //first element in array is the node name (string/character)
      "name": nodes[0],
      //////Prepare adjacency list//////////////////////////
      "Adj": new Array(nodes.length - 1) //edges for that node minus the node itself
    }
  }

  //////Fill adjacency list with actual references//////////////////////////
  for (var i = 0; i < G.V.length; i++) {
    var edges = list[i].split(',');//WARNING could cause error in single nodes
    for (var j = 1; j < edges.length; j++) { //skip first one, which is the node
      //finds the node and returns it as an object reference
      G.V[i].Adj[j - 1] = G.V.find(vertex => vertex.name == edges[j]);
    }
  }
  //Filled Graph with
  return G;
}