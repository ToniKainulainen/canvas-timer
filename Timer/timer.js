window.onload = function() {
    var timer = new Timer();
    timer.start();
};

function Timer() {
    this.millis = 0;
    this.seconds = 0;
    this.minutes = 0;

    this.start = function() {
        //console.log(this.seconds);
    };
    
    this.stop = function() {

    };
}