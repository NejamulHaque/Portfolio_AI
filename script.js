// Loading animation
window.addEventListener('load', function() {
  setTimeout(function() {
      document.getElementById('loader').style.opacity = '0';
      setTimeout(function() {
          document.getElementById('loader').style.display = 'none';
      }, 500);
  }, 1000);
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
  } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
  }
}

// Toggle theme
function toggleTheme() {
  const isDark = html.classList.contains('dark');
  html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
  
  // Add animation class
  themeToggle.classList.add('animate-pulse');
  setTimeout(() => {
      themeToggle.classList.remove('animate-pulse');
  }, 300);
}

// Initialize on load
initTheme();

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
      initTheme();
  }
});

// Add click event
themeToggle.addEventListener('click', toggleTheme);

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
          });
          
          // Close mobile menu if open
          mobileMenu.classList.add('hidden');
      }
  });
});

// Animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
      }
  });
}, {
  threshold: 0.1
});

fadeElements.forEach(element => {
  fadeInObserver.observe(element);
});

// Typing animation
const typingElements = document.querySelectorAll('.typing-text');
typingElements.forEach(el => {
  const words = el.dataset.words ? JSON.parse(el.dataset.words) : [el.textContent];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
      const currentWord = words[wordIndex];
      const currentText = currentWord.substring(0, charIndex);
      el.textContent = currentText;

      if (!isDeleting) {
          charIndex++;
          if (charIndex === currentWord.length + 1) {
              isDeleting = true;
              typingSpeed = 50;
              setTimeout(type, 1500);
              return;
          }
      } else {
          charIndex--;
          if (charIndex === 0) {
              isDeleting = false;
              wordIndex = (wordIndex + 1) % words.length;
              typingSpeed = 100;
          }
      }

      setTimeout(type, typingSpeed);
  }

  setTimeout(type, 500);
});

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('[data-filter]');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter projects
      const filter = button.dataset.filter;
      projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.filter === filter) {
              card.classList.remove('hidden');
          } else {
              card.classList.add('hidden');
          }
      });
  });
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
      backToTopButton.classList.remove('opacity-0', 'invisible');
  } else {
      backToTopButton.classList.remove('visible');
      backToTopButton.classList.add('opacity-0', 'invisible');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
});