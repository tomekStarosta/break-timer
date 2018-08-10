const storage = {

  loadData: function() {
    let shiftLength;
    let remainingBreak;

    if(localStorage.getItem('shiftLength') === null) {
      shiftLength = 8;

      localStorage.setItem('shiftLength', shiftLength);
    } else {
      shiftLength = localStorage.getItem('shiftLength');
    }

    if(localStorage.getItem('remainingBreak') === null) {
      remainingBreak = ((shiftLength - 4) * 5 + 35) * 60;

      localStorage.setItem('remainingBreak', remainingBreak);
    } else {
      remainingBreak = localStorage.getItem('remainingBreak');
    }

    return {
      remainingBreak,
      shiftLength
    };
  },

  updateRemainingBreak: function(seconds) {
    localStorage.setItem('remainingBreak', seconds);
  }

}

export default storage;