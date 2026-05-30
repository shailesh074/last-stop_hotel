
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('loaded');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    });

    // Cursor Effects
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Interactive cursor effects
    const interactiveElements = document.querySelectorAll('a, button, .room-card, .experience-card, .gallery-item, .amenity-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'var(--secondary)';
            cursor.style.borderColor = 'var(--secondary)';
            cursor.style.opacity = '0.3';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.borderColor = 'var(--secondary)';
            cursor.style.opacity = '1';
        });
    });

    // Navigation
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Scroll animations
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Booking modal
    const bookButtons = document.querySelectorAll('.book-btn, .btn-primary[href="#"]');
    const bookingModal = document.querySelector('.booking-modal');
    const modalClose = document.querySelector('.modal-close');
    
    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.padding = '1rem 5%';
            navbar.style.background = 'rgba(245, 241, 232, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.padding = '1.5rem 5%';
            navbar.style.background = 'rgba(245, 241, 232, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Image hover effects
    const roomCards = document.querySelectorAll('.room-card');
    
    roomCards.forEach(card => {
        const image = card.querySelector('.room-image');
        
        card.addEventListener('mousemove', (e) => {
            const x = e.offsetX;
            const y = e.offsetY;
            const centerX = image.offsetWidth / 2;
            const centerY = image.offsetHeight / 2;
            
            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;
            
            image.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.2);
        el.style.animationDuration = `${20 / speed}s`;
    });

    // Initialize animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Form submission (demo)
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', function(e) {
            if (this.href.includes('mailto:')) {
                e.preventDefault();
                alert('Thank you! In a real implementation, this would open your email client.');
            }
        });
    });

    // Add subtle background animation
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '-1';
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 100 + 50 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `radial-gradient(circle, rgba(212, 175, 55, ${Math.random() * 0.1}) 0%, transparent 70%)`;
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animation = `floatParticle ${20 + Math.random() * 20}s infinite ease-in-out`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particlesContainer.appendChild(particle);
        }
        
        document.body.appendChild(particlesContainer);
    }
    
    createParticles();

    // Add CSS for particles animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
            25% { transform: translate(100px, -50px) scale(1.1); opacity: 0.5; }
            50% { transform: translate(-50px, 80px) scale(0.9); opacity: 0.2; }
            75% { transform: translate(-80px, -30px) scale(1.05); opacity: 0.4; }
        }
    `;
    document.head.appendChild(style);
});
