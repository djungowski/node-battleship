var Ship = require('../../lib/battleship/Ship');

describe('Ship', function(){
	it ('should emit an event when hit', function(done){
		var ship = new Ship();
		ship.on('hit', done);
		
		ship.takeHit();
	});
	
	it ('should sink when hit often enough', function(done) {
		var ship = new Ship();
		ship.size = 3;
		ship.on('sinking', done);
		
		for (var i = 0; i < 3; i++) ship.takeHit();
	});
});