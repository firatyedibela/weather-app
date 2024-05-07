const weatherAPI = (function () {
  const URLForecast =
    'http://api.weatherapi.com/v1/forecast.json?key=dd52c3dfc99546429a7162039242804&days=3&q=';

  async function get(location) {
    try {
      const response = await fetch(URLForecast + location, { mode: 'cors' });
      // Check if the response indicates success
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data);
      return data;
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
