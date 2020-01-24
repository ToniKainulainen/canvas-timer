window.onload = function() {

};

function Timer(element) {
    /*
    this.millis = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.on = false;
    */
    this.element = element;
    var time = ["0","00","00"];
    var timeOut;

    this.startTime = function() {
        if(!this.on) {
            //console.log(this.seconds);
            this.on = true;
            timeCount();
        }
    };
    
    this.stopTime = function() {
        if(this.on) {
            clearTimeout(timeOut);
            this.on = false;
        }
    };

    function timeCount() {
        // tänne tulee elementin sisällön päivitys ja ajan näyttäminen
        if(!element.hasAttribute("value")) {
            element.innerHTML = time.toString.replace(",", ":");
        }
        timeOut = setTimeout(timeCount(), 10);
    }
}
