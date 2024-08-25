//carousel for project pictures
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.project-image-container');
    
    carousels.forEach(carousel => {
        const imageCarousel = carousel.querySelector('.project-image-carousel');
        const images = imageCarousel.querySelectorAll('.project-image');
        const prevButton = carousel.querySelector('.prev');
        const nextButton = carousel.querySelector('.next');
        let currentIndex = 0;

        function showImage(index) {
            imageCarousel.style.transform = `translateX(-${index * 100}%)`;
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    });
});