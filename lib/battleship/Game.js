module.exports = Game = function(){
	var me = this;
	me.interfaces = [];
	me.givenInterfaces = 0;
	// two players. no other configuration possible.
	for (var i = 0; i < 2; i++) {
		var iface = new GameInterface(
			this,
			new Player(i),
			new PlayingField(Game.FIELD_SIZE)
		);
		iface.on('placementDone', function(){
			// check if both players are finished placing
			var done = true;
			me.interfaces.forEach(function(i){
				done = done && i.placementDone;
			});
			if (done) me.emit("gameStart");
		});
		me.interfaces.push(iface);
	}
};

Game.FIELD_SIZE = 20;

var util = require('util'),
	GameInterface = require('./GameInterface'),
	PlayingField = require('./PlayingField'), 
	Player = require('./Player'),
	EventEmitter = require('events').EventEmitter;

util.inherits(Game, EventEmitter);

Game.prototype.getNextInterface = function(){
	var me = this;
	if (me.givenInterfaces >= me.interfaces.length) throw "Maximum player count reached";
	return me.interfaces[me.givenInterfaces++];
};