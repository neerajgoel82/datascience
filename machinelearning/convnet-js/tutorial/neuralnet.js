var defineNetTopology = function() {
	var layer_defs = [];
	// input layer of size 1x1x2 (all volumes are 3D)
	layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:2});
	// some fully connected layers
	layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
	layer_defs.push({type:'fc', num_neurons:20, activation:'relu'});
	// a softmax classifier predicting probabilities for two classes: 0,1
	layer_defs.push({type:'softmax', num_classes:2});

	return layer_defs;
}

var initializeNet = function() {
	
	//define the neural network topology 
	var layer_defs = defineNetTopology() ; 

	// create a net out of it
	var net = new convnetjs.Net();
	net.makeLayers(layer_defs);

	return net ; 
}



var classifyTwoD  = function(net,x,y) {
	// the network always works on Vol() elements. These are essentially
	// simple wrappers around lists, but also contain gradients and dimensions
	// line below will create a 1x1x2 volume and fill it with 0.5 and -1.3
	var x = new convnetjs.Vol([x,y]);
	 
	var probability_volume = net.forward(x);
	console.log('probability that x is class 0: ' + probability_volume.w[0]);

	return probability_volume.w[0] 
	// prints 0.50101
}


var start = function() {
  // this gets executed on startup
  //... 
  net = initializeNet();
  // ...
 
 
  // example of running something every 1 second
  setInterval(periodic, 1000);
}

function periodic() {
  var d = document.getElementById('egdiv');
  d.innerHTML = 'Random number: ' +   classifyTwoD(net, Math.random(), Math.random())
}