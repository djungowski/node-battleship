module.exports = Game = function(){
	var me = this;
	me.interfaces = [];
	me.givenInterfaces = 0;
	// two players. no other configuration possible.
	for (var i = 0; i < 2; i++) (function(i) {
		var iface = new GameInterface(
			new Player(i),
			new PlayingField(Game.FIELD_SIZE)
		);
		iface.on('placementDone', function(){
			// check if both players are finished placing
			var done = true;
			me.interfaces.forEach(function(i){
				done = done && i.placementDone;
			});
			if (done) me.start();
		});
		iface.on('deactivate', function(){
			// activate the other interface as soon as we are done with our turn
			me.interfaces[(i + 1) % 2].activate();
		});
		me.interfaces.push(iface);
	})(i);
	
	for (var i = 0; i < 2; i++) {
		me.interfaces[i].setOpponent(me.interfaces[(i + 1) % 2].player);
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

Game.prototype.start = function() {
	this.emit("gameStart");
	// choose one random interface to start initally
	var index = Math.floor(Math.random() * 2);
	this.interfaces[index].activate();
};