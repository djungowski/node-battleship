module.exports = Destroyer = function(){
	Destroyer.super_.apply(this);
	this.size = 2;
};

var util = require('util'),
	Ship = require('../Ship');

util.inherits(Destroyer, Ship);