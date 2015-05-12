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

var trainNet = function(net, data) {
	var trainer = new convnetjs.Trainer(net, {learning_rate:0.01, l2_decay:0.001});
	for (var i = i ; i < data.length ; i++ ) {
		trainer.train(data[i].pt, data[i].cls);
	}
}

var classifyTwoD  = function(net,pt) {
	var probability_volume = net.forward(pt);
	console.log('probability that x is class 0: ' + probability_volume.w[0]);

	return probability_volume.w[0] 
	// prints 0.50101
}

var getData = function() {
	var data = [ {
		pt: new convnetjs.Vol([0.5,-1.3]),
		cls:0
	}
	]
}

var start = function() {
  // this gets executed on startup
  //... 
  net = initializeNet();	
  trainNet(net, getData);
  
  // example of running something every 1 second
  setInterval(periodic, 1000);
}

function periodic() {
  var d = document.getElementById('egdiv');
  d.innerHTML = 'Random number: ' +   classifyTwoD(net, new convnetjs.Vol([0.5,-1.3]));
}