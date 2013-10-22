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
        }
    };

    window.socket = socket;
})();