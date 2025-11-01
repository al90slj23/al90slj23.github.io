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
    // Note: Footer content is now managed by config-loader.js

    // ===================================
    // Enhanced Cursor Effect - Cute Hand Pointer
    // ===================================

    let cursor = null;

    // Only add cursor effect on desktop devices
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        // 创建可爱的手指光标
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = `
            <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- 手掌阴影 -->
                <ellipse cx="14" cy="30" rx="8" ry="2" fill="rgba(0, 0, 0, 0.1)"/>

                <!-- 手指主体 - 胖乎乎的可爱风格 -->
                <path d="M10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18V24M14 14V10C14 8.89543 14.8954 8 16 8C17.1046 8 18 8.89543 18 10V14M18 12V8C18 6.89543 18.8954 6 20 6C21.1046 6 22 6.89543 22 8V14M22 14V12C22 10.8954 22.8954 10 24 10C25.1046 10 26 10.8954 26 12V20C26 24.4183 22.4183 28 18 28H14C9.58172 28 6 24.4183 6 20V18C6 16.8954 6.89543 16 8 16C9.10457 16 10 16.8954 10 18V20"
                      fill="#667eea" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

                <!-- 手指高光 -->
                <path d="M16 10C16 9.5 16.5 9 17 9" stroke="rgba(255, 255, 255, 0.5)" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M20 8C20 7.5 20.5 7 21 7" stroke="rgba(255, 255, 255, 0.5)" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        `;
        cursor.style.cssText = `
            position: fixed;
            width: 28px;
            height: 32px;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-6px, -2px);
            transition: transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            opacity: 1;
            filter: drop-shadow(0 2px 6px rgba(102, 126, 234, 0.25));
        `;
        document.body.appendChild(cursor);

        // 直接跟随，无延迟
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseenter', function() {
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
        });

        // 在可交互元素上的效果 - 手指按下动画
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-tag, .contact-method');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                // 手指变大，模拟点击准备
                cursor.style.transform = 'translate(-6px, -2px) scale(1.15)';
                cursor.style.filter = 'drop-shadow(0 4px 10px rgba(102, 126, 234, 0.4))';
            });

            el.addEventListener('mouseleave', function() {
                // 恢复默认大小
                cursor.style.transform = 'translate(-6px, -2px) scale(1)';
                cursor.style.filter = 'drop-shadow(0 2px 6px rgba(102, 126, 234, 0.25))';
            });

            // 点击时的按下效果
            el.addEventListener('mousedown', function() {
                cursor.style.transform = 'translate(-6px, -2px) scale(0.95) rotate(-5deg)';
            });

            el.addEventListener('mouseup', function() {
                cursor.style.transform = 'translate(-6px, -2px) scale(1.15)';
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
    // Note: Can be customized via config in the future
    console.log('%c👋 你好！', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%c在看代码？我喜欢你的风格！', 'font-size: 14px; color: #6b7280;');
    console.log('%c如果你想合作，欢迎随时联系我。', 'font-size: 14px; color: #6b7280;');

})();
