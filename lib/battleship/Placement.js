module.exports = Placement = function(ship, x, y, orientation){
	this.ship = ship;
	this.x = x;
	this.y = y;
	this.orientation = orientation;
};

var Ship = require('./Ship');

Placement.prototype.collidesWith = function(placement) {
	var getRange = function(p) {
		return {
			x1 : p.x,
			y1 : p.y, 
			x2 : p.x + (p.orientation == Ship.ORIENTATION_HORIZONTAL ? p.ship.getSize() : 0),
			y2 : p.y + (p.orientation == Ship.ORIENTATION_VERTICAL ? p.ship.geSize() : 0)
		};
	};
	var myRange = getRange(this),
		opRange = getRange(placement);
	
	return ((myRange.x1 < opRange.x1 || myRange.x2 > opRange.x2) &&
		    (myRange.y1 < opRange.y1 || myRange.y2 > opRange.y2));
};

Placement.prototype.contains = function(x, y) {
	return (x >= this.x && x <= this.x + (this.orientation == Ship.ORIENTATION_HORIZONTAL ? this.ship.getSize() : 0) &&
			y >= this.y && y <= this.y + (this.orientation == Ship.ORIENTATION_VERTICAL   ? this.ship.getSize() : 0));
};