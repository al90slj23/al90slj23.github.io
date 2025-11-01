/**
 * Personal Portfolio - Interactive Features
 * Smooth scrolling, navigation effects, and animations
 */

(function() {
    'use strict';

    // ===================================
    // Smooth Scrolling
    // ===================================

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't prevent default for just "#"
            if (href === '#') return;

            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Navigation Bar Effects
    // ===================================

    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNav() {
        const currentScrollY = window.scrollY;

        // Add shadow on scroll
        if (currentScrollY > 10) {
            nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateNav);
            ticking = true;
        }
    });

    // ===================================
    // Intersection Observer for Animations
    // ===================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections and cards
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-method');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Active Navigation Link Highlighting
    // ===================================

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Run on load

    // Add active link styles
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-link.active {
            color: var(--color-text);
        }
        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(activeStyle);

    // ===================================
    // Parallax Effect for Background Shapes
    // ===================================

    const shapes = document.querySelectorAll('.shape');

    function parallaxShapes() {
        const scrolled = window.scrollY;

        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(parallaxShapes);
            ticking = true;
        }
    });

    // ===================================
    // Dynamic Year in Footer
    // ===================================

    const footerText = document.querySelector('.footer-content p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.textContent = `© ${currentYear} 李算老几. 用心打造`;
    }

    // ===================================
    // Cursor Follow Effect (Optional Enhancement)
    // ===================================

    let cursor = null;

    // Only add cursor effect on desktop devices
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid var(--color-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease-out, opacity 0.3s ease;
            opacity: 0;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
        });

        // Smooth cursor animation
        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.1;
            cursorY += dy * 0.1;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Scale cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(1.5)';
            });

            el.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    // ===================================
    // Loading Animation
    // ===================================

    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===================================
    // Keyboard Navigation Enhancement
    // ===================================

    document.addEventListener('keydown', function(e) {
        // Skip to main content with 'Tab' from top
        if (e.key === 'Tab' && window.scrollY === 0) {
            const mainContent = document.querySelector('.hero');
            if (mainContent && document.activeElement === document.body) {
                e.preventDefault();
                mainContent.focus();
            }
        }
    });

    // ===================================
    // Performance Optimization
    // ===================================

    // Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle resize events
    const handleResize = debounce(function() {
        // Remove cursor effect on smaller screens
        if (cursor && window.innerWidth <= 768) {
            cursor.remove();
            cursor = null;
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // ===================================
    // Console Easter Egg
    // ===================================

    console.log('%c👋 你好！', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%c在看代码？我喜欢你的风格！', 'font-size: 14px; color: #6b7280;');
    console.log('%c如果你想合作，欢迎随时联系我。', 'font-size: 14px; color: #6b7280;');

})();
