module.exports = Player = function(id) {
	this.id = id;
};

Player.prototype.getId = function() {
	return this.id;
};

Player.prototype.setName = function(name) {
	this.name = name;
};

Player.prototype.getName = function() {
	return this.name;
};