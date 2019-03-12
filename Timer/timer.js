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
        var startBtn = new Button(document.getElementById("start_btn"), startTimer),
            stopBtn = new Button(document.getElementById("stop_btn"), stopTimer),
            running = false,
            pressedStart = false,
            runningFunc = null; // a variable to store the return value of setInterval()

        ctx.font = txtSize + " " + font;

        console.log("components initiliazed");

        function startTimer() {
            // two ifs to get the color of the timer buttons correct
            if(!running && pressedStart) {
                stopBtn.changeColor("red", "Stop");
                document.getElementById("wow").innerHTML = "Wow";
                runningFunc = setInterval(updateTimer, interval);
                console.log("Timer resumed.");
                startBtn.changeColor("gray");
                running = true;
            }
            /* // Kokeilu ilman pressedStart  muuttujaa ja yritys helpottaa koodin luettavuutta.
            if(running) {
                stopBtn.changeColor("red", "Stop");
                document.getElementById("wow").innerHTML = "Wow";
                runningFunc = setInterval(updateTimer, interval);
                console.log("Timer resumed.");
                startBtn.changeColor("gray");
                //running = false;
            }
            */
            // järjestys, jossa kello ei pysähdy
            /*  Timer started
                Timer resumed
                Timer stopped
                Timer cleared
            */
            else if(!running) {
                runningFunc = setInterval(updateTimer, interval);
                document.getElementById("wow").innerHTML = "Wow";
                console.log("Timer started.");
                startBtn.changeColor("gray");
                running = true;
                pressedStart = true;
            }

        } // end of startTimer()

        function stopTimer() {

            // pauses the timer
            if(running) {
                window.clearInterval(runningFunc);
                console.log("Timer stopped.");

                stopBtn.changeColor("goldenRod", "Clear");
                startBtn.changeColor("mediumBlue", "Resume");
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
                startBtn.changeColor("green", "Start");
                stopBtn.changeColor("red", "Stop");

                console.log("Timer cleared.");
                pressedStart = false;
            }

        } // end of stopTimer()   

    } // end of initializeComponents()
    
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

        }// setTxt()

    }// updateTimer()

    function zeroTimeVars() {
        mil = 0;
        sec = 0;
        min = 0;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // tradional object
    function Button(btnElement, action) {
        this.btn = btnElement;
        this.btn.addEventListener("click", action);

        this.setInnerHTML = function (btnText) {
            this.btn.innerHTML = btnText;
        }
        
        this.changeColor = function (color, btnTxt = null) {
            if(btnTxt != null) {
                this.btn.style.backgroundColor = color;
                this.setInnerHTML(btnTxt);
            }
            else {
                this.btn.style.backgroundColor = color;
            }
        }

    }// end of Button class

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
};