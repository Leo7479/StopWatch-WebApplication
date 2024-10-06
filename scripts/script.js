const hourHand = document.getElementById("hourTime");
const minuteHand = document.getElementById("minuteTime");
const secondHand = document.getElementById("secondTime");
const milliHand = document.getElementById("milliTime");
const startBtn = document.getElementById("startClock");
const stopBtn = document.getElementById("stopClock");
const resetBtn = document.getElementById("resetClock");
const lapBtn = document.getElementById("lapClock");
const lap1 = document.getElementById("lap01");
const lap2 = document.getElementById("lap02");
const lap3 = document.getElementById("lap03");
const lap4 = document.getElementById("lap04");
const lap5 = document.getElementById("lap05");
const overlay = document.getElementsByClassName("overlay")[0];

const lapArray=[lap1,lap2,lap3,lap4,lap5];

let startTime = 0;
let timeElapsed = 0;
let started = false;
let timerId = 0;

let hours = 0;
let minutes = 0;
let seconds = 0;
let milli = 0;
let lapTime = 0;
let lapCounter = 0;

stopBtn.disabled = true;
lapBtn.disabled = true;

function startClock(){
    if(!started){
        started = true;
        startTime = Date.now() - timeElapsed;
        startBtn.disabled = true;
        lapBtn.disabled = false;
        stopBtn.disabled = false;
        timerId = setInterval(updateClock, 10);
    }
}   
function stopClock(){
    if(started){
        started = false;
        timeElapsed = Date.now() - startTime;
        stopBtn.disabled = true;
        startBtn.disabled = false;
        clearInterval(timerId);
    }
}
function updateClockHand(){
    overlay.style.transform = "rotate("+ (-90 + (seconds * 6)) +"deg)";
}
function resetClock(){
    startTime = 0;
    timeElapsed = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
    started = false;
    lapBtn.disabled = true;
    stopBtn.disabled = true;
    startBtn.disabled = false;
    clearInterval(timerId);
    hourHand.textContent = "00";
    minuteHand.textContent = "00";
    secondHand.textContent = "00";
    milliHand.textContent = "00";
    let i=0;
    for(i=0;i<5;i++){
        lapArray[i].textContent = "";
    }
    lapCounter = 0;
    updateClockHand();
}
function updateClock(){
    timeElapsed = Date.now() - startTime;
    hours = Math.floor(timeElapsed / 1000 / 60 / 60).toString();
    minutes = Math.floor(timeElapsed / 1000 / 60 % 60).toString();
    seconds = Math.floor(timeElapsed / 1000 % 60).toString();
    milli = Math.floor(timeElapsed / 10 % 100).toString();
    if(hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(milli < 10){
        milli = "0" + milli;
    }
    hourHand.textContent = hours;
    minuteHand.textContent = minutes;
    secondHand.textContent = seconds;
    milliHand.textContent = milli;
    updateClockHand();
}
function shiftLap(){
    let i=0;
    for(i=1;i<5;i++)
        lapArray[i-1].textContent = lapArray[i].textContent;
}
function lap(){
    lapTime = timeElapsed;
    hours = Math.floor(timeElapsed / 1000 / 60 / 60).toString();
    minutes = Math.floor(timeElapsed / 1000 / 60 % 60).toString();
    seconds = Math.floor(timeElapsed / 1000 % 60).toString();
    milli = Math.floor(timeElapsed / 10 % 100).toString();
    if(hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        minutes = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    if(milli < 10){
        milli = "0" + milli;
    }
    let str = hours + ":" + minutes + ":" + seconds + ":" + milli;
    if(lapCounter == 5){
        shiftLap();
        lapArray[lapCounter-1].textContent = str;
    }
    else{
        lapCounter+=1;
        lapArray[lapCounter-1].textContent = str;
    }
}

startBtn.addEventListener('click',startClock);
stopBtn.addEventListener('click',stopClock);
resetBtn.addEventListener('click',resetClock);
lapBtn.addEventListener('click',lap);