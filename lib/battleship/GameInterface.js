module.exports = GameInterface = function(player, field) {
	var me = this;
	me.player = player;
	me.field = field;
	me.placementDone = false;
	me.active = false;
	
	['hit', 'sinking'].forEach(function(event){
		me.field.on(event, function(ship){
			me.emit(event, ship);
		});
	});
};

var util = require('util'),
	EventEmitter = require('events').EventEmitter;

util.inherits(GameInterface, EventEmitter);

GameInterface.prototype.setOpponent = function(opponent) {
	var me = this;
	me.opponent = opponent;
	me.opponent.on('nameChanged', function(name){
		me.emit('opponentNameChanged', name);
	});
};

GameInterface.prototype.getOpponentName = function() {
	return this.opponent.getName();
};

GameInterface.prototype.setPlayerName = function(name) {
	this.player.setName(name);
};

GameInterface.prototype.getPlayerName = function() {
	return this.player.getName();
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
	return this.shootingCall(x, y);
};

GameInterface.prototype.receiveShot = function(x, y) {
	var hit = this.field.getHit(x, y);
	if (hit) return {
		"hit" : true,
		"ship" : hit.ship
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