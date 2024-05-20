const utils = (function () {
  function capitalizeEachWord(phrase) {
    const words = phrase.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = capitalize(words[i]);
    }
    return words.join(' ');
  }

  function divideArray(arr, chunkSize) {
    let result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return {
    capitalizeEachWord,
    divideArray,
  };
})();

export default utils;
