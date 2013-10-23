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

    Game.prototype.setState = function(state) {
        this.state = state;
    };

    Game.prototype.setActivePlayer = function(player) {
        this.activePlayer = player;

        var youBlock = $('.player.you .interaction-blocked');
        var opponentBlock = $('.player.opponent .interaction-blocked');

        if (player == 'you') {
            opponentBlock.hide();
        } else {
            opponentBlock.show();
            youBlock.show();
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
        nameForm.on('submit', function(event) {
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
        opponent.find('.interaction-blocked').show();

        // Klick auf das rechte Spielfeld
        opponent.find('table').on('click', function(event) {
            field = $(event.target);
            if (!field.hasClass('used')) {
                // Hier fehlt noch die Serverinteraktion
                field.addClass('used');

                // Beispiel: x und y auslesen
                console.log(field.attr('x'));
                console.log(field.attr('y'));
            }
        });
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

    window.game = new Game();
})();