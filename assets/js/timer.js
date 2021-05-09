"use strict";

class Timer{

  static MILLISECONDS_PER_SECOND = 1000;
  static MILLISECONDS_PER_MINUTE = Timer.MILLISECONDS_PER_SECOND * 60;
  static MILLISECONDS_PER_HOUR = Timer.MILLISECONDS_PER_MINUTE * 60;
  static SECONDS_PER_MINUTE = 60;
  static MINUTES_PER_HOUR = 60;
  static HOURS_PER_DAY = 24;

  constructor(view){
    this._currentMilliseconds = 0;
    this._timerID = null;
    this._view = view;
  }

  _showTime(){
    this._view.textContent = this.getTime();
  }

  _clearTimerId(){
    if(this._timerID){
      clearInterval(this._timerID);
    }
    this._timerID = null;
  }

  _getCorrectValue(value){
    return value < 10 ? `0${value}` : value;
  }

  _getCorrectMilliseconds(value){
    if(value < 10){
      return `00${value}`;
    }
    if(value > 9 && value < 100){
      return `0${value}`;
    }
    return value;
  }

  start(savedTime = 0){
    const startDate = new Date().getTime();
    this._timerID = setInterval(() => {
      const currentDate = new Date().getTime();
      this._currentMilliseconds = currentDate - startDate + savedTime;
      this._showTime();
    },1);
  }

  stop(){
    this._clearTimerId();
  }

  restart(){
    this.start(this._currentMilliseconds);
  }

  reset(){
    this._currentMilliseconds = 0;
    this._clearTimerId();
    this._showTime();
  }

  getTime(){
    const milliseconds = this._getCorrectMilliseconds(this._currentMilliseconds % Timer.MILLISECONDS_PER_SECOND);
    const seconds = this._getCorrectValue(Math.floor(this._currentMilliseconds / Timer.MILLISECONDS_PER_SECOND) % Timer.SECONDS_PER_MINUTE);
    const minutes = this._getCorrectValue(Math.floor(this._currentMilliseconds / Timer.MILLISECONDS_PER_MINUTE) % Timer.MINUTES_PER_HOUR);
    const hours = this._getCorrectValue(Math.floor(this._currentMilliseconds / Timer.MILLISECONDS_PER_HOUR) % Timer.HOURS_PER_DAY);
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }
}