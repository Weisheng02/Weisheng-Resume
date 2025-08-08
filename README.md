# Wei Sheng · Portfolio

Modern single-page portfolio (About, Resume, Projects, Skills, Contact) with smooth UX, dark/light theme, SEO and PWA.

## Quick start
Open index.html directly, or run a local server:

```
python3 -m http.server 5173 -d /Users/WS/Weisheng-Resume
# then open http://localhost:5173/
```

## Customize
- Content: index.html
- Projects: assets/js/main.js (projects array)
- Email: assets/js/main.js (const to)
- Resume: assets/resume/Weisheng-Resume.pdf
- Theme/colors: assets/css/styles.css

## Features
- Smooth scroll, scrollspy, parallax, reveal animations
- Dark/Light theme with persistence
- SEO: OpenGraph, Twitter; JSON-LD (Person)
- PWA: manifest + service worker (offline)
- Print stylesheet (resume friendly)

## Deploy
- GitHub Pages or Netlify/Cloudflare Pages
