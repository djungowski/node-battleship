(function() {
    var socket = new WebSocket('ws://localhost:3000');

    socket.onopen = function(event) {
        game.setLoading(false);
        game.showNameForm(true);
        playingField.renderField();
        game.initPlayingField();
    };

    socket.onclose = function(event) {
        game.setLoading(true);
        game.showNameForm(false);
    };

    socket.onmessage = function(event) {
        var message = JSON.parse(event.data);

        switch(message.status) {
            case 'FULL':
                $('#loading').html("Der Server ist voll.");
                break;
        }
    };

    window.socket = socket;
})();