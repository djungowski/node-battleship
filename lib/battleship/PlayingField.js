module.exports = PlayingField = function(size) {
	var me = this;
	me.size = size;
	me.placements = [];
	me.ships = {};
	Ship.getTypes(function(types){
		//console.info(types);
		var index = 0;
		for (var name in types) {
			var type = types[name],
				ship = new type();
			me.ships[name] = ship;
			me.placements.push(new Placement(ship, 0, index++, Ship.ORIENTATION_HORIZONTAL));
		};
	});
};

var Ship = require('./Ship'),
	Placement = require('./Placement');

PlayingField.prototype.place = function(ship, x, y, orientation) {
	// resolve ship name, if necessary
	ship = this.getShip(ship);
	
	if ( x + (orientation == Ship.ORIENTATION_HORIZONTAL ? ship.getSize() : 0) > this.size ||
	     y + (orientation == Ship.ORIENTATION_VERTICAL   ? ship.getSize() : 0) > this.size)
		throw "ship placement beyond playing field bounds";
	
	var placement = this.getPlacement(ship);
	if (placement) this.placements.splice(this.placements.indexOf(placement));
	
	newPlacement = new Placement(ship, x, y, orientation);
	var collisions = this.getCollisions(newPlacement);
	if (collisions.length) throw "placement collides with another ship";
	this.placements.push(newPlacement);
};

PlayingField.prototype.getShip = function(shipName) {
	if (typeof(shipName) == 'object') return shipName;
	return this.ships[shipName];
};

PlayingField.prototype.getPlacement = function(ship) {
	this.placements.forEach(function(placement) {
		if (placement.ship == ship) return placement;
	});
	return false;
};

PlayingField.prototype.getCollisions = function(placement) {
	var collisions = [];
	this.placements.forEach(function(candidate) {
		if (placement.collidesWith(candidate)) collisions.push(candidate);
	});
	return collisions;
};

PlayingField.prototype.getHit = function(x, y) {
	this.placements.forEach(function(candidate) {
		if (candidate.contains(x, y)) return candidate;
	});
	return false;
};