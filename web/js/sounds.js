(function() {
    var Sounds = function() {
        this.availableSounds = ['lose', 'win', 'hit', 'miss'];

        this.availableSounds.forEach(function(sound) {
            this[sound] = function() {
                this.play(sound);
            };
        }, this);
    };

    Sounds.prototype.play = function(sound) {
        $('#' + sound)[0].play();
    };

    window.sounds = new Sounds();
})();