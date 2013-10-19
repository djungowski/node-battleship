module.exports = Ship = function() {
	this.x = 0;
	this.y = 0;
	this.orientation = Ship.ORIENTATION_HORIZONTAL;
};

Ship.ORIENTATION_HORIZONTAL = 0;
Ship.ORIENTATION_VERTICAL = 1;

Ship.prototype.place = function(x, y, orientation) {
	// TODO test if placement is valid (orientation + size within field bounds)
	// TODO test if placement collides with other ships
	this.x = x;
	this.y = y;
	this.orientation = orientation;
};