(function() {
    var socket = new WebSocket('ws://' + window.location.host);

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
                $('.opponent .player-name').html(opponentName)
                break;

            case 'gameStart':
                game.start();
                break;
        }

        switch(message.command) {
            case 'setPlayerName':
                var yourName = $('#player-name').val();
                nameForm.trigger('closeModal');
                game.players.you = yourName;
                $('.you .player-name').html(yourName);
                break;

            case 'getPlacements':
                game.setShips(message.data);
                break;
                
            case 'getOpponentName':
                var opponentName = message.data[0];
                game.players.opponent = opponentName;
                $('.opponent .player-name').html(opponentName);
                break;
        }
    };

    window.socket = socket;
})();