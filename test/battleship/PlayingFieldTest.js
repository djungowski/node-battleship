var PlayingField = require('../../lib/battleship/PlayingField'),
	Ship = require('../../lib/battleship/Ship'),
	assert = require('assert');

describe('PlayingField', function(){
	describe('#getHit', function(){
		it ('should return false when no ship was hit', function(done){
			var field = new PlayingField(20);
			
			process.nextTick(function(){
				field.place("carrier", 5, 5, Ship.ORIENTATION_HORIZONTAL);
				
				var hit = field.getHit(10, 10);
				assert(hit === false);
				done();
			});
		});
		
		it ('should return true whe a ship was hit', function(done){
			var field = new PlayingField(20);
			
			process.nextTick(function(){
				field.place("carrier", 5, 5, Ship.ORIENTATION_HORIZONTAL);
				
				var hit = field.getHit(5, 5);
				assert(hit);
				done();
			});
		});
		
		it ('does not produce ghostships on placement', function(){
			var field = new PlayingField(20);
			
			field.on('loaded', function(){
				var originalCount = field.placements.length;
				field.place('carrier', 10, 10, Ship.ORIENTATION_HORIZONTAL);
				
				assert(originalCount === field.placements.length);
			});
		});
	});
});