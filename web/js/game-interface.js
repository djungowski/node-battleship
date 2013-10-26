(function() {
    var GameInterface = function(socket) {
        this.socket = socket;
    };

    GameInterface.prototype.socket = null;

    GameInterface.prototype.initGame = function() {
        this.socket.sendJson({command:'getOpponentName'});
    };

    GameInterface.prototype.getPlacements = function() {
        this.socket.sendJson({
            command: 'getPlacements'
        });
    };

    GameInterface.prototype.finishPlacement = function() {
        this.socket.sendJson({
            command: 'finishPlacement'
        });
    };

    GameInterface.prototype.setPlayerName = function(name) {
        socket.sendJson({
            command: 'setPlayerName',
            data: [name]
        });
    };

    GameInterface.prototype.shoot = function(x, y) {
        this.socket.sendJson({
            command: 'shoot',
            data: [x, y]
        });
    };

    var iface = new GameInterface(window.socket);
    window.game = new Game(iface);
})();