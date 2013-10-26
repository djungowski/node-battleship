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
    };

    /**
     * Wird aufgerufen, wenn der eigene Spielername gesetzt wird
     *
     * @param name
     */
    GameInterface.prototype.setPlayerName = function(name) {
    };

    /**
     * Wird aufgerufen, wenn der Benutzer anfaengt seine Schiffe zu positionieren
     *
     */
    GameInterface.prototype.startPlacement = function() {
    };

    /**
     * Wird aufgerufen, wenn der Benutzer ein Schiff platziert
     *
     * @param shipType
     * @param x
     * @param y
     * @param orientation
     */
    GameInterface.prototype.placeShip = function(shipType, x, y, orientation) {
    };

    /**
     * Wird aufgerufen, wenn der Benutzer fertig ist seine Schiffe zu positionieren
     *
     */
    GameInterface.prototype.finishPlacement = function() {
    };

    /**
     * Wird aufgerufen, wenn der Benutzer einen Schuss abgibt
     *
     * @param x
     * @param y
     */
    GameInterface.prototype.shoot = function(x, y) {
    };

    var iface = new GameInterface(window.socket);
    window.playingField = new PlayingField(iface);
    window.game = new Game(iface);
})();