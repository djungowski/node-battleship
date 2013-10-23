(function() {
    var socket = new WebSocket('ws://localhost:3000');

    socket.sendJson = function(message) {
        socket.send(JSON.stringify(message));
    };

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
                game.init();
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

                // Den Spielernamen vom Gegener auslesen, sobald der eigene gesetzt wurde
                var message = {
                    command: 'getOpponentName'
                };
                socket.sendJson(message);
                break;
        }
    };

    window.socket = socket;
})();