module.exports = Carrier = function(){
	Carrier.super_.apply(this);
	this.size = 5;
};

var util = require('util'),
	Ship = require('../Ship');

util.inherits(Carrier, Ship);