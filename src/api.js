import { errorHandler } from './error.js';

const weatherAPI = (function () {
  const URLForecast =
    'https://api.weatherapi.com/v1/forecast.json?key=dd52c3dfc99546429a7162039242804&days=7&q=';

  async function get(location) {
    try {
      const response = await fetch(URLForecast + location, { mode: 'cors' });
      const data = await response.json();
      if (data.error) {
        errorHandler.handleError(data.error.code);
        throw new Error(data.error.message);
      } else {
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  function init() {
    get('ankara');
  }

  return {
    get,
    init,
  };
})();

export default weatherAPI;
