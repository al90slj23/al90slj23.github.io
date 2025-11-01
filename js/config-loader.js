/**
 * Configuration Loader
 * 配置文件加载器 - 将配置数据注入到页面元素
 */

(function() {
    'use strict';

    /**
     * 从嵌套对象路径获取值
     * @param {Object} obj - 源对象
     * @param {string} path - 属性路径，如 "nav.logo"
     * @returns {*} 对应路径的值
     */
    function getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    /**
     * 应用配置到页面元素
     */
    function applyConfig() {
        if (typeof siteConfig === 'undefined') {
            console.error('配置文件未加载：siteConfig 未定义');
            return;
        }

        // 更新页面标题
        if (siteConfig.site?.title) {
            document.title = siteConfig.site.title;
        }

        // 处理简单文本替换
        document.querySelectorAll('[data-config]').forEach(element => {
            const configPath = element.getAttribute('data-config');
            const value = getNestedValue(siteConfig, configPath);

            if (value === undefined) {
                console.warn(`配置路径未找到: ${configPath}`);
                return;
            }

            // 特殊处理：导航链接
            if (configPath === 'nav.links') {
                renderNavLinks(element, value);
                return;
            }

            // 特殊处理：技能标签
            if (configPath.includes('skills') && configPath.endsWith('.items')) {
                renderSkillTags(element, value);
                return;
            }

            // 特殊处理：项目列表
            if (configPath === 'projects.items') {
                renderProjects(element, value);
                return;
            }

            // 特殊处理：联系方式
            if (configPath === 'contact.methods') {
                renderContactMethods(element, value);
                return;
            }

            // 默认：替换文本内容
            element.textContent = value;
        });

        // 更新页脚版权信息
        updateFooter();
    }

    /**
     * 渲染导航链接
     */
    function renderNavLinks(container, links) {
        container.innerHTML = '';
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.href;
            a.className = 'nav-link';
            a.textContent = link.text;
            container.appendChild(a);
        });
    }

    /**
     * 渲染技能标签
     */
    function renderSkillTags(container, items) {
        container.innerHTML = '';
        items.forEach(item => {
            const span = document.createElement('span');
            span.className = 'skill-tag';
            span.textContent = item;
            container.appendChild(span);
        });
    }

    /**
     * 渲染项目列表
     */
    function renderProjects(container, projects) {
        container.innerHTML = '';

        projects.forEach((project, index) => {
            const article = document.createElement('article');
            article.className = 'project-card';

            // 根据索引选择不同的渐变
            const gradients = [
                { id: `gradient${index}1`, colors: ['#667eea', '#764ba2'] },
                { id: `gradient${index}2`, colors: ['#f093fb', '#f5576c'] },
                { id: `gradient${index}3`, colors: ['#4facfe', '#00f2fe'] }
            ];
            const gradient = gradients[index % 3];

            // SVG 占位符
            const shapes = [
                '<path d="M30 15L45 37.5H15L30 15Z" fill="white" opacity="0.3"/>',
                '<circle cx="30" cy="30" r="12" fill="white" opacity="0.3"/>',
                '<rect x="15" y="15" width="30" height="30" rx="4" fill="white" opacity="0.3"/>'
            ];

            article.innerHTML = `
                <div class="project-image">
                    <div class="project-placeholder">
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="60" height="60" rx="8" fill="url(#${gradient.id})"/>
                            ${shapes[index % 3]}
                            <defs>
                                <linearGradient id="${gradient.id}" x1="0" y1="0" x2="60" y2="60">
                                    <stop stop-color="${gradient.colors[0]}"/>
                                    <stop offset="1" stop-color="${gradient.colors[1]}"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.link.href}" class="project-link">${project.link.text}</a>
                    </div>
                </div>
            `;

            container.appendChild(article);
        });
    }

    /**
     * 渲染联系方式
     */
    function renderContactMethods(container, methods) {
        container.innerHTML = '';

        const icons = {
            email: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
            `,
            github: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
            `
        };

        methods.forEach(method => {
            const a = document.createElement('a');
            a.href = method.href;
            a.className = 'contact-method';
            if (method.type === 'github') {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }

            a.innerHTML = `
                <div class="contact-icon">
                    ${icons[method.type] || ''}
                </div>
                <div class="contact-info">
                    <span class="contact-label">${method.label}</span>
                    <span class="contact-value">${method.value}</span>
                </div>
            `;

            container.appendChild(a);
        });
    }

    /**
     * 更新页脚
     */
    function updateFooter() {
        const footerText = document.querySelector('.footer-content p');
        if (footerText && siteConfig.site) {
            const currentYear = new Date().getFullYear();
            footerText.textContent = `© ${currentYear} ${siteConfig.site.author}. ${siteConfig.site.copyright}`;
        }

        const footerLinks = document.querySelector('.footer-links');
        if (footerLinks && siteConfig.footer?.links) {
            footerLinks.innerHTML = '';
            siteConfig.footer.links.forEach(link => {
                const a = document.createElement('a');
                a.href = link.href;
                a.textContent = link.text;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                footerLinks.appendChild(a);
            });
        }
    }

    // 页面加载完成后应用配置
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyConfig);
    } else {
        applyConfig();
    }

})();
