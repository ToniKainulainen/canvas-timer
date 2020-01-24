window.onload = function() {
    var timer = new Timer();
    timer.start();
};

function Timer() {
    this.sec = 0;
    this.start = function() {
        //console.log(this.sec);
    };
}