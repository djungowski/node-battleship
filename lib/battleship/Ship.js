module.exports = Ship = function() {};

var fs = require('fs');

Ship.ORIENTATION_HORIZONTAL = 0;
Ship.ORIENTATION_VERTICAL = 1;

// static
Ship.getTypes = function(callback) {
	var me = this;
	if (me.types) return process.nextTick(me.types);
	fs.readdir(__dirname + '/ships', function(err, files) {
		me.types = {};
		files.forEach(function(file){
			var name = file.replace(/\.js$/, '').toLowerCase();
			me.types[name] = require('./ships/' + file);
		});
		callback(me.types);
	});
};

Ship.prototype.getSize = function() {
	return this.size;
};