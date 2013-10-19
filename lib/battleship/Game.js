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

var PlayingField = require('./PlayingField'), 
	Player = require('./Player');

Game.FIELD_SIZE = 20;