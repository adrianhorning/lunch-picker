class LunchPicker {
    constructor() {
        this.restaurants = [
            { 'fillStyle': '#eae56f', 'text': 'Chick-fil-A' },
            { 'fillStyle': '#89f26e', 'text': 'Gurus' },
            { 'fillStyle': '#7de6ef', 'text': '2 Jacks' },
            { 'fillStyle': '#e7706f', 'text': 'Wingers' },
            { 'fillStyle': '#eae56f', 'text': 'Wendys' },
            { 'fillStyle': '#7de6ef', 'text': 'Red Robin' },
            { 'fillStyle': '#88f9f1', 'text': 'Cafe Rio' },
            { 'fillStyle': '#4227ff', 'text': 'Zao' },
            { 'fillStyle': '#53ac37', 'text': '180 Tacos' },
            { 'fillStyle': '#de2f1b', 'text': 'Habit' },
            { 'fillStyle': '#ee2f1b', 'text': 'Sweeto Burrito' },
            { 'fillStyle': '#de2f6b', 'text': 'Even Stevens' },
            { 'fillStyle': '#de1f6b', 'text': 'Del Taco' },
            { 'fillStyle': '#ee2f6e', 'text': 'Jimmy Johns' },
            { 'fillStyle': '#ce2f6w', 'text': 'Kneaders' },
            { 'fillStyle': '#6e2f6w', 'text': 'Thai Village' },
            { 'fillStyle': '#5e3f6w', 'text': 'Mooyah' },
            { 'fillStyle': '#5e3f6w', 'text': 'Station 22' },
            { 'fillStyle': '#5e3f6w', 'text': 'Bumble Bees' },
            { 'fillStyle': '#5e3f6w', 'text': 'Mo Bettahs' }
        ];
        this.theWheel = this.createWheel();
        this.wheelPower = 0;
        this.wheelSpinning = false;
    }
    
    createWheel() {
        const numOfSpins = Math.floor(Math.random() * (12 - 3 + 1)) + 3;
        const duration = Math.floor(Math.random() * (8 - 2 + 1)) + 2;
        const shuffledRestaurants = this.shuffle(this.restaurants);
        console.log(numOfSpins);
        console.log(duration);
        return new Winwheel({
            'numSegments':  shuffledRestaurants.length,     // Specify number of segments.
            'outerRadius':  212,   // Set outer radius so wheel fits inside the background.
            'textFontSize': 25,    // Set font size as desired.
            'segments':     shuffledRestaurants,
            'animation':           // Specify the animation to use.
            {
                'type': 'spinToStop',
                'duration': duration,     // Duration in seconds.
                'spins': numOfSpins,     // Number of complete spins.
                'callbackFinished': this.alertPrize
            }
        });
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        
        return array;
    }
    powerSelected(powerLevel) {
        // Ensure that power can't be changed while wheel is spinning.
        if (this.wheelSpinning == false) {
            // Reset all to grey incase this is not the first time the user has selected the power.
            document.getElementById('pw1').className = "";
            document.getElementById('pw2').className = "";
            document.getElementById('pw3').className = "";
    
            // Now light up all cells below-and-including the one selected by changing the class.
            if (powerLevel >= 1) {
                document.getElementById('pw1').className = "pw1";
            }
    
            if (powerLevel >= 2) {
                document.getElementById('pw2').className = "pw2";
            }
    
            if (powerLevel >= 3) {
                document.getElementById('pw3').className = "pw3";
            }
    
            // Set wheelPower var used when spin button is clicked.
            wheelPower = powerLevel;
    
            // Light up the spin button by changing it's source image and adding a clickable class to it.
            document.getElementById('spin_button').src = "spin_on.png";
            document.getElementById('spin_button').className = "clickable";
        }
    }
    startSpin() {
        // Ensure that spinning can't be clicked again while already running.
        if (this.wheelSpinning == false) {
            // Based on the power level selected adjust the number of spins for the wheel, the more times is has
            // to rotate with the duration of the animation the quicker the wheel spins.
            if (this.wheelPower == 1) {
                this.theWheel.animation.spins = 3;
            }
            else if (this.wheelPower == 2) {
                this.theWheel.animation.spins = 8;
            }
            else if (this.wheelPower == 3) {
                this.theWheel.animation.spins = 15;
            }
    
            // Disable the spin button so can't click again while wheel is spinning.
            document.getElementById('spin_button').src = "spin_off.png";
            document.getElementById('spin_button').className = "";
    
            // Begin the spin animation by calling startAnimation on the wheel object.
            this.theWheel.startAnimation();
    
            // Set to true so that power can't be changed and spin button re-enabled during
            // the current animation. The user will have to reset before spinning again.
            this.wheelSpinning = true;
        }
    }
    resetWheel() {
        this.theWheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
        this.theWheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
        this.theWheel.draw();                // Call draw to render changes to the wheel.
    
        document.getElementById("winning-restaurant-title").innerHTML = "";
        document.getElementById("winning-restaurant").innerHTML = "";
        // document.getElementById('pw1').className = "";  // Remove all colours from the power level indicators.
        // document.getElementById('pw2').className = "";
        // document.getElementById('pw3').className = "";
    
        document.getElementById('spin_button').src = "spin_on.png";
        document.getElementById('spin_button').className = "clickable";
    
        this.wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
        this.theWheel = this.createWheel();

    }
    alertPrize(indicatedSegment) {
        // Do basic alert of the segment text. You would probably want to do something more interesting with this information.
        document.getElementById("winning-restaurant-title").innerHTML = `YAY! We're going to:`
        document.getElementById("winning-restaurant").innerHTML = `${indicatedSegment.text}!`
    }
}

const lunchPicker = new LunchPicker();