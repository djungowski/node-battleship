(function() {
    /**
     * Das GameInterface reagiert auf bestimmte Aktionen aus dem Spiel
     * @param socket
     * @constructor
     */
    var GameInterface = function(socket) {
        this.socket = socket;
    };

    /**
     * Websocket Verbindung zum Server
     *
     * @type WebSocket
     */
    GameInterface.prototype.socket = null;

    /**
     * Wird aufgerufen, wenn das Spiel an sich initialisiert wird
     */
    GameInterface.prototype.initGame = function() {
        this.socket.sendJson({command:'getOpponentName'});
    };

    /**
     * Wird aufgerufen, wenn der eigene Spielername gesetzt wird
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
     * Wird aufgerufen, wenn der Benutzer anfaengt seine Schiffe zu positionieren
     *
     */
    GameInterface.prototype.startPlacement = function() {
        this.socket.sendJson({
            command: 'getPlacements'
        });
    };

    GameInterface.prototype.placeShip = function(shipType, x, y, orientation) {
        this.socket.sendJson({
            command: 'place',
            data: [shipType, x, y, orientation]
        });
    };

    /**
     * Wird aufgerufen, wenn der Benutzer fertig ist seine Schiffe zu positionieren
     *
     */
    GameInterface.prototype.finishPlacement = function() {
        this.socket.sendJson({
            command: 'finishPlacement'
        });
    };

    /**
     * Wird aufgerufen, wenn der Benutzer einen Schuss abgibt
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