module.exports = Ship = function() {};

Ship.ORIENTATION_HORIZONTAL = 0;
Ship.ORIENTATION_VERTICAL = 1;

Ship.prototype.getSize = function() {
	return this.size;
};