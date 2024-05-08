import weatherAPI from './api.js';

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
      if (data.error) {
        handleError(data.error.code);
      } // If success
      else {
        // Remove error msg if there is any
        const errorMsg = document.querySelector('.location-error');
        if (errorMsg) {
          errorMsg.remove();
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleError(code) {
    switch (code) {
      case 1003:
        renderErrorMessage('Please enter a location name.');
        break;
      case 1006:
        renderErrorMessage('Location not found.');
        break;
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
    init,
  };
})();

export default domUI;
