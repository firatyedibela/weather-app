import './styles/main.css';
import './styles/current.css';
import './styles/forecast.css';
import domUI from './dom.js';
import weatherAPI from './api.js';

async function init() {
  domUI.init();
  const data = await weatherAPI.get('los angeles');
  domUI.renderContents(data);
}

init();
