module.exports = Game = function(){
	var me = this;
	me.players = [];
	me.fields = [];
	// two players. no other configuration possible.
	for (var i = 0; i < 2; i++) {
		me.players[i] = new Player();
		me.fields[i] = new PlayingField(Game.FIELD_SIZE);
	}
};

Game.FIELD_SIZE = 20;

var util = require('util'),
	PlayingField = require('./PlayingField'), 
	Player = require('./Player'),
	EventEmitter = require('events').EventEmitter;

util.inherits(Game, EventEmitter);

Game.prototype.place = function(ship, x, y, orientation) {
	
};

Game.prototype.finishPlacment = function(playerId) {
	this.fields[playerId].finishPlacement();
	
	// check if both players are finished placing
	var done = true;
	this.fields.forEach(function(field){
		done = done && field.placementDone;
	});
	if (done) this.emit("placementDone");
};

Game.prototype.shoot = function(x, y) {
	
};