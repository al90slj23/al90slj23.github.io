# Personal Portfolio Website

A modern, elegant personal portfolio website with breathing space aesthetic and smooth animations.

## Features

- **Modern Design**: Clean, minimalist interface with elegant typography
- **Breathing Space**: Generous whitespace and thoughtful spacing throughout
- **Smooth Animations**: Subtle fade-in effects and smooth scrolling
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, parallax backgrounds, and smooth transitions
- **Accessible**: Keyboard navigation support and reduced motion preferences
- **Performance Optimized**: Lightweight and fast-loading

## Sections

- **Hero**: Eye-catching introduction with animated gradient text
- **About**: Personal introduction with skills and technologies
- **Projects**: Showcase of featured work with project cards
- **Contact**: Easy ways to get in touch

## Customization

### Update Personal Information

1. **Navigation & Hero** ([index.html:17-51](index.html#L17-L51))
   - Change the logo text in the navigation
   - Update the hero title and description
   - Modify the availability badge status

2. **About Section** ([index.html:69-102](index.html#L69-L102))
   - Update the personal bio text
   - Add or remove skill tags
   - Modify technology categories

3. **Projects** ([index.html:111-203](index.html#L111-L203))
   - Replace project placeholders with real projects
   - Update project titles, descriptions, and tags
   - Add project links (GitHub, live demos, etc.)

4. **Contact Information** ([index.html:217-252](index.html#L217-L252))
   - Update email address
   - Add social media links (GitHub, Twitter, LinkedIn)
   - Customize contact methods

### Color Scheme

Edit CSS variables in [styles.css:21-32](styles.css#L21-L32):

```css
:root {
    --color-accent: #667eea;        /* Primary accent color */
    --color-accent-hover: #5568d3;  /* Hover state */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* ... customize other colors ... */
}
```

### Typography

Change fonts in [styles.css:42-43](styles.css#L42-L43):

```css
--font-primary: 'Inter', sans-serif;
--font-display: 'Playfair Display', serif;
```

Update Google Fonts in [index.html:8-10](index.html#L8-L10).

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/al90slj23/al90slj23.github.io.git
cd al90slj23.github.io
```

2. Open `index.html` in your browser or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (if you have http-server installed)
npx http-server

# Or just open the file
open index.html
```

3. Visit `http://localhost:8000` in your browser

## Deployment to GitHub Pages

1. Create a repository named `username.github.io` (replace `username` with your GitHub username)

2. Push your code:
```bash
git add .
git commit -m "Initial commit: personal portfolio"
git branch -M main
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

3. Your site will be live at `https://username.github.io`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties, flexbox, grid
- **JavaScript (ES6+)**: Interactive features and animations
- **Google Fonts**: Inter and Playfair Display

## Performance

- Optimized animations with `requestAnimationFrame`
- Debounced scroll and resize events
- Lazy loading of animations via Intersection Observer
- Reduced motion support for accessibility

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Designed and developed by al90slj23

---

**Note**: Remember to customize all placeholder content with your own information before deploying!
