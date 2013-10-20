var assert = require('assert'),
	Placement = require('../../lib/battleship/Placement'),
	Ship = require('../../lib/battleship/Ship'),
	Carrier = require('../../lib/battleship/ships/Carrier');

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
	
	describe('#collidesWith', function(){
		it("should return false on two parallel, touching placements", function(){
			var ship1 = new Carrier(), 
			    ship2 = new Carrier(),
			    p1 = new Placement(ship1, 5, 5, Ship.ORIENTATION_HORIZONTAL),
				p2 = new Placement(ship2, 5, 6, Ship.ORIENTATION_HORIZONTAL);
			assert(!p1.collidesWith(p2));
		});
		
		it("should return true on to identical placements", function(){
			var ship1 = new Carrier(), 
			    ship2 = new Carrier(),
			    p1 = new Placement(ship1, 5, 5, Ship.ORIENTATION_HORIZONTAL),
				p2 = new Placement(ship2, 5, 5, Ship.ORIENTATION_HORIZONTAL);
			assert(p1.collidesWith(p2));
		});
		
		it ("should return false on two placements behind each other", function(){
			var ship1 = new Carrier(), 
			    ship2 = new Carrier(),
			    p1 = new Placement(ship1, 5, 5, Ship.ORIENTATION_HORIZONTAL),
				p2 = new Placement(ship2, 10, 5, Ship.ORIENTATION_HORIZONTAL);
			assert(!p1.collidesWith(p2));
		});
		
		it ("should return true when two placements overlap by one aligned with orientation", function(){
			var ship1 = new Carrier(), 
		    	ship2 = new Carrier(),
		    	p1 = new Placement(ship1, 5, 5, Ship.ORIENTATION_HORIZONTAL),
		    	p2 = new Placement(ship2, 9, 5, Ship.ORIENTATION_HORIZONTAL);
			assert(p1.collidesWith(p2));
		});
		
		it ("should return true when to placements cross each other", function(){
			var ship1 = new Carrier(), 
		    	ship2 = new Carrier(),
		    	p1 = new Placement(ship1, 5, 5, Ship.ORIENTATION_HORIZONTAL),
		    	p2 = new Placement(ship2, 7, 3, Ship.ORIENTATION_VERTICAL);
			assert(p1.collidesWith(p2));
		});
	});
});