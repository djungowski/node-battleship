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

    Sounds.prototype.sinking = function() {
        // First: randomize the sinking sound
        var number = Math.floor(Math.random() * 2) + 1
        // Second: play!
        this.play('sinking-' + number);
    };

    window.sounds = new Sounds();
})();