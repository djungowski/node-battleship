(function() {
    /**
     * The GameInterface reacts on certain actions of the game
     * @param socket
     * @constructor
     */
    var GameInterface = function(socket) {
        this.socket = socket;
    };

    /**
     * WebSocket connection to the server
     *
     * @type WebSocket
     */
    GameInterface.prototype.socket = null;

    /**
     * This method is called as soon as the game is initialized
     *
     */
    GameInterface.prototype.initGame = function() {
        this.socket.sendJson({command:'getOpponentName'});
    };

    /**
     * This method is called after the own player name was set
     *
     * @param name
     */
    GameInterface.prototype.setPlayerName = function(name) {
        socket.sendJson({
            command: 'setPlayerName',
            data: [name]
        });
    };

    /**
     * This method is called when the user starts placing his/her ships
     *
     */
    GameInterface.prototype.startPlacement = function() {
        this.socket.sendJson({
            command: 'getPlacements'
        });
    };

    /**
     * This method is called when placing a ship
     *
     * @param shipType
     * @param x
     * @param y
     * @param orientation
     */
    GameInterface.prototype.placeShip = function(shipType, x, y, orientation) {
        this.socket.sendJson({
            command: 'place',
            data: [shipType, x, y, orientation]
        });
    };

    /**
     * This method is called when the user has completed placing his/her ships
     *
     */
    GameInterface.prototype.finishPlacement = function() {
        this.socket.sendJson({
            command: 'finishPlacement'
        });
    };

    /**
     * This method is called when shooting
     *
     * @param x
     * @param y
     */
    GameInterface.prototype.shoot = function(x, y) {
        this.socket.sendJson({
            command: 'shoot',
            data: [x, y]
        });
    };

    var iface = new GameInterface(window.socket);

    window.playingField = new PlayingField(iface);
    window.game = new Game(iface);
})();