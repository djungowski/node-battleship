module.exports = Cruiser = function(){
	this.size = 3;
};

var util = require('util');

util.inherits(Cruiser, Ship);