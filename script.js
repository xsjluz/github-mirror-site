// ===== GitHub Mirror Site Script =====

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSearchShortcut();
    initScrollAnimations();
    initStatCounter();
    initTestimonialCarousel();
    initSmoothScroll();
});

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');

    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-open');
        });
    });
}

// ===== Keyboard Shortcut: / to focus search =====
function initSearchShortcut() {
    const searchInput = document.querySelector('.search-input');

    if (!searchInput) return;

    document.addEventListener('keydown', (e) => {
        // Don't trigger when typing in other inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// ===== Scroll-based Entrance Animations =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Animate feature cards
    document.querySelectorAll('.feature-card[data-animate]').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ===== Animated Number Counter =====
function initStatCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (statNumbers.length === 0) return;

    let animated = false;

    function animateNumber(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 1500; // ms
        const startTime = performance.now();
        const startVal = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startVal + (target - startVal) * eased);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(el => animateNumber(el));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('.stats-grid'));
}

// ===== Testimonial Carousel =====
function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonialCarousel');
    const dotsContainer = document.getElementById('carouselDots');

    if (!carousel || !dotsContainer) return;

    const testimonials = carousel.querySelectorAll('.testimonial');
    if (testimonials.length === 0) return;

    let currentIndex = 0;
    let interval;

    // Create dots
    testimonials.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `评价 ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        testimonials[currentIndex].classList.remove('active');
        dotsContainer.children[currentIndex].classList.remove('active');

        currentIndex = index;

        testimonials[currentIndex].classList.add('active');
        dotsContainer.children[currentIndex].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentIndex + 1) % testimonials.length);
    }

    // Auto rotate every 5 seconds
    interval = setInterval(nextSlide, 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(nextSlide, 5000);
    });
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Navbar shadow on scroll =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
}, { passive: true });

console.log('%c GitHub Mirror %c v1.0 ',
    'background:#2ea44f;color:white;padding:4px 8px;border-radius:4px 0 0 4px;font-weight:bold;',
    'background:#0d1117;color:#8b949e;padding:4px 8px;border-radius:0 4px 4px 0;border:1px solid #30363d;'
);
