var assert = require('assert'),
	GameInterface = require('../../lib/battleship/GameInterface'),
	PlayingField = require('../../lib/battleship/PlayingField');

describe('GameInterface', function(){
	describe('#shoot', function() {
		it ('should deactivate the interface', function(done) {
			var i = new GameInterface(null, new PlayingField());
			i.on('deactivate', done);
			i.activate();
			
			i.shoot(0, 0);
		});
		
		it ('should fail if the interface is not activated', function(){
			var i = new GameInterface();
			assert.throws(i.shoot);
		});
	});
});