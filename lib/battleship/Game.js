module.exports = Game = function(){
	this.getShipTypes();
};

var fs = require('fs');

Game.prototype.getShipTypes = function(callback){
	var me = this;
	if (me.types) return process.nextTick(me.types);
	fs.readdir(__dirname + '/ships', function(err, files) {
		me.types = [];
		files.forEach(function(file){
			me.types.push(require('./ships/' + file));
		});
		callback(me.types);
	});
};