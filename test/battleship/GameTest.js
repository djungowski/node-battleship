var Game = require('../../lib/battleship/Game');

describe("Game", function(){
	describe("#finishPlacement", function(){
		it ("should emit an event when both players finish their placement", function(done){
			var game = new Game();
			game.on("placementDone", done);
			game.finishPlacment(0);
			game.finishPlacment(1);
		});
	});
});