module.exports = Carrier = function(){
	this.size = 5;
};

var util = require('util'),
	Ship = require('../Ship');

util.inherits(Carrier, Ship);