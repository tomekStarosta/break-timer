import ctrl from './controller';
import tingle from 'tingle.js';
import rangeslider from 'rangeslider-pure';

const ui = {

  outputDiv: document.querySelector('.output'),
  mainTimer: document.getElementById('main-timer'),
  mainHeading: document.getElementById('main-heading'),
  inputSlider: null,
  rangeHours: null,

  modalInstance: null,
  modalOptions: {
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close"
  },

  initModal: function() {
    ui.modalInstance = new tingle.modal(ui.modalOptions);

    ui.modalInstance.setContent(`
      <h1 class="heading heading--small heading--mt-none">Reset Your Timer</h1>
      <p>How long is your shift today?</p>
      <input
      <input
        class="range-slider"
        type="range"
      />
      <div class="range-hours heading"></div>
    `);

    ui.inputSlider = document.querySelector('.range-slider');
    ui.rangeHours = document.querySelector('.range-hours');

    ui.modalInstance.addFooterBtn('Close', 'btn btn--orange', function() {
      
      ui.modalInstance.close();

    });

    ui.modalInstance.addFooterBtn('Reset', 'btn btn--green', function() {

      ui.modalInstance.close();      

      ctrl.resetTimer(ui.inputSlider.value);
    });

    
  },

  initRangeslider: function(shiftLen) {

    rangeslider.create(ui.inputSlider, {
      polyfill: true,
      min: 4,          
      max: 12,          
      step: 1,        
      value: shiftLen,       
      borderRadius: 10,

      onSlide: function (value) {
          document.querySelector('.range-hours').textContent = `${value}h`;
      }
    });

    ui.rangeHours.textContent = `${shiftLen}h`;
  },

  openModal: function() {
    ui.modalInstance.open();
  },

  updateHeading: function(seconds) {
    if(seconds >= 0) {
      if(ui.mainHeading.classList.contains('heading--red')) {
        ui.mainHeading.classList.remove('heading--red');
      }
      
      ui.mainHeading.textContent = 'Break Timer';
    } else {
      ui.mainHeading.textContent = 'Overbreak';
      ui.mainHeading.classList.add('heading--red');
    }
  },

  updateMainTimer: function(seconds) {
    if(seconds < 0) {
      seconds = - seconds;
    }

    let secondsDisplay = (seconds % 60).toString();

    if (secondsDisplay.length === 1) {
      secondsDisplay = '0' + secondsDisplay;
    }

    ui.mainTimer.textContent = `${ Math.floor(seconds / 60) }:${ secondsDisplay }`
  },

  displayMessage: function(msg, breakSeconds) {
    if(!breakSeconds) {
      const pTag = document.createElement('p');
      pTag.className = 'output__message';
      pTag.textContent = msg;
  
      this.outputDiv.appendChild(pTag);
    } else {
      const pTag = document.createElement('p');
      pTag.className = 'output__message';
      pTag.textContent = msg;

      const breakOutput = document.createElement('h3');
      breakOutput.classList.add('heading', 'heading--small');
      const breakMinutes = Math.floor(breakSeconds / 60);
      let secondsDisplay = (breakSeconds % 60).toString();

      if (secondsDisplay.length === 1) {
        secondsDisplay = '0' + secondsDisplay;
      }

      breakOutput.textContent = `${ breakMinutes }:${ secondsDisplay }`;

      const updateBtn = document.createElement('a');
      updateBtn.classList.add('btn', 'btn--green', 'btn--mr-1');
      updateBtn.textContent = 'Update';

      const discardBtn = document.createElement('a');
      discardBtn.classList.add('btn', 'btn--orange');
      discardBtn.textContent = 'Discard';

      this.outputDiv.appendChild(pTag);
      this.outputDiv.appendChild(breakOutput);
      this.outputDiv.appendChild(updateBtn);
      this.outputDiv.appendChild(discardBtn);

      updateBtn.addEventListener('click', ctrl.updateBreak);
      discardBtn.addEventListener('click', ui.clearOutputDiv);
    }

    
  },

  clearOutputDiv: function() {
    while(ui.outputDiv.firstChild) {
      ui.outputDiv.removeChild(ui.outputDiv.firstChild);
    }
  }

}

export default ui;