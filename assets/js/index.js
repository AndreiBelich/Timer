"use strict";

const timeValue = document.querySelector(".timer-data");
const buttonsWrapper = document.querySelector(".buttons-wrapper");
const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
let currentMS = 0;
let timerID = null;

startButton.addEventListener("click", ({target}) => {
  if(target.textContent.toLowerCase() === "start"){
    target.textContent = "stop";
    buttonsWrapper.classList.add("run-state");
    pauseButton.classList.remove("hidden");
    tick(currentMS);
  }else if(target.textContent.toLowerCase() === "stop"){
    target.textContent = "start";
    buttonsWrapper.classList.remove("run-state");
    pauseButton.classList.add("hidden");
    clearTimer();
    if(pauseButton.textContent.toLocaleLowerCase() === "pause"){
      console.log("button = pause");
      clearInterval(timerID);
    }
  }
});

pauseButton.addEventListener("click", ({target}) => {
  if(target.textContent.toLowerCase() === "pause"){
    target.textContent = "resume";
    console.log("Remove timer id: ", timerID);
    clearInterval(timerID);
  }else if(target.textContent.toLowerCase() === "resume"){
    target.textContent = "pause";
    tick(currentMS);
  }
});

function tick(safeMS = 0){
  const startDate = new Date().getTime();
  timerID = setInterval(() => {
    const currentDate = new Date().getTime();
    currentMS = currentDate - startDate + safeMS;
    setTime(currentMS);
  }, 1);
  console.log("Set timer id: ", timerID);
}

function setTime(milliseconds){
  const MILLISECONDS_PER_SECOND = 1000;
  const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * 60;
  const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
  const SECONDS_PER_MINUTE = 60;
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;

  const mlseconds = getCorrectNumber(milliseconds % MILLISECONDS_PER_SECOND);
  const seconds = getCorrectNumber(Math.floor(milliseconds / MILLISECONDS_PER_SECOND) % SECONDS_PER_MINUTE);
  const minutes = getCorrectNumber(Math.floor(milliseconds / MILLISECONDS_PER_MINUTE) % MINUTES_PER_HOUR);
  const hours = getCorrectNumber(Math.floor(milliseconds / MILLISECONDS_PER_HOUR) % HOURS_PER_DAY);
  const time = `${hours}:${minutes}:${seconds}:${mlseconds}`;
  timeValue.textContent = time;
}

const getCorrectNumber = (number) => number < 10 ? "0" + number : number;

function clearTimer(){
  currentMS = 0;
  setTime(0);
}
