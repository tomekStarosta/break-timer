import storage from './storage';
import ui from './ui';

const ctrl = {

  remainingBreak: null,
  lastBreakLength: null, 
  startStamp: null,
  timerActive: false,
  
  


  initApp: function() {
    // get local storage data for remaining break time and shift length
    const LS_Data = storage.loadData();
    // update remaining break time from local storage
    ctrl.remainingBreak = LS_Data.remainingBreak; 
    // instantiate modal and slider
    ui.initModal();
    ui.initRangeslider(LS_Data.shiftLength);
    // update ui based on remaining break
    ui.updateHeading(ctrl.remainingBreak);
    ui.updateMainTimer(ctrl.remainingBreak);

  },

  startTimer: function() {
    if(!ctrl.timerActive) {
      ctrl.breakStartStamp = Date.now();
      ctrl.timerActive = true;
      ui.clearOutputDiv();
      ui.displayMessage('The timer is running...');
    }
  },

  stopTimer: function() {
    if(ctrl.timerActive) {
      // calculate break length in seconds
      const breakSeconds = Math.ceil((Date.now() - ctrl.breakStartStamp) / 1000);
      // update timer state
      ctrl.lastBreakLength = breakSeconds;
      ctrl.timerActive = false;
      // clear message set by start method and display new msg
      ui.clearOutputDiv();
      ui.displayMessage('You\'ve been on break for', breakSeconds);
    }
  },

  updateBreak: function() {
    ctrl.remainingBreak -= ctrl.lastBreakLength;

    ui.updateHeading(ctrl.remainingBreak);
    ui.updateMainTimer(ctrl.remainingBreak);
    ui.clearOutputDiv();

    storage.updateRemainingBreak(ctrl.remainingBreak); 
  },

  resetTimer: function(hrs) {
    storage.setShiftLength(hrs);
    ctrl.initApp();
  }

}

export default ctrl;