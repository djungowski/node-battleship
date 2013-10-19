(function() {
    var Game = function() {
        this.initNameForm();
        this.initPlayingField();
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
        nameForm.on('submit', function(event) {
            event.preventDefault();

            // Hier fehlt noch die Serverinteraktion
            nameForm.trigger('closeModal');
            $('.player.you .player-name').html($('#player-name').val())
        });
    };

    Game.prototype.initPlayingField = function() {
        // Klick auf das rechte Spielfeld
        $('.player.opponent table').on('click', function(event) {
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