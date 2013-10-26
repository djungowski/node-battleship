(function() {
    var Sounds = function() {
        this.availableSounds = ['lose', 'win', 'hit', 'activate'];
        this.randomizedSounds = [
            { name: 'miss', numberOfSounds: 7 },
            { name: 'sinking', numberOfSounds: 2 }
        ];

        this.availableSounds.forEach(function(sound) {
            this[sound] = function() {
                this.play(sound);
            };
        }, this);

        this.randomizedSounds.forEach(function(sound) {
            this[sound.name] = function() {
                this.playRandomized(sound.name, sound.numberOfSounds)
            };
        }, this);
    };

    Sounds.prototype.play = function(sound) {
        var soundElement = $('#' + sound)[0];
        soundElement.pause();
        soundElement.currentTime = 0;
        soundElement.play();
    };

    Sounds.prototype.playRandomized = function(sound, numberOfSounds) {
        // First: randomize the sound
        var number = Math.floor(Math.random() * numberOfSounds) + 1
        // Second: play!
        this.play(sound + '-' + number);
    };

    window.sounds = new Sounds();
})();