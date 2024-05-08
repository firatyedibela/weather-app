export { errorHandler };
import domUI from './dom.js';

const errorHandler = (function () {
  function handleError(code) {
    switch (code) {
      case 1003:
        domUI.renderErrorMessage('Please enter a location name.');
        break;
      case 1006:
        domUI.renderErrorMessage('Location not found.');
        break;
    }
  }

  return {
    handleError,
  };
})();
