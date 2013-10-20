module.exports = Player = function(id) {
	this.id = id;
};

var util = require('util'),
	EventEmitter = require('events').EventEmitter;

util.inherits(Player, EventEmitter);

Player.prototype.getId = function() {
	return this.id;
};

Player.prototype.setName = function(name) {
	this.name = name;
	this.emit('nameChanged', name);
};

Player.prototype.getName = function() {
	return this.name;
};