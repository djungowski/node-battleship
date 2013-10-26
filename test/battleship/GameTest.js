var Game = require('../../lib/battleship/Game');

describe("Game", function(){
	it ("should emit an event on both interfaces when both players finish their placement", function(done){
		var game = new Game();
		var events = 0;
		for (var i = 0; i < 2; i++) {
			var iface = game.getNextInterface();
			iface.on('gameStart', function(){
				if (++events == 2) done();
			});
			iface.finishPlacement();
		}
	});

	it ("should activate exactly one interface on game start", function(done) {
		var game = new Game();
		for (var i = 0; i < 2; i++) {
			game.getNextInterface().on('activate', done);
		}
		game.start();
	});
	
	it ("should activate the other interface when the current one is deactivated", function(done){
		var game = new Game(),
			i1 = game.getNextInterface(),
			i2 = game.getNextInterface(),
			active, inactive;

		game.start();
		if (i1.active) {
			active = i1; inactive = i2;
		} else {
			active = i2; inactive = i1;
		}
		
		inactive.on('activate', done);
		active.deactivate();
	});
});