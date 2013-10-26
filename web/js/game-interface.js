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

    var iface = new GameInterface(window.socket);
    window.game = new Game(iface);
})();