(function() {
    // Klick auf das rechte Spielfeld
    $('.player:last-child table').on('click', function(event) {
        field = $(event.target);
        if (!field.hasClass('used')) {
            $(event.target).addClass('used');
        }
    });
})();