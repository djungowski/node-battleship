(function() {
    var socket = new WebSocket('ws://localhost:3000');

    socket.onopen = function(event) {

    };

    socket.onclose = function(event) {
        game.setLoading(true);
        game.showNameForm(false);
    };

    socket.onmessage = function(event) {
        var message = JSON.parse(event.data);
        console.log(message);

        switch(message.event) {
            case 'full':
                $('#loading').html("Der Server ist voll.");
                break;

            case 'connected':
                $('.hide-on-start').show();
                game.setLoading(false);
                game.showNameForm(true);
                playingField.renderField();
                game.initPlayingField();
                break;

            case 'opponentNameChanged':
                var opponentName = message.data[0];
                game.players.opponent = opponentName;
                $('.player.opponent .player-name').html(opponentName)
        }

        switch(message.command) {
            case 'setPlayerName':
                var yourName = $('#player-name').val();
                nameForm.trigger('closeModal');
                game.players.you = yourName;
                $('.player.you .player-name').html(yourName)

                // W
                break;
        }
    };

    window.socket = socket;
})();