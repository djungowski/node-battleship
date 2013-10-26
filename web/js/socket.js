(function() {
    window.socket = new WebSocket('ws://' + window.location.host);

    socket.sendJson = function(message) {
        socket.send(JSON.stringify(message));
    };

    socket.onclose = function() {
        game.noConnection();
    };

    socket.onmessage = function(event) {
        var message = JSON.parse(event.data);
        console.log(message);

        switch(message.event) {
            case 'full':
                game.serverFull();
                break;

            case 'connected':
                game.init();
                break;

            case 'opponentNameChanged':
                var opponentName = message.data[0];
                game.setPlayerName('opponent', opponentName);
                break;

            case 'gameStart':
                game.start();
                break;

            case 'activate':
                sounds.activate();
                game.setActivePlayer('you');
                break;

            case 'deactivate':
                game.setActivePlayer('opponent');
                break;

            case 'hit':
                sounds.hit();
                game.setFieldStatus('you', message.data[0]);
                break;

            case 'miss':
                game.setFieldStatus('you', message.data[0]);
                break;

            case 'sinking':
                sounds.sinking();
                break;

            case 'win':
                sounds.win();
                game.end(message.event);
                break;

            case 'lost':
                sounds.lose();
                game.end(message.event);
                break;
        }

        switch(message.command) {
            case 'setPlayerName':
                var yourName = $('#player-name').val();
                game.setPlayerName('you', yourName);
                break;

            case 'getPlacements':
                game.setShips(message.data);
                break;

            case 'getOpponentName':
                if (message.data) {
                    var opponentName = message.data;
                    game.setPlayerName('opponent', opponentName)
                }
                break;

            case 'shoot':
                game.setFieldStatus('opponent', message.data);
                if (message.data.hit) {
                    sounds.hit();
                } else {
                    sounds.miss();
                }
                break;
        }
    };
})();