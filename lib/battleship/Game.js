module.exports = Game = function(){
	var me = this;
	me.players = [];
	me.fields = [];
	// two players. no other configuration possible.
	for (var i = 0; i < 2; i++) {
		me.players[i] = new Player();
		me.fields[i] = new PlayingField(Game.FIELD_SIZE, me);
	}
};

var fs = require('fs'),
	PlayingField = require('./PlayingField'), 
	Player = require('./Player');

Game.FIELD_SIZE = 20;

Game.prototype.getShipTypes = function(callback){
	var me = this;
	if (me.types) return process.nextTick(me.types);
	fs.readdir(__dirname + '/ships', function(err, files) {
		me.types = [];
		files.forEach(function(file){
			me.types.push(require('./ships/' + file));
		});
		callback(me.types);
	});
};