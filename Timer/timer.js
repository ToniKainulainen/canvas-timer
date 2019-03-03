window.onload = function() {
    //canvas variables
    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        wCanvas = canvas.width,
        hCanvas = canvas.height,
        txt = "00:00.00",
        txtSize = "30px",
        font = "Georgia",
        xTxt = wCanvas /2,
        yTxt = hCanvas /2,
    // interval variables
        count = 0,
        interval = 10,
    // time variables
        mil = 0,
        sec = 0,
        min = 0,
        milTxt = "",
        secTxt = "",
        minTxt = "";

    initializeComponents();
    ctx.textAlign = "center";
    ctx.fillText(txt, xTxt, yTxt);

    function initializeComponents() {
        var //startBtn = document.getElementById("start_btn"), //no
            //stopBtn = document.getElementById("stop_btn"), //no
            startBtn = new Button(document.getElementById("start_btn"), startTimer),
            stopBtn = new Button(document.getElementById("stop_btn"), stopTimer),
            running = false,
            pressedStart = false;
        
        var runningFunc; // a variable to store the return value of setInterval()

        //startBtn.addEventListener("click", startTimer); //no
        //stopBtn.addEventListener("click", stopTimer); //no

        ctx.font = txtSize + " " + font;

        console.log("components initiliazed");

        function startTimer() {
            // two ifs to get the color of the timer buttons correct
            if(!running && pressedStart) {
                //stopBtn.style.backgroundColor = "red"; //no
                stopBtn.changeColor("red");
                //stopBtn.innerHTML = "Stop"; //no
                stopBtn.setInnerHTML("Stop");
                document.getElementById("wow").innerHTML = "Wow";
                setRunningFunc();
                console.log("Timer resumed.");
                //startBtn.style.backgroundColor = "gray"; //no
                startBtn.changeColor("gray");
                running = true;
            }
            else if(!running) {
                setRunningFunc();
                document.getElementById("wow").innerHTML = "Wow";
                console.log("Timer started.");
                //startBtn.style.backgroundColor = "gray"; //no
                startBtn.changeColor("gray");
                running = true;
                pressedStart = true;
            }
        }

        function stopTimer() {
            // pauses the timer
            if(running) {
                window.clearInterval(runningFunc);
                console.log("Timer stopped.");

                //stopBtn.style.backgroundColor = "goldenRod"; //no
                stopBtn.changeColor("goldenRod");
                //stopBtn.innerHTML = "Clear"; //no
                stopBtn.setInnerHTML("Clear");
                //startBtn.style.backgroundColor = "mediumBlue"; //no
                startBtn.changeColor("mediumBlue"); //no
                //startBtn.innerHTML = "Resume"; //no
                startBtn.setInnerHTML("Resume");
                running = false;
            }
            // clears the timer
            else {
                // sets timer text to 0
                txt = "00:00.00";
                clearCanvas();
                ctx.fillText(txt, xTxt, yTxt);
                document.getElementById("wow").innerHTML = "";

                zeroTimeVars();

                // sets timer buttons to start positions
                //startBtn.style.backgroundColor = "green"; //no
                startBtn.changeColor("green");
                //startBtn.innerHTML = "Start"; //no
                startBtn.setInnerHTML("Start");
                //stopBtn.style.backgroundColor = "red"; //no
                stopBtn.changeColor("red");
                //stopBtn.innerHTML = "Stop"; //no
                stopBtn.setInnerHTML("Stop");

                console.log("Timer cleared.");
                pressedStart = false;
            }
        }

        function setRunningFunc() {
            runningFunc = setInterval(updateTimer, interval);
        }

        /*
        function changeBtnColor(btnName, color) {
            let startCom = "start";
            let stopCom = "stop";
            
            if(startCom.localeCompare(btnName.toLowerCase()) === 0) {
                startBtn.style.backgroundColor = color;
            }
            else if(stopCom.localeCompare(btnName.toLowerCase()) === 0) {
                stopBtn.style.backgroundColor = color;
                stopBtn.style.getPropertyValue("backgroundColor")
            }
        }
        */

        // an object
        /*
        function Button(btnElement, action) {
            this.btn = btnElement;
            this.btn.addEventListener("click", action);
            this.setInnerHTML = function (text) {
                this.btn.innerHTML = text;
            }
            this.changeColor = function (color) {
                this.btn.style.backgroundColor = color;
            }
        }
        */
        /* // ES2015 class
        class Button {
            constructor(btnElement) {
                this.btn = btnElement;
                this.changeColor = function (color) {
                    this.btn.style.backgroundColor = color;
                };
            }
        }
        */
    }
    
    function updateTimer() {
        clearCanvas();
        ctx.fillText(txt, xTxt, yTxt);
        count++;
        trackTime();
        setTxt();

        function trackTime() {
            if(count === 1) {
                mil++;
                count = 0;    
            }
            if(mil === 100) {
                sec++;
                mil = 0;
            }
            if(sec === 60) {
                min++;
                sec = 0;
            }
        }

        function setTxt() {
            if(mil < 10) {
                milTxt = "0" + mil.toString();
            }
            else {
                milTxt = mil.toString();
            }

            if(sec < 10) {
                secTxt = "0" + sec.toString();
            }
            else {
                secTxt = sec.toString();
            }

            if(min < 10) {
                minTxt = "0" + min.toString();
            }
            else {
                minTxt = min.toString();
            }

            txt = "";
            txt = txt.concat(minTxt, ":", secTxt, ".", milTxt);
        }
    }

    function zeroTimeVars() {
        mil = 0;
        sec = 0;
        min = 0;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function Button(btnElement, action) {
        this.btn = btnElement;
        this.btn.addEventListener("click", action);
        this.setInnerHTML = function (text) {
            this.btn.innerHTML = text;
        }
        this.changeColor = function (color) {
            this.btn.style.backgroundColor = color;
        }
    }
};