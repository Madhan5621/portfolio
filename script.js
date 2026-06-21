/* ======================================
   PORTFOLIO — INTERACTIVE SCRIPTS
   B Madhanraj Portfolio v1.0
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ——— NAVBAR SCROLL EFFECT ———
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const handleNavScroll = () => {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // Run on load

    // ——— MOBILE NAVIGATION TOGGLE ———
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('open');
            document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
        });

        // Close mobile menu when a link is clicked
        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinksContainer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ——— SCROLL REVEAL ANIMATION ———
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ——— STAT COUNTER ANIMATION ———
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10);
                animateCount(el, 0, target, 1200);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => countObserver.observe(el));

    function animateCount(element, start, end, duration) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ——— SMOOTH SCROLL FOR ANCHOR LINKS ———
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ——— CURSOR GLOW EFFECT ON CARDS ———
    const cards = document.querySelectorAll('.skill-card, .project-card, .education-card, .contact-link');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ——— PARALLAX FOR HERO GLOWS ———
    const heroGlows = document.querySelectorAll('.hero-glow');

    if (heroGlows.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            heroGlows.forEach((glow, index) => {
                const speed = (index + 1) * 15;
                glow.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        }, { passive: true });
    }

    // ——— TYPEWRITER EFFECT FOR HERO (subtle) ———
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(10px)';
        setTimeout(() => {
            badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 300);
    }
});
