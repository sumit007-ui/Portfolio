
  // Example JavaScript for handling login
  async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
        // Redirect to the index page
        window.location.href = data.redirect_url;
    } else {
        alert(data.message); // Show error message
    }
  }
  
  // Example JavaScript for handling registration
  async function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
        alert(data.message); // Show success message
        // Optionally redirect to login page
        window.location.href = '/login'; // Redirect to login page
    } else {
        alert(data.message); // Show error message
    }
  }  

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Enhanced Navbar functionality
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  let lastScroll = 0;
  
  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
  
    if (currentScroll <= 0) {
      navbar.style.transform = 'translateY(0)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      return;
    }
  
    if (currentScroll > lastScroll && currentScroll > 80) {
      // Scrolling down
      navbar.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      navbar.style.transform = 'translateY(0)';
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    }
  
    // Add shadow on scroll
    if (currentScroll > 80) {
      navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
      navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
  
    lastScroll = currentScroll;
  });
  
  // Auth Modal Functionality
  const modal = document.getElementById('authModal');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const closeModal = document.querySelector('.close-modal');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const switchToRegister = document.getElementById('switchToRegister');
  const switchToLogin = document.getElementById('switchToLogin');
  
  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModalFunc() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
  });
  
  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });
  
  closeModal.addEventListener('click', closeModalFunc);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModalFunc();
    }
  });
  
  switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });
  
  switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });
  
  // Form submission handling with enhanced feedback
  const contactForm = document.getElementById('contact-form');
  const submitBtn = contactForm.querySelector('.submit-btn');
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      console.log('Form submitted:', data);
      
      // Clear form
      contactForm.reset();
      
      // Show success state
      submitBtn.textContent = 'Sent Successfully!';
      submitBtn.style.backgroundColor = '#10B981';
      
      // Reset button after 2 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      submitBtn.textContent = 'Error! Try Again';
      submitBtn.style.backgroundColor = '#EF4444';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
      }, 2000);
    }
  });
  
  // Enhanced skill cards animation
  const skillCards = document.querySelectorAll('.skill-card');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '50px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered animation delay
        entry.target.style.transitionDelay = `${index * 100}ms`;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Remove observer after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });
  
  // Project cards hover effect
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
  });
