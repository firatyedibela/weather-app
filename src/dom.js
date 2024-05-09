import weatherAPI from './api.js';
import dayJPG from './assets/images/day2.jpg';
import nightJPG from './assets/images/night.jpg';
import { format, formatISO9075 } from 'date-fns';

const domUI = (function () {
  // Dynamically import icons
  const dayIconsContext = require.context(
    './assets/images/day',
    false,
    /\.png$/
  );

  const nightIconsContext = require.context(
    './assets/images/night',
    false,
    /\.png$/
  );

  function addListeners() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Get location
    const input = document.querySelector('#location');
    const location = input.value;

    // Get data
    try {
      const data = await weatherAPI.get(location);
      if (data) {
        input.value = '';
        removeErrorMessage();
        renderContents(data);
      }
    } catch (err) {
      console.log('An error occured: ', err);
    }
  }

  function renderContents(data) {
    console.log(
      'IM RENDERING CONTENTS, YOU WILL SEE A LOT OF WeATHER INFO ',
      data
    );
    renderBackgroundImage(data);
    renderPrimaryContent(data);
    // renderSecondaryContent();
    // renderForecast()
  }

  function renderBackgroundImage(data) {
    const day = data.current.is_day;
    if (day) {
      document.body.style.backgroundImage = `url(${dayJPG})`;
    } else {
      document.body.style.backgroundImage = `url(${nightJPG})`;
    }
  }

  function renderPrimaryContent(data) {
    console.log("HEY I GET PRIMARY CONTENT AND I'M RENDERING IT", data);
  }

  function renderErrorMessage(msg) {
    removeErrorMessage();
    const error = document.createElement('div');
    error.className = 'location-error';
    error.textContent = msg;
    document.querySelector('#form-container').appendChild(error);
  }

  function removeErrorMessage() {
    // If an error rendered before, remove it first
    const prevError = document.querySelector('.location-error');
    if (prevError) {
      prevError.remove();
    }
  }

  function init() {
    addListeners();
  }

  return {
    renderContents,
    renderErrorMessage,
    init,
  };
})();

export default domUI;
