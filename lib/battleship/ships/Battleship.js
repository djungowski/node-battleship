module.exports = Battleship = function(){
	this.size = 4;
};

var util = require('util');

util.inherits(Battleship, Ship);