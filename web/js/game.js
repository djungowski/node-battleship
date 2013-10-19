(function() {
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
})();