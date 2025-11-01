/**
 * 网站配置文件 - Site Configuration
 * 所有中文内容集中管理
 */

const siteConfig = {
    // 站点基本信息
    site: {
        title: '李算老几 - 个人主页',
        author: '李算老几',
        copyright: '用心打造'
    },

    // 导航栏
    nav: {
        logo: '李算老几',
        links: [
            { href: '#about', text: '关于' },
            { href: '#projects', text: '项目' },
            { href: '#contact', text: '联系' }
        ]
    },

    // 首页横幅
    hero: {
        badge: '开放合作机会',
        title: {
            line1: '创造',
            line2: '有价值的数字体验',
            line3: '让每一行代码都有意义'
        },
        description: '一位充满热情的开发者，通过简洁的代码和深思熟虑的设计，打造优雅的解决方案。',
        cta: {
            primary: '查看作品',
            secondary: '联系我'
        },
        scrollIndicator: '向下滚动探索'
    },

    // 关于区域
    about: {
        label: '关于我',
        title: '个人介绍',
        lead: '我是一名开发者，相信技术的力量能将想法转化为现实。',
        description: '专注于现代 Web 技术和以用户为中心的设计，我创造的数字体验不仅功能完善，而且使用愉悦。每个项目都是突破边界、学习新知的机会。',
        skills: {
            tech: {
                title: '技术栈',
                items: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python']
            },
            tools: {
                title: '工具与平台',
                items: ['Git', 'Docker', 'AWS', 'Figma']
            }
        }
    },

    // 项目展示
    projects: {
        label: '我的作品',
        title: '精选项目',
        items: [
            {
                title: '项目 Alpha',
                description: '使用 React 和 Node.js 构建的现代 Web 应用，专注于用户体验和性能优化。',
                tags: ['React', 'Node.js', 'MongoDB'],
                link: {
                    text: '查看项目 →',
                    href: '#'
                }
            },
            {
                title: '项目 Beta',
                description: '创新的自动化工具，旨在简化工作流程，通过智能自动化提升生产效率。',
                tags: ['Python', 'FastAPI', 'PostgreSQL'],
                link: {
                    text: '查看项目 →',
                    href: '#'
                }
            },
            {
                title: '项目 Gamma',
                description: '响应式设计系统和组件库，专为可扩展性和一致性而构建。',
                tags: ['TypeScript', 'Storybook', 'CSS-in-JS'],
                link: {
                    text: '查看项目 →',
                    href: '#'
                }
            }
        ]
    },

    // 联系方式
    contact: {
        label: '联系方式',
        title: '让我们一起合作',
        description: '我随时欢迎讨论新项目、创意想法，或成为您愿景的一部分。',
        methods: [
            {
                type: 'email',
                label: '邮箱',
                value: 'al90slj23@gmail.com',
                href: 'mailto:al90slj23@gmail.com'
            },
            {
                type: 'github',
                label: 'GitHub',
                value: '@al90slj23',
                href: 'https://github.com/al90slj23'
            }
        ]
    },

    // 页脚
    footer: {
        links: [
            { text: 'GitHub', href: 'https://github.com/al90slj23' },
            { text: 'Twitter', href: 'https://twitter.com/al90slj23' },
            { text: 'LinkedIn', href: 'https://linkedin.com/in/al90slj23' }
        ]
    }
};
