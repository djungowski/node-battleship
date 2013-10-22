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

    window.socket = socket;
})();