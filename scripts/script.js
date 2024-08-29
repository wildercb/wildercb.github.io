// script.js

document.addEventListener('DOMContentLoaded', function() {


    // Typing text effect
    const typingText = document.getElementById('typingText');
    if (typingText) {
        const phrases = [
            "Machine learning researcher.",
            "Software builder.",
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        function typePhrase() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isPaused) {
                setTimeout(typePhrase, 1500);
                isPaused = false;
                return;
            }

            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            typingText.style.borderRight = '2px solid var(--primary-color)';

            let typingSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                isPaused = true;
                isDeleting = true;
                return setTimeout(typePhrase, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }

            setTimeout(typePhrase, typingSpeed);
        }

        typePhrase();
    }

    // Parallax effect for the home section
    const homeSection = document.querySelector('#home');
    if (homeSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            homeSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });

    // Form submission handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // Glitch effect on hover for headings
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach(heading => {
        heading.addEventListener('mouseover', () => {
            heading.style.animation = 'glitch 0.3s infinite';
        });
        heading.addEventListener('mouseout', () => {
            heading.style.animation = 'none';
        });
    });

    // Create particles
    createParticles();

    // Tech icon tooltips
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.getAttribute('title');
            document.body.appendChild(tooltip);

            const iconRect = e.target.getBoundingClientRect();
            tooltip.style.top = `${iconRect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${iconRect.left + iconRect.width / 2 - tooltip.offsetWidth / 2}px`;
        });

        icon.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator && homeSection) {
        function checkScroll() {
            const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
            if (window.pageYOffset > homeSectionBottom - window.innerHeight) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
                window.removeEventListener('scroll', checkScroll);
            }
        }

        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }
});

// Parallax effect for projects
window.addEventListener('scroll', () => {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const speed = 5;
        const yPos = -(window.pageYOffset / speed);
        project.style.backgroundPosition = `center ${yPos}px`;
    });
});

function createParticles() {
    const particlesContainer = document.querySelector('.cyber-particles');
    if (particlesContainer) {
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            const duration = Math.random() * 20 + 10;
            particle.style.animationDuration = `${duration}s`;

            particlesContainer.appendChild(particle);
        }
    }
}

