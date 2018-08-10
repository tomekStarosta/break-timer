// import stylesheet
import '../styles/index.scss';

// import ui obj
import ui from './modules/ui';
// import controller obj
import ctrl from './modules/controller';

document.addEventListener('DOMContentLoaded', ctrl.initApp);
document.getElementById('js--start-btn').addEventListener('click', ctrl.startTimer);
document.getElementById('js--stop-btn').addEventListener('click', ctrl.stopTimer);
document.getElementById('js--reset-btn').addEventListener('click', ui.openModal);