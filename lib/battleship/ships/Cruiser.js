module.exports = Cruiser = function(){
	Cruiser.super_.apply(this);
	this.size = 3;
};

var util = require('util'),
	Ship = require('../Ship');

util.inherits(Cruiser, Ship);