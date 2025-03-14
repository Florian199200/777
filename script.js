// Menu mobile toggle
const menuToggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const overlay = document.querySelector('.overlay');
const body = document.body;

menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on navigation links
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav .cta-button');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});

// Close mobile menu when clicking on overlay
overlay.addEventListener('click', function() {
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    this.classList.remove('active');
    body.classList.remove('no-scroll');
});

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Header scroll behavior
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Check if we're on the contact page by looking for the contact form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // FAQ Accordion on contact page
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Close all other open FAQ items
            faqQuestions.forEach(item => {
                if (item !== question) {
                    item.parentElement.classList.remove('active');
                }
            });
            
            // Toggle the current FAQ item
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // Form validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    
    // Helper function to validate email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Helper function to validate phone
    function isValidPhone(phone) {
        if (!phone) return true; // Phone is optional
        const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return regex.test(phone);
    }
    
    // Function to show error message
    function showError(input, message) {
        input.classList.add('error');
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    // Function to hide error message
    function hideError(input) {
        input.classList.remove('error');
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }
    
    // Validate single field
    function validateField(input) {
        if (input.type === 'checkbox' && input.required) {
            if (!input.checked) {
                showError(input, 'Ce champ est requis');
                return false;
            }
        } else if (input.type === 'email') {
            if (!input.value.trim()) {
                showError(input, 'Veuillez entrer votre adresse e-mail');
                return false;
            } else if (!isValidEmail(input.value.trim())) {
                showError(input, 'Veuillez entrer une adresse e-mail valide');
                return false;
            }
        } else if (input.type === 'tel') {
            if (input.value.trim() && !isValidPhone(input.value.trim())) {
                showError(input, 'Veuillez entrer un numéro de téléphone valide');
                return false;
            }
        } else if (input.required && !input.value.trim()) {
            showError(input, 'Ce champ est requis');
            return false;
        }
        
        hideError(input);
        return true;
    }
    
    // Add input event listeners
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(input);
        });
        
        input.addEventListener('blur', function() {
            validateField(input);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        // Validate all fields
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}
