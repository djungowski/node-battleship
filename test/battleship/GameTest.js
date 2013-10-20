var Game = require('../../lib/battleship/Game');

describe("Game", function(){
	it ("should emit an event when both players finish their placement", function(done){
		var game = new Game();
		game.on("gameStart", done);
		for (var i = 0; i < 2; i++) game.getNextInterface().finishPlacement();
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