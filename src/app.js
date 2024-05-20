import './styles/main.css';
import './styles/current.css';
import './styles/forecast.css';
import domUI from './dom.js';
import weatherAPI from './api.js';

async function init() {
  domUI.init();
  let data;
  try {
    data = await weatherAPI.get('los angeles');
  } catch (err) {
    console.log('An error occured: ', err);
  }
  domUI.renderContents(data);
}

init();
