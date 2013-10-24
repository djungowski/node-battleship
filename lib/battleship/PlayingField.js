module.exports = PlayingField = function(size) {
	var me = this;
	me.size = size;
	me.placements = [];
	me.ships = {};
	Ship.getTypes(function(types){
		var index = 0;
		for (var name in types) (function(name){
			var type = types[name],
				ship = new type();
			ship.type = name;
			me.ships[name] = ship;
			me.placements.push(new Placement(ship, 0, index++, Ship.ORIENTATION_HORIZONTAL));
			ship.on('hit', function(){
				me.emit('hit', ship);
			});
			ship.on('sinking', function(){
				me.emit('sinking', ship);
			});
		})(name);
	});
};

var Ship = require('./Ship'),
	Placement = require('./Placement'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter;

util.inherits(PlayingField, EventEmitter);

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
	switch (typeof(shipName)) {
		case 'object':
			// shipName is actually a ship and does not need resolving.
			return shipName;
		case 'string':
			// lookup shipw
			return this.ships[shipName];
		default:
			throw "invalid arguments: " + shipName + " is no vaild ship identifier.";
	}
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
	var hit = false;
	this.placements.forEach(function(candidate) {
		if (candidate.contains(x, y)) hit = candidate;
	});
	if (hit) hit.ship.takeHit();
	return hit;
};