module.exports = Cruiser = function(){
	this.size = 3;
};

var util = require('util'),
	Ship = require('../Ship');

util.inherits(Cruiser, Ship);