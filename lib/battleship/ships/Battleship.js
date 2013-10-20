module.exports = Battleship = function(){
	Battleship.super_.apply(this);
	this.size = 4;
};

var util = require('util'),
	Ship = require('../Ship');

util.inherits(Battleship, Ship);