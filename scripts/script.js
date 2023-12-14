// Get all elements with the class 'textBox'
const textBoxes = document.querySelectorAll('.textBox');

//Variables to effect textBox as user scrolls to it
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

//Highlight the textBox at intersection
textBoxes.forEach(textBox => {
  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        textBox.classList.add('show');
      } else {
        textBox.classList.remove('show');
      }
    });
  }, options);

  observer.observe(textBox);
});
