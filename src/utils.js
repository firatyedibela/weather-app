const utils = (function () {
  function capitalizeEachWord(phrase) {
    const words = phrase.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = capitalize(words[i]);
    }
    return words.join(' ');
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return {
    capitalizeEachWord,
  };
})();

export default utils;
