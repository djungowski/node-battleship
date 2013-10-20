module.exports = Ship = function() {
	this.hits = 0;
};

var fs = require('fs'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

util.inherits(Ship, EventEmitter);

Ship.ORIENTATION_HORIZONTAL = 0;
Ship.ORIENTATION_VERTICAL = 1;

// static
Ship.getTypes = function(callback) {
	var me = this;
	if (me.types) return process.nextTick(function(){
		callback(me.types);
	});
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

Ship.prototype.takeHit = function() {
	this.hits++;
	if (this.hits < this.getSize()) return;
	this.emit("sinking");
};