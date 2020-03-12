window.onload = function() {
    var startBtn = this.document.getElementById("start-btn");
    var stopBtn = this.document.getElementById("stop-btn");

    var timer = new Timer("timer");

    this.console.log(timer.timeStr());
    
    startBtn.addEventListener("click", timer.startCount);
    stopBtn.addEventListener("click", timer.stopCount);
    
};

function Timer(elementId) {

    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.time = ["0","00","00"];

    var self = this;
    var timeOut;
    var element = document.getElementById(elementId);

    this.timeStr = () => this.time.toString().replace(/,/g, ":");

    this.startCount = function() {
        timeCount();
        console.log("counting");
    };

    this.stopCount = function() {
        clearTimeout(timeOut);
        console.log("counting stopped");
    };

    function timeCount() {
        // tänne tulee elementin sisällön päivitys ja ajan näyttäminen
        insertToDoc();

        setMilliseconds();
        setSeconds();
        setMinutes();

        timeOut = setTimeout(() => {timeCount()}, 10);
    };

    function insertToDoc() {
        if(element.nodeName !== "INPUT") {
            element.innerHTML = self.timeStr();
        }
        else {
            element.value = self.timeStr();
        }
    };
 
    function setMilliseconds() {
        self.milliseconds += 1;

        if(self.milliseconds < 10) {
            // to avoid automatic type conversation
            var zero = "0";
            self.time[2] = zero.concat(self.milliseconds.toString());
        }
        else {
            self.time[2] = "" + self.milliseconds;
            if(self.milliseconds === 100) {
                self.seconds += 1;
                self.milliseconds = 0;
            }
        }
    };

    function setSeconds() {
        if(self.seconds < 10) {
            var zero = "0";
            self.time[1] = zero.concat(self.seconds.toString());
        }
        else {
            self.time[1] = "" + self.seconds;
            if(self.seconds === 60) {
                self.minutes += 1;
            }
        }
    };

    function setMinutes() {
        self.time[0] = self.minutes.toString();
    };
}
