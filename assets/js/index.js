"use strict";

const timeView = document.querySelector(".timer-data");
const buttonsWrapper = document.querySelector(".buttons-wrapper");
const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const timer = new Timer(timeView);

startButton.addEventListener("click", ({target}) => {
  switch(target.textContent.toLowerCase()){
    case "start":
      target.textContent = "stop";
      buttonsWrapper.classList.add("run-state");
      pauseButton.classList.remove("hidden");
      timer.start();
      break;
    case "stop":
      target.textContent = "start";
      buttonsWrapper.classList.remove("run-state");
      pauseButton.classList.add("hidden");
      timer.reset();
      pauseButton.textContent = "pause";
      break;
  }
});

pauseButton.addEventListener("click", ({target}) => {
  switch(target.textContent.toLowerCase()){
    case "pause":
      target.textContent = "resume";
      timer.stop();
      break;
    case "resume":
      target.textContent = "pause";
      timer.restart();
      break;
  }
});
