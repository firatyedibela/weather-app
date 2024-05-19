import weatherAPI from './api.js';
import dayJPG from './assets/images/day2.jpg';
import nightJPG from './assets/images/night.jpg';
import { format, formatISO9075 } from 'date-fns';
import utils from './utils.js';

const domUI = (function () {
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
    renderBackgroundImage(data);
    setFontColor(data);
    renderMainWeather(data);
    renderDetailedWeather(data);
    renderDailyForecast(data);
  }

  function setFontColor(data) {
    const day = data.current.is_day;
    const detailedInfoContainer = document.querySelector(
      '#detailed-info-container'
    );
    if (day) {
      detailedInfoContainer.className = 'day';
    } else {
      detailedInfoContainer.className = 'night';
    }
  }

  function renderBackgroundImage(data) {
    if (data.current.is_day) {
      document.body.style.backgroundImage = `url(${dayJPG})`;
    } else {
      document.body.style.backgroundImage = `url(${nightJPG})`;
    }
  }

  function renderMainWeather(data) {
    const location = data.location.name;
    const localTime = data.location.localtime;
    const condition = data.current.condition.text;
    const degree = parseInt(data.current.temp_c);

    const date = format(new Date(localTime), 'PPPP');
    const time = format(new Date(localTime), 'p');

    document.querySelector('.main-info-location').textContent = location;
    document.querySelector('.date').textContent = date;
    document.querySelector('.time').textContent = time.toLocaleLowerCase();
    document.querySelector('.temperature').innerHTML = `${degree} &degC`;
    document.querySelector('.condition-icon').src = data.current.condition.icon;
  }

  function renderDetailedWeather(data) {
    const lastUpdated = data.current.last_updated;
    const feelsLike = data.current.feelslike_c;
    const humidity = data.current.humidity;
    const windSpeed = data.current.wind_kph;
    const rainChance = data.forecast.forecastday[0].day.daily_chance_of_rain;

    const lastUpdatedDOM = document.querySelector('.data.last-updated');
    const feelsLikeDODM = document.querySelector('.data.feels-like');
    const humidityDOM = document.querySelector('.data.humidity');
    const windSpeedDOM = document.querySelector('.data.wind-speed');
    const rainChanceDOM = document.querySelector('.data.rain-chance');

    lastUpdatedDOM.textContent = lastUpdated;
    feelsLikeDODM.innerHTML = `${feelsLike} &degC`;
    humidityDOM.textContent = `${humidity}%`;
    windSpeedDOM.textContent = `${windSpeed} km/h`;
    rainChanceDOM.textContent = `${rainChance}%`;
  }

  function renderDailyForecast(data) {
    // 1- Get data
    // 2- Create html for each day
    // 3- Append that html to the forecast section
    const sevenDays = data.forecast.forecastday;
    const cont = document.querySelector('.forecast-days');
    cont.innerHTML = '';
    sevenDays.forEach((day, idx) => {
      const dayOfWeek = format(day.date, 'EEEE');
      const max = day.day.maxtemp_c;
      const min = day.day.mintemp_c;

      const HTML = `
        <div class="day${idx} days">
          <div class="day">${dayOfWeek}</div>
          <div class="max">${parseInt(max)} &degC</div>
          <div class="min">${parseInt(min)} &degC</div>
          <div class="condition-logo">
            <img src="${day.day.condition.icon}" alt="">
          </div>
        </div>
      `;
      cont.innerHTML += HTML;
    });
  }

  function renderErrorMessage(msg) {
    // If an error was rendered before, remove it first
    removeErrorMessage();
    const error = document.createElement('div');
    error.className = 'location-error';
    error.textContent = msg;
    document.querySelector('#form-container').appendChild(error);
  }

  function removeErrorMessage() {
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
