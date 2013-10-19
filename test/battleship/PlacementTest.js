var assert = require('assert');

var Placement = require('../../lib/battleship/Placement'),
	Ship = require('../../lib/battleship/Ship');

describe("Placement", function(){
	describe('#contains', function(){
		it("should return false when coordinates are out, horizontal", function(){
			var ship = new Ship();
			ship.size = 3;
			var p = new Placement(ship, 5, 5, Ship.ORIENTATION_HORIZONTAL);
			assert(!p.contains(10, 10));
			assert(!p.contains(4, 5));
			assert(!p.contains(8, 5));
			assert(!p.contains(6, 4));
			assert(!p.contains(6, 6));
		});
		
		it("should return false when coordinates are out, vertical", function(){
			var ship = new Ship();
			ship.size = 3;
			var p = new Placement(ship, 5, 5, Ship.ORIENTATION_VERTICAL);
			assert(!p.contains(10, 10));
			assert(!p.contains(5, 4));
			assert(!p.contains(5, 8));
			assert(!p.contains(4, 6));
			assert(!p.contains(6, 6));
		});
		
		it("should return true when coordinates are in, horizontal", function(){
			var ship = new Ship();
			ship.size = 3;
			var p = new Placement(ship, 5, 5, Ship.ORIENTATION_HORIZONTAL);
			assert(p.contains(5, 5));
			assert(p.contains(6, 5));
			assert(p.contains(7, 5));
		});
		
		it("should return true when coordinates are in, vertical", function(){
			var ship = new Ship();
			ship.size = 3;
			var p = new Placement(ship, 5, 5, Ship.ORIENTATION_VERTICAL);
			assert(p.contains(5, 5));
			assert(p.contains(5, 6));
			assert(p.contains(5, 7));
		});
	});
});