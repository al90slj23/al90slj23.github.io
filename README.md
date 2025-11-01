# 李算老几 - 个人主页

一个现代、优雅的个人主页，具有呼吸感设计和流畅的动画效果。

## 特性

- **现代设计**：简洁的极简界面，优雅的排版
- **呼吸感空间**：慷慨的留白和精心设计的间距
- **流畅动画**：微妙的淡入效果和平滑滚动
- **响应式布局**：针对桌面、平板和移动设备优化
- **交互元素**：悬停效果、视差背景和流畅过渡
- **无障碍访问**：支持键盘导航和减弱动效偏好
- **性能优化**：轻量级且快速加载

## 页面结构

- **首页横幅**：引人注目的介绍，带有动画渐变文字
- **关于我**：个人介绍，展示技能和技术栈
- **项目展示**：精选作品的项目卡片展示
- **联系方式**：便捷的联系方式

## 自定义指南

### 更新个人信息

1. **导航栏和首页横幅** ([index.html:17-51](index.html#L17-L51))
   - 修改导航栏 Logo 文字
   - 更新首页标题和描述
   - 调整可用性徽章状态

2. **关于区域** ([index.html:69-102](index.html#L69-L102))
   - 更新个人简介文字
   - 添加或删除技能标签
   - 修改技术分类

3. **项目展示** ([index.html:111-203](index.html#L111-L203))
   - 用真实项目替换占位符
   - 更新项目标题、描述和标签
   - 添加项目链接（GitHub、在线演示等）

4. **联系信息** ([index.html:217-252](index.html#L217-L252))
   - 更新邮箱地址
   - 添加社交媒体链接（GitHub、Twitter、LinkedIn）
   - 自定义联系方式

### 配色方案

编辑 [styles.css:21-32](styles.css#L21-L32) 中的 CSS 变量：

```css
:root {
    --color-accent: #667eea;        /* 主要强调色 */
    --color-accent-hover: #5568d3;  /* 悬停状态 */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* ... 自定义其他颜色 ... */
}
```

### 字体设置

在 [styles.css:42-43](styles.css#L42-L43) 中修改字体：

```css
--font-primary: 'Inter', sans-serif;
--font-display: 'Playfair Display', serif;
```

在 [index.html:8-10](index.html#L8-L10) 中更新 Google Fonts。

## 本地开发

1. 克隆仓库：
```bash
git clone https://github.com/al90slj23/al90slj23.github.io.git
cd al90slj23.github.io
```

2. 在浏览器中打开 `index.html` 或使用本地服务器：
```bash
# Python 3
python -m http.server 8000

# Node.js（如果已安装 http-server）
npx http-server

# 或直接打开文件
open index.html
```

3. 在浏览器中访问 `http://localhost:8000`

## 部署到 GitHub Pages

1. 创建名为 `username.github.io` 的仓库（将 `username` 替换为你的 GitHub 用户名）

2. 推送代码：
```bash
git add .
git commit -m "Initial commit: personal portfolio"
git branch -M main
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

3. 你的网站将在 `https://username.github.io` 上线

## 浏览器支持

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## 使用技术

- **HTML5**：语义化标记
- **CSS3**：现代样式，使用自定义属性、Flexbox、Grid
- **JavaScript (ES6+)**：交互功能和动画
- **Google Fonts**：Inter 和 Playfair Display

## 性能优化

- 使用 `requestAnimationFrame` 优化动画
- 防抖处理滚动和调整大小事件
- 通过 Intersection Observer 延迟加载动画
- 支持减弱动效以提高无障碍性

## 许可证

MIT License - 欢迎使用此模板创建你自己的作品集！

## 开发者

设计与开发：李算老几

---

**提示**：部署前请记得将所有占位符内容替换为你自己的信息！
