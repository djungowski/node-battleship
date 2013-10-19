module.exports = Carrier = function(){
	this.size = 5;
};

var util = require('util');

util.inherits(Carrier, Ship);