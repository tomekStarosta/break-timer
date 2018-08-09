import timer from './timer';

const ui = {

  outputDiv: document.querySelector('.output'),
  mainTimer: document.getElementById('main-timer'),

  updateMainTimer: function(seconds) {
    ui.mainTimer.textContent = `${ Math.floor(seconds / 60) }:${ seconds % 60 }`
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
      breakOutput.textContent = `${ breakMinutes }:${ breakSeconds % 60 }`;

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

      updateBtn.addEventListener('click', timer.updateBreak);
      discardBtn.addEventListener('click', ui.clearOutputDiv);
    }

    
  },

  clearOutputDiv: function() {
    while(ui.outputDiv.firstChild) {
      ui.outputDiv.removeChild(ui.outputDiv.firstChild);
    }
  },

  openResetModal: function() {

  }

}

export default ui;