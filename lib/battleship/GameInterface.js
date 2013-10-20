module.exports = GameInterface = function(player, field) {
	this.player = player;
	this.field = field;
	this.placementDone = false;
	this.active = false;
};

var util = require('util'),
	EventEmitter = require('events').EventEmitter;

util.inherits(GameInterface, EventEmitter);

GameInterface.prototype.setPlayerName = function(name) {
	this.player.setName(name);
};

GameInterface.prototype.getPlacements = function() {
	return this.field.placements;
};

GameInterface.prototype.place = function(ship, x, y, orientation) {
	if (this.placementDone) throw "cannot place ship because placement is finished";
	this.field.place(ship, x, y, orientation);
};

GameInterface.prototype.finishPlacement = function() {
	this.placementDone = true;
	this.emit("placementDone");
};

GameInterface.prototype.shoot = function(x, y) {
	if (!this.active) throw "It's not your turn yet.";
	this.deactivate();
	var ship = this.field.getHit(x, y);
	if (ship) return {
		"hit" : true
	};
		
	return {
		"hit" : false
	};
};

GameInterface.prototype.activate = function(){
	if (this.active) return;
	this.active = true;
	this.emit('activate');
};

GameInterface.prototype.deactivate = function(){
	if (!this.active) return;
	this.active = false;
	this.emit('deactivate');
};