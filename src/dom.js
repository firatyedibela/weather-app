import weatherAPI from './api.js';
import { errorHandler } from './error.js';

const domUI = (function () {
  function addListeners() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const input = document.querySelector('#location');
    const location = input.value;

    try {
      const data = await weatherAPI.get(location);
      console.log(data);
    } catch (err) {
      console.log('An error occured: ', err);
    }
  }

  function renderErrorMessage(msg) {
    // If an error rendered before, remove it first
    const prevError = document.querySelector('.location-error');
    if (prevError) {
      prevError.remove();
    }

    const error = document.createElement('div');
    error.className = 'location-error';
    error.textContent = msg;
    document.querySelector('#form-container').appendChild(error);
  }

  function init() {
    addListeners();
  }

  return {
    renderErrorMessage,
    init,
  };
})();

export default domUI;
