// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Parallax effect for the home section
    const homeSection = document.querySelector('#home');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        homeSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });

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
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        // For this example, we'll just show an alert
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
});
// Typewriter effect for the main title
function typeWriter(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const mainTitle = document.querySelector('#home h1');
//typeWriter(mainTitle, "Wilder Baldwin", 100);

// Parallax effect for projects
window.addEventListener('scroll', () => {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        const speed = 5; // Adjust for more or less movement
        const yPos = -(window.pageYOffset / speed);
        project.style.backgroundPosition = `center ${yPos}px`;
    });
});

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

function createParticles() {
    const particlesContainer = document.querySelector('.cyber-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

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
// Call this function when the page loads

document.addEventListener('DOMContentLoaded', function() {
    const phrases = [
      "Machine learning researcher",
      "Aspiring software building proffesional"
    ];
    const typingText = document.getElementById('typingText');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
  
    function typePhrase() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isPaused) {
        setTimeout(typePhrase, 2000); // Pause for 2 seconds
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
  });
  document.addEventListener('DOMContentLoaded', function() {
    function animateSkills() {
      const skillBars = document.querySelectorAll('.skill-bar');
      
      skillBars.forEach(bar => {
        const skill = bar.getAttribute('data-skill');
        bar.style.setProperty('--skill-percent', skill + '%');
        
        setTimeout(() => {
          bar.style.width = skill + '%';
        }, 300);
      });
    }
  
    // Trigger the animation when the skills section is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkills();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    const skillsSection = document.querySelector('.key-skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }
  });

  