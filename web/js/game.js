(function() {
    var Game = function() {
        this.initNameForm();
        this.initPlayingField();
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
        you: {
            id: null,
            name: null
        },
        opponent: {
            id: null,
            name: null
        }
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
        nameForm.trigger('openModal');

        var me = this;
        nameForm.on('submit', function(event) {
            event.preventDefault();

            // Hier fehlt noch die Serverinteraktion
            var yourName = $('#player-name').val();
            nameForm.trigger('closeModal');
            me.players.you.name = yourName;
            me.players.you.id = ''; // Kommt vom Server!
            $('.player.you .player-name').html(yourName)
        });
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

    window.game = new Game();
})();