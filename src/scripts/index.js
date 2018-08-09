// import stylesheet
import '../styles/index.scss';

// import timer object
import timer from './modules/timer';
// import ui object
import ui from './modules/ui';

document.getElementById('js--start-btn').addEventListener('click', timer.start);
document.getElementById('js--stop-btn').addEventListener('click', timer.stop);
document.getElementById('js--reset-btn').addEventListener('click', ui.openResetModal);