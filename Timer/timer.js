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
        var startBtn = document.getElementById("start_btn"),
            stopBtn = document.getElementById("stop_btn"),
            running = false,
            pressedStart = false;
        
        var runningFunc; // a variable to store the return value of setInterval()

        startBtn.addEventListener("click", startTimer);
        stopBtn.addEventListener("click", stopTimer);

        ctx.font = txtSize + " " + font;

        console.log("components initiliazed");

        function startTimer() {
            // two ifs to get the color of the timer buttons correct
            if(!running && pressedStart) {
                stopBtn.style.backgroundColor = "red";
                stopBtn.innerHTML = "Stop";
                document.getElementById("wow").innerHTML = "Wow";
                setRunningFunc();
                console.log("Timer resumed.");
                startBtn.style.backgroundColor = "gray";
                running = true;
            }
            else if(!running) {
                setRunningFunc();
                document.getElementById("wow").innerHTML = "Wow";
                console.log("Timer started.");
                startBtn.style.backgroundColor = "gray";
                running = true;
                pressedStart = true;
            }
        }

        function stopTimer() {
            // pauses the timer
            if(running) {
                window.clearInterval(runningFunc);
                console.log("Timer stopped.");

                stopBtn.style.backgroundColor = "goldenRod";
                stopBtn.innerHTML = "Clear";
                startBtn.style.backgroundColor = "mediumBlue";
                startBtn.innerHTML = "Resume";
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
                startBtn.style.backgroundColor = "green";
                startBtn.innerHTML = "Start";
                stopBtn.style.backgroundColor = "red";
                stopBtn.innerHTML = "Stop";

                console.log("Timer cleared.");
                pressedStart = false;
            }
        }

        function setRunningFunc() {
            runningFunc = setInterval(updateTimer, interval);
        }
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

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function zeroTimeVars() {
        mil = 0;
        sec = 0;
        min = 0;
    }
};