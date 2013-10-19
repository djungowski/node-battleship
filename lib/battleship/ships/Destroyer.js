module.exports = Destroyer = function(){
	this.size = 2;
};

var util = require('util'),
	Ship = require('../Ship');

util.inherits(Destroyer, Ship);