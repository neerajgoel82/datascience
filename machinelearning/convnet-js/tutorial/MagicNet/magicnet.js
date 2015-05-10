var magicNet; 

var initializeNet = function() {
	// toy data: two data points, one of class 0 and other of class 1
	var train_data = [new convnetjs.Vol([1.3, 0.5]), new convnetjs.Vol([0.1, 0.7])];
	var train_labels = [0, 1];
	 
	// create a magic net
	magicNet = new convnetjs.MagicNet(train_data, train_labels);
	magicNet.onFinishBatch(finishedBatch); // set a callback a finished evaluation of a batch of networks
 
	// start training MagicNet. Every call trains all candidates in current batch on one example
	setInterval(function(){ magicNet.step() }, 0);
}

// once at least one batch of candidates is evaluated on all folds we can do prediction!
function finishedBatch() {
  // prediction example. xout is Vol of scores
  // there is also predict_soft(), which returns the full score volume for all labels
  var some_test_vol = new convnetjs.Vol([0.1, 0.2]);
  var predicted_label = magicNet.predict(some_test_vol);
  var d = document.getElementById('egdiv');
  d.innerHTML = 'Predicted Label ' +   predicted_label ;
}

var start = function() {
  // this gets executed on startup
  //... 
  initializeNet();	
}
