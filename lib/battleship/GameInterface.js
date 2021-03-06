module.exports = GameInterface = function(player, field) {
	var me = this;
	me.player = player;
	me.field = field;
	me.placementDone = false;
	me.active = false;
	
	['hit', 'miss', 'sinking',  'lose'].forEach(function(event){
		me.field.on(event, function(ship){
			me.emit(event, ship);
		});
	});
	
	['lose', 'win'].forEach(function(event){
		me.on(event, function(){
			me.gameEnded = true;
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
	if (typeof(x) !== 'number' || typeof(y) !== 'number') throw "Illegal parameters";
	if (!this.active) throw "It's not your turn yet.";
	if (this.gameEnded) throw "Game is over.";
	this.deactivate();
	return this.shootingCall(x, y);
};

GameInterface.prototype.receiveShot = function(x, y) {
	var hit = this.field.getHit(x, y);
	var res = {
			"hit": !!hit,
			"x": x,
			"y": y
	};
	if (hit) res['ship'] = hit.ship;
	
	return res;
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
