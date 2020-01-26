window.onload = function() {
    //var element = this.document.getElementById("input");
    //this.console.log(element.nodeName);
    var startBtn = this.document.getElementById("start-btn");
    var stopBtn = this.document.getElementById("stop-btn");
    var timer = new Timer("timer");
    this.console.log(timer.time);
    stopBtn.addEventListener("click", timer.stopCount());
    startBtn.addEventListener("click", timer.startCount());
};

// liian vaikea kokeile setInterval funtiota mieluummin

function Timer(elementId) {
    //this.element = document.getElementById(elementId);
    
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.time = ["0","00","00"];

    var on = false;
    var timeOut;
    var element = document.getElementById(elementId);

    

    this.getTimeStr = () => this.time.toString().replace(/,/g, ":");

    this.startCount = function() {
        //console.log(this.seconds);
        if(!on) {
            on = true;
            this.timeCount();
        }
    };

    this.stopCount = function() {
        if(on) {
            clearTimeout(timeOut);
            on = false;
        }
    };

    this.timeCount = function() {
        // tänne tulee elementin sisällön päivitys ja ajan näyttäminen
        this.insertToDoc();

        this.setMilliseconds();
        this.setSeconds();
        this.setMinutes();

        timeOut = setTimeout(this.timeCount(), 10);
    };

    this.insertToDoc = function() {
        if(!element.nodeName === "INPUT") {
            //this.element.innerHTML = this.time.toString.replace(",", ":");
            element.innerHTML = this.getTimeStr();
        }
        else {
            //this.element.value = this.time.toString.replace(",", ":");
            element.value = this.getTimeStr();
        }
    };
 
    this.setMilliseconds = function() {
        this.milliseconds += 1;

        if(this.milliseconds < 10) {
            this.time[2] = "0" + this.milliseconds; // to avoid automatic type conversation
            /*
            var zero = "0";
            this.time[2] = zero.concat(this.milliseconds.toString());
            */
        }
        else {
            this.time[2] = "" + this.milliseconds;
            if(this.milliseconds === 100) {
                this.seconds += 1;
                this.milliseconds = 0;
            }
        }
    };

    this.setSeconds = function() {
        if(this.seconds < 10) {
            //this.time[1] = "0" + this.seconds; // to avoid automatic type conversation
            var zero = "0";
            this.time[1] = zero.concat(this.seconds.toString());
        }
        else {
            this.time[1] = "" + this.seconds;
            if(this.seconds === 60) {
                this.minutes += 1;
            }
        }
    };

    this.setMinutes = function() {
        this.time[0] = this.minutes.toString();
    };

    
}
