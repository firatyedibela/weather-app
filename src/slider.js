const slider = (function () {
  let slides;
  let slideIndex = 0;
  let listenersAdded = false;

  function addListeners() {
    if (listenersAdded) return;

    const buttons = document.querySelectorAll('.slider-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const offset = btn.classList.contains('prev') ? -1 : 1;
        slideIndex = slideIndex + offset;

        // Implement loop logic
        if (slideIndex < 0) slideIndex = slides.length - 1;
        if (slideIndex >= slides.length) slideIndex = 0;
        showSlide();
      });
    });

    listenersAdded = true;
  }

  function showSlide() {
    // 1- Make all slide elements 'inactive'
    // 2- Find the element corresponding to the slideIndex
    // 3- Make that element active
    slides.forEach((slide, idx) => {
      slide.classList.remove('active');
      if (idx === slideIndex) {
        slide.classList.add('active');
      }
    });
  }

  function init() {
    slides = document.querySelectorAll('.slide');
    addListeners();
    showSlide();
  }

  return {
    init,
  };
})();

export default slider;
