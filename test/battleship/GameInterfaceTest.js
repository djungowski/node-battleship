var assert = require('assert'),
	GameInterface = require('../../lib/battleship/GameInterface'),
	Player = require('../../lib/battleship/Player'),
	PlayingField = require('../../lib/battleship/PlayingField');

describe('GameInterface', function(){
	describe('#shoot', function() {
		it ('should deactivate the interface', function(done) {
			var i = new GameInterface(null, new PlayingField());
			i.shootingCall = function(){};
			i.on('deactivate', done);
			i.activate();
			
			i.shoot(0, 0);
		});
		
		it ('should fail if the interface is not activated', function(){
			var i = new GameInterface(null, {on:function(){}});
			assert.throws(i.shoot);
		});
	});
	
	it ('should emit an event when the opponent name is changed', function(done){
		var i = new GameInterface(null, {on:function(){}}),
			op = new Player(1);
		i.setOpponent(op);
		i.on('opponentNameChanged', function(name){
			assert(name === 'some name');
			done();
		});
		
		op.setName("some name");
	});
	
	it ('should emit a "lost" event when all ships have been destroyed', function(done){
		var field = new PlayingField(20),
			iFace = new GameInterface(null, field);
		
		// multiple calls to done will make the test fail. so make sure we don't continue shooting once all ships are sunk.
		var gameOver = false;
		field.on('loaded', function(){
			// just plaster the whole upper left quadrant with hits. that's where we expect
			// the ships to be placed initially.
			for (x = 0; x < 5; x++) for (y = 0; y < 5; y++) {
				if (gameOver) return;
				iFace.receiveShot(x, y);
			}
		});
		
		iFace.on('lost', function(){
			gameOver = true;
			done();
		});
	});
});