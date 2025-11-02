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
    // Enhanced Cursor Effect - Emoji Hand Pointer
    // ===================================

    let cursor = null;
    let cursorRipple = null;

    // Only add cursor effect on desktop devices
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        // 创建胖乎乎的手指光标 - 精心设计的可爱手型
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = `
            <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- 手掌底部阴影 -->
                <ellipse cx="16" cy="37" rx="10" ry="2.5" fill="rgba(0, 0, 0, 0.15)"/>

                <!-- 手掌主体 - 胖乎乎的设计 -->
                <g filter="url(#handshadow)">
                    <!-- 手掌 -->
                    <path d="M8 28C8 28 7 35 10 37C13 39 19 39 22 37C25 35 24 28 24 28L24 20C24 20 25 15 22 15C19 15 20 18 20 20L20 12C20 12 21 8 18 8C15 8 16 11 16 12L16 10C16 10 17 6 14 6C11 6 12 9 12 10L12 14C12 14 13 11 10 11C7 11 8 14 8 16L8 28Z"
                          fill="#FFD4A3" stroke="#8B6F47" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>

                    <!-- 拇指 -->
                    <path d="M8 20C8 20 6 20 5 22C4 24 4 26 6 27C8 28 10 27 10 25L10 22C10 22 9 20 8 20Z"
                          fill="#FFD4A3" stroke="#8B6F47" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>

                    <!-- 手指关节线条 -->
                    <path d="M12 12C12 12 13 12 14 12" stroke="#D4A574" stroke-width="0.8" stroke-linecap="round"/>
                    <path d="M16 10C16 10 17 10 18 10" stroke="#D4A574" stroke-width="0.8" stroke-linecap="round"/>
                    <path d="M20 12C20 12 21 12 22 12" stroke="#D4A574" stroke-width="0.8" stroke-linecap="round"/>

                    <!-- 高光效果 -->
                    <ellipse cx="13" cy="24" rx="2.5" ry="3.5" fill="white" opacity="0.4"/>
                    <ellipse cx="19" cy="24" rx="2.5" ry="3.5" fill="white" opacity="0.4"/>
                </g>

                <defs>
                    <filter id="handshadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
                        <feOffset dx="0" dy="1.5" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.25"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
            </svg>
        `;
        cursor.style.cssText = `
            position: fixed;
            width: 32px;
            height: 40px;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            opacity: 1;
        `;
        document.body.appendChild(cursor);

        // 创建涟漪效果圈
        cursorRipple = document.createElement('div');
        cursorRipple.className = 'cursor-ripple';
        cursorRipple.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%) scale(1);
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease, border-color 0.2s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursorRipple);

        // 直接跟随，无延迟
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorRipple.style.left = e.clientX + 'px';
            cursorRipple.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseenter', function() {
            cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
            cursorRipple.style.opacity = '0';
        });

        // 在可交互元素上的效果
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-tag, .contact-method');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                // 手指变大 + 涟漪出现
                cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
                cursor.style.filter = 'drop-shadow(0 4px 8px rgba(102, 126, 234, 0.3))';
                cursorRipple.style.opacity = '1';
                cursorRipple.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });

            el.addEventListener('mouseleave', function() {
                // 恢复默认
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.filter = 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))';
                cursorRipple.style.opacity = '0';
                cursorRipple.style.transform = 'translate(-50%, -50%) scale(1)';
            });

            // 点击时的按下效果
            el.addEventListener('mousedown', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.1) rotate(-8deg)';
                cursorRipple.style.transform = 'translate(-50%, -50%) scale(1.2)';
                cursorRipple.style.borderColor = 'rgba(102, 126, 234, 0.6)';
                cursorRipple.style.borderWidth = '3px';
            });

            el.addEventListener('mouseup', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
                cursorRipple.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorRipple.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                cursorRipple.style.borderWidth = '2px';
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
        if (cursorRipple && window.innerWidth <= 768) {
            cursorRipple.remove();
            cursorRipple = null;
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
