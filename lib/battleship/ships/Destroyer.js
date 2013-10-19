module.exports = Destroyer = function(){
	this.size = 2;
};

var util = require('util');

util.inherits(Destroyer, Ship);