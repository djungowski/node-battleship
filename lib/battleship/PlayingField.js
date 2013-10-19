module.exports = PlayingField = function(size, game) {
	var me = this;
	me.size = size;
	me.ships = [];
	me.placements = [];
	game.getShipTypes(function(types){
		types.forEach(function(type, index){
			var ship = new type();
			me.ships.push(ship);
		});
	});
};

var Ship = require('./Ship'),
	Placement = require('./Placement');

PlayingField.prototype.play = function(ship, x, y, orientation) {
	ship = this.getShip(ship);
	
	if ( x + (orientation == Ship.ORIENTATION_HORIZONTAL ? ship.getSize() : 0) > me.size ||
	     y + (orientation == Ship.ORIENTATION_VERTICAL   ? ship.getSize() : 0) > me.size)
		throw "ship placement beyond playing field bounds";
	
	var placement = this.getPlacement(ship);
	if (placement) this.placements.splice(this.placements.indexOf(placement));
	
	newPlacement = new Placement(ship, x, y, orientation);
	var collisions = this.getCollisions(newPlacement);
	if (collisions.length) throw "placement collides with another ship";
	this.placements.push(newPlacement);
};

PlayingField.prototype.getShip = function(shipIndex) {
	if (shipIndex instanceof Ship) return shipIndex;
	return this.ships[shipIndex];
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