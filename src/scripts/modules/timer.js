import ui from './ui';

const timer = {

  remainingBreakLen: 3300,
  lastBreakLen: null, 
  startStamp: null,
  active: false,

  start: function() {
    if(!timer.active) {
      timer.startStamp = Date.now();
      timer.active = true;
      ui.clearOutputDiv();
      ui.displayMessage('The timer is running.');
    }
  },

  stop: function() {
    if(timer.active) {
      // calculate break length in seconds
      const breakSeconds = Math.ceil((Date.now() - timer.startStamp) / 1000);
      // update timer state
      timer.lastBreakLen = breakSeconds;
      timer.active = false;
      // clear message set by start method and display new msg
      ui.clearOutputDiv();
      ui.displayMessage('You\'ve been on break for', breakSeconds);

    }
  },

  updateBreak: function() {
    const secondsLeft =  timer.remainingBreakLen - timer.lastBreakLen;

    ui.updateMainTimer(secondsLeft);
    ui.clearOutputDiv();
  }

}

export default timer;