var Game = function(gameInterface) {
    this.gameInterface = gameInterface;
    this.initLoader();
    this.initNameForm();
};

Game.prototype.gameInterface = null;

/**
 * Alle Spieler der Partie
 *
 * @type {{you: null, opponent: null}}
 */
Game.prototype.players = {
    you: null,
    opponent: null
};

Game.prototype.ships = [];

Game.prototype.init = function() {
    $('.hide-on-start').show();
    this.showMessage(false);
    this.showNameForm(true);
    playingField.renderField();
    this.initPlayingField();
    this.initPlaceShipsLinks();
    this.gameInterface.initGame();
};

Game.prototype.start = function() {
    $('.waiting-for-opponent').hide();
    $('.show-on-gamestart').show();
    // First off: Think that it's the opponents turn. Is changed by socket if different
    this.setActivePlayer('opponent');
};

Game.prototype.end = function(playerStatus) {
    if (playerStatus == 'win') {
        this.showMessage(true, 'Du hast gewonnen :)');
    } else {
        this.showMessage(true, 'Du hast verloren :(');
    }
};

Game.prototype.serverFull = function() {
    $('#message').html("Der Server ist voll.");
};

Game.prototype.initPlaceShipsLinks = function() {
    $('.place-ships-link').bind('click', $.proxy(function(event) {
        event.preventDefault();
        socket.sendJson({
            command: 'getPlacements'
        });
        game.startPlacement();
    }, this));

    $('.placement-done-link').bind('click', $.proxy(function(event) {
        event.preventDefault();
        socket.sendJson({
            command: 'finishPlacement'
        });
        this.finishPlacement();
    }, this));
};

Game.prototype.startPlacement = function() {
    $('.place-ships').hide();
    $('.player.you .interaction-blocked').hide();
    $('.placement-done').show();
};

Game.prototype.finishPlacement = function() {
    $('.placement-done').hide();
    $('.player.you .interaction-blocked').show();
    $('.waiting-for-opponent').show();

    // Remove all events on own field
    $('.player.you table').unbind();
    $('.player.you table td').unbind();
};

Game.prototype.setPlayerName = function(player, name) {
    this.players[player] = name;
    $('.' + player + ' .player-name').html(name);
    if (player == 'you') {
        this.showNameForm(false);
    }
};

Game.prototype.setActivePlayer = function(player) {
    var you = $('.player.you');
    var opponent = $('.player.opponent');

    if (player == 'you') {
        opponent.find('.interaction-blocked').hide();
        you.find('.player-name').addClass('active-player');
        opponent.find('.player-name').removeClass('active-player');
        $('.whose-turn-is-it').html(this.players.you);
    } else {
        opponent.find('.interaction-blocked').show();
        you.find('.interaction-blocked').show();
        you.find('.player-name').removeClass('active-player');
        opponent.find('.player-name').addClass('active-player');
        $('.whose-turn-is-it').html(this.players.opponent);
    }

    $('#whose-turn-is-it').html(this.players[player].name);
};

Game.prototype.initNameForm = function() {
    nameForm = $('#enter-player-name');
    // Spielername als Modal anzeigen
    nameForm.easyModal({
        closeOnEscape: false,
        overlayClose: false,
        onOpen: function() {
            nameForm.find('input').focus();
        }
    });

    nameForm.bind('submit', function(event) {
        event.preventDefault();

        var yourName = $('#player-name').val();
        var message = {
            command: 'setPlayerName',
            data: [yourName]
        };
        socket.sendJson(message);
    });
};

Game.prototype.showNameForm = function(show) {
    if (show) {
        $('#enter-player-name').trigger('openModal');
    } else {
        $('#enter-player-name').trigger('closeModal');
    }
};

Game.prototype.initPlayingField = function() {
    var opponent = $('.player.opponent');

    // Am Anfang ist das rechte Spielfeld geblockt
    // Das rechte Spielfeld wird erst entblockt, wenn alle Spieler ihre Schiffe platziert
    // haben und wenn der User an der Reihe ist
    $('.interaction-blocked').show();

    // Klick auf das rechte Spielfeld
    opponent.find('table').bind('click', function(event) {
        field = $(event.target);
        if (!field.hasClass('used')) {
            // Beispiel: x und y auslesen
            var x = parseInt(field.attr('x'));
            var y = parseInt(field.attr('y'));

            window.socket.sendJson({
                command: 'shoot',
                data: [x, y]
            });
        }
    });
};

Game.prototype.setFieldStatus = function(player, shootData) {
    var hit = shootData.hit;
    // CSS needs an offset 1
    var x = parseInt(shootData.x) + 1;
    var y = parseInt(shootData.y) + 1;

    if (hit) {
        window.playingField.setFieldStatus(player, x, y, 'hit', shootData.ship.type)
    } else {
        window.playingField.setFieldStatus(player, x, y, 'used')
    }
};

Game.prototype.initLoader = function() {
    var messageDiv = $('#message');
    messageDiv.easyModal({
        closeOnEscape: false,
        overlayClose: false
    });
    this.showMessage(true);
};

Game.prototype.setLoading = function(loading) {
    this.showMessage(loading, 'Starte Schiffe versenken... <img src="images/ajax-loader.gif" />');
};

Game.prototype.showMessage = function(show, message) {
    this.showNameForm(false);
    var messageDiv = $('#message');
    if (message) {
        messageDiv.html(message);
    }
    if (show) {
        messageDiv.trigger('openModal');
    } else {
        messageDiv.trigger('closeModal');
    }
};

Game.prototype.setShips = function(ships) {
    this.ships = ships;
    playingField.setShips(ships);
};