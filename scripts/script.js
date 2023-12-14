// Get all elements with the class 'textBox'
const textBoxes = document.querySelectorAll('.textBox');

// Define the options for the Intersection Observer
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

// Create a new Intersection Observer for each textBox element
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
