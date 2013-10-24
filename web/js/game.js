(function() {
    var Game = function() {
        this.initLoader();
        this.initNameForm();
    };

    Game.prototype.state = 'preparation';

    /**
     * Der aktuelle Spieler
     * Kann sein: "you" oder "opponent"
     *
     * @type String
     */
    Game.prototype.activePlayer = null;

    /**
     * Alle Spieler der Partie
     *
     * @type {{you: {id: null, name: null}, opponent: {id: null, name: null}}}
     */
    Game.prototype.players = {
        you: null,
        opponent: null
    };

    Game.prototype.ships = [];

    Game.prototype.init = function() {
        $('.hide-on-start').show();
        this.setLoading(false);
        this.showNameForm(true);
        playingField.renderField();
        this.initPlayingField();
        this.initPlaceShipsLinks();
        socket.sendJson({command:'getOpponentName'});
    };

    Game.prototype.start = function() {
        $('.waiting-for-opponent').hide();
        $('.show-on-gamestart').show();
        this.setState('playing');
        // First off: Think that it's the opponents turn. Is changed by socket if different
        this.setActivePlayer('opponent');
    };

    Game.prototype.initPlaceShipsLinks = function() {
        var me = this;

        $('.place-ships-link').bind('click', function(event) {
            event.preventDefault();
            socket.sendJson({
                command: 'getPlacements'
            });
            game.startPlacement();
        });

        $('.placement-done-link').bind('click', function(event) {
            event.preventDefault();
            socket.sendJson({
                command: 'finishPlacement'
            });
            me.finishPlacement();
        });
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

    Game.prototype.setState = function(state) {
        this.state = state;
    };

    Game.prototype.isState = function(state) {
        return this.state == state;
    };

    Game.prototype.setActivePlayer = function(player) {
        this.activePlayer = player;

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

        $('#whose-turn-is-it').html(this.players[this.activePlayer].name);
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

        var me = this;
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

    Game.prototype.setFieldStatus = function(shootData) {
        var hit = shootData.hit;
        // CSS needs an offset 1
        var x = parseInt(shootData.x) + 1;
        var y = parseInt(shootData.y) + 1;

        if (hit) {
            window.playingField.setOpponentFieldStatus(x, y, 'hit')
        } else {
            window.playingField.setOpponentFieldStatus(x, y, 'used')
        }
    };

    Game.prototype.initLoader = function() {
        $('#loading').easyModal({
            closeOnEscape: false,
            overlayClose: false
        });
        this.setLoading(true);
    }

    Game.prototype.setLoading = function(loading) {
        if (loading) {
            $('#loading').trigger('openModal');
        } else {
            $('#loading').trigger('closeModal');
        }
    };

    Game.prototype.setShips = function(ships) {
        this.ships = ships;
        playingField.setShips(ships);
    };

    window.game = new Game();
})();