(function() {
    var Sounds = function() {
        this.availableSounds = ['lose', 'win', 'hit', 'activate'];

        this.availableSounds.forEach(function(sound) {
            this[sound] = function() {
                this.play(sound);
            };
        }, this);
    };

    Sounds.prototype.play = function(sound) {
        var soundElement = $('#' + sound)[0];
        soundElement.pause();
        soundElement.currentTime = 0;
        soundElement.play();
    };

    Sounds.prototype.playRandomSound = function(sound, numberOfSounds) {
        // First: randomize the sound
        var number = Math.floor(Math.random() * numberOfSounds) + 1
        // Second: play!
        this.play(sound + '-' + number);
    };

    Sounds.prototype.miss = function() {
        this.playRandomSound('miss', 7);
    };

    Sounds.prototype.sinking = function() {
        this.playRandomSound('sinking', 2);
    };

    window.sounds = new Sounds();
})();