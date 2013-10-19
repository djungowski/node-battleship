module.exports = Battleship = function(){
	this.size = 4;
};

var util = require('util'),
	Ship = require('../Ship');

util.inherits(Battleship, Ship);