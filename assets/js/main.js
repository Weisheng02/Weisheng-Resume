/**
 * ============================================
 * MODERN PORTFOLIO - MAIN JAVASCRIPT
 * ============================================
 *
 * This file handles all dynamic content rendering and interactions.
 * All content is loaded from config.js
 */

(function() {
  'use strict';

  // Check if config is loaded
  if (typeof portfolioConfig === 'undefined') {
    console.error('Portfolio config not loaded! Make sure config.js is loaded before main.js');
    return;
  }

  const config = portfolioConfig;

  // ============================================
  // INITIALIZE APP
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    hideLoader();
    applyThemeColors();
    updateSEO();
    renderAllContent();
    initInteractions();
    initParticles();
    initScrollAnimations();
  });

  // ============================================
  // LOADING SCREEN
  // ============================================
  function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 300);
      }, 500);
    }
  }

  // ============================================
  // THEME SYSTEM
  // ============================================
  function applyThemeColors() {
    const theme = config.settings.theme;
    const root = document.documentElement;

    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--color-accent', theme.accentColor);
  }

  // Initialize theme toggle
  const THEME_KEY = 'portfolio-theme';
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // ============================================
  // SEO UPDATE
  // ============================================
  function updateSEO() {
    const seo = config.settings.seo;

    document.title = seo.title;

    updateMetaTag('name', 'description', seo.description);
    updateMetaTag('name', 'keywords', seo.keywords);
    updateMetaTag('name', 'author', seo.author);
    updateMetaTag('property', 'og:title', seo.title);
    updateMetaTag('property', 'og:description', seo.description);
    updateMetaTag('property', 'og:image', seo.ogImage);
    updateMetaTag('name', 'twitter:title', seo.title);
    updateMetaTag('name', 'twitter:description', seo.description);
    updateMetaTag('name', 'twitter:image', seo.ogImage);

    // Update structured data
    const structuredData = document.getElementById('structured-data');
    if (structuredData) {
      structuredData.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": config.personal.name.en,
        "jobTitle": config.personal.title,
        "email": config.contact.email,
        "url": window.location.origin,
        "sameAs": config.contact.social.map(s => s.url)
      }, null, 2);
    }
  }

  function updateMetaTag(attr, attrValue, content) {
    let tag = document.querySelector(`meta[${attr}="${attrValue}"]`);
    if (tag) {
      tag.setAttribute('content', content);
    }
  }

  // ============================================
  // RENDER ALL CONTENT
  // ============================================
  function renderAllContent() {
    renderHeader();
    renderHero();
    renderAbout();
    renderExperienceAndEducation();
    renderProjects();
    renderSkills();
    renderContact();
    renderFooter();
  }

  // ============================================
  // RENDER HEADER
  // ============================================
  function renderHeader() {
    const nameInitials = config.personal.name.en.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    document.getElementById('logo-text').textContent = nameInitials;
    document.getElementById('header-name').textContent = config.personal.name.en.split(' ')[0];
  }

  // ============================================
  // RENDER HERO SECTION
  // ============================================
  function renderHero() {
    document.getElementById('hero-name').innerHTML =
      `<span class="highlight">${config.personal.name.en}</span>`;
    document.getElementById('hero-title').textContent = config.personal.title;
    document.getElementById('hero-tagline').textContent = config.personal.tagline;

    // Avatar
    const avatar = document.getElementById('hero-avatar');
    if (config.personal.avatar) {
      avatar.src = config.personal.avatar;
      avatar.alt = config.personal.name.en;
    } else {
      // Use initials as fallback
      avatar.style.display = 'none';
    }

    // Social Links
    const heroSocial = document.getElementById('hero-social');
    heroSocial.innerHTML = config.contact.social.map(social => `
      <a href="${social.url}" target="_blank" rel="noopener noreferrer"
         class="social-link" aria-label="${social.name}">
        ${getSocialIcon(social.icon)}
      </a>
    `).join('');
  }

  // ============================================
  // RENDER ABOUT SECTION
  // ============================================
  function renderAbout() {
    // About description
    const aboutDescription = document.getElementById('about-description');
    aboutDescription.innerHTML = config.personal.about
      .map(paragraph => `<p>${paragraph}</p>`)
      .join('');

    // Stats
    const statsGrid = document.getElementById('stats-grid');
    statsGrid.innerHTML = config.personal.stats.map(stat => `
      <div class="stat-card">
        <div class="stat-number">${stat.number}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');

    // Services
    if (config.settings.features.showServices && config.services.length > 0) {
      const servicesGrid = document.getElementById('services-grid');
      servicesGrid.innerHTML = config.services.map(service => `
        <div class="service-card">
          <div class="service-icon">${service.icon}</div>
          <h4>${service.title}</h4>
          <p>${service.description}</p>
        </div>
      `).join('');
    }
  }

  // ============================================
  // RENDER EXPERIENCE & EDUCATION
  // ============================================
  function renderExperienceAndEducation() {
    // Experience Timeline
    const experienceTimeline = document.getElementById('experience-timeline');
    if (config.experience.length > 0) {
      experienceTimeline.innerHTML = config.experience.map(exp => `
        <div class="timeline-item">
          <h4>${exp.position} · ${exp.company}</h4>
          <span class="timeline-meta">${exp.period} · ${exp.location}</span>
          <p>${exp.description}</p>
          ${exp.achievements ? `
            <ul>
              ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
      `).join('');
    } else {
      experienceTimeline.innerHTML = '<p>Currently seeking opportunities!</p>';
    }

    // Education Timeline
    const educationTimeline = document.getElementById('education-timeline');
    educationTimeline.innerHTML = config.education.map(edu => `
      <div class="timeline-item">
        <h4>${edu.degree} · ${edu.school}</h4>
        <span class="timeline-meta">${edu.period} · ${edu.location}</span>
        ${edu.major ? `<p><strong>Major:</strong> ${edu.major}</p>` : ''}
        ${edu.description ? `<p>${edu.description}</p>` : ''}
        ${edu.gpa ? `<p><strong>GPA:</strong> ${edu.gpa}</p>` : ''}
        ${edu.highlights ? `
          <ul>
            ${edu.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');

    // Achievements
    if (config.settings.features.showAchievements && config.achievements.length > 0) {
      const achievementsGrid = document.getElementById('achievements-grid');
      achievementsGrid.innerHTML = config.achievements.map(achievement => `
        <div class="achievement-card">
          <div class="achievement-icon">${achievement.icon}</div>
          <h4>${achievement.title}</h4>
          <div class="achievement-issuer">${achievement.issuer}</div>
          <div class="achievement-date">${achievement.date}</div>
          <p>${achievement.description}</p>
          ${achievement.link ? `
            <a href="${achievement.link}" target="_blank" rel="noopener" class="btn btn-sm btn-outline">
              View Certificate
            </a>
          ` : ''}
        </div>
      `).join('');
    } else {
      document.getElementById('achievements-section').style.display = 'none';
    }
  }

  // ============================================
  // RENDER PROJECTS
  // ============================================
  function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');

    projectsGrid.innerHTML = config.projects.map(project => `
      <div class="project-card" data-categories="${project.category.join(' ')}">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <span class="project-status">${project.status}</span>
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <div class="project-links">
            ${project.links.demo ? `
              <a href="${project.links.demo}" target="_blank" rel="noopener" class="project-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                Demo
              </a>
            ` : ''}
            ${project.links.github ? `
              <a href="${project.links.github}" target="_blank" rel="noopener" class="project-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Code
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `).join('');
  }

  // ============================================
  // RENDER SKILLS
  // ============================================
  function renderSkills() {
    // Technical Skills (Progress Bars)
    const skillsBars = document.getElementById('skills-bars');
    skillsBars.innerHTML = config.skills.technical.map(skill => `
      <div class="skill-bar">
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-level">${skill.level}%</span>
        </div>
        <div class="skill-progress">
          <div class="skill-progress-bar" data-level="${skill.level}"></div>
        </div>
      </div>
    `).join('');

    // Skill Categories
    const skillsCategories = document.getElementById('skills-categories');
    skillsCategories.innerHTML = Object.entries(config.skills.categories).map(([category, skills]) => `
      <div class="skill-category">
        <h4>${category}</h4>
        <div class="skill-category-tags">
          ${skills.map(skill => `<span class="tag">${skill}</span>`).join('')}
        </div>
      </div>
    `).join('');

    // Soft Skills
    const softSkillsGrid = document.getElementById('soft-skills-grid');
    softSkillsGrid.innerHTML = config.skills.soft.map(skill => `
      <div class="soft-skill">${skill}</div>
    `).join('');

    // Animate progress bars when they come into view
    animateSkillBars();
  }

  function animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const level = bar.getAttribute('data-level');
          bar.style.width = level + '%';
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-progress-bar').forEach(bar => {
      observer.observe(bar);
    });
  }

  // ============================================
  // RENDER CONTACT
  // ============================================
  function renderContact() {
    // Contact Info
    document.getElementById('contact-email').textContent = config.contact.email;
    document.getElementById('contact-email').href = `mailto:${config.contact.email}`;

    if (config.contact.phone) {
      document.getElementById('contact-phone').textContent = config.contact.phone;
      document.getElementById('contact-phone').href = `tel:${config.contact.phone.replace(/\s/g, '')}`;
    } else {
      document.getElementById('phone-card').style.display = 'none';
    }

    document.getElementById('contact-location').textContent = config.personal.location;

    // Social Links in Contact
    const contactSocial = document.getElementById('contact-social');
    contactSocial.innerHTML = config.contact.social.map(social => `
      <a href="${social.url}" target="_blank" rel="noopener noreferrer"
         class="social-link" aria-label="${social.name}">
        ${getSocialIcon(social.icon)}
      </a>
    `).join('');

    // Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleContactForm);
  }

  function handleContactForm(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Create mailto link
    const mailtoLink = `mailto:${config.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;
  }

  // ============================================
  // RENDER FOOTER
  // ============================================
  function renderFooter() {
    const nameInitials = config.personal.name.en.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    document.getElementById('footer-logo-text').textContent = nameInitials;
    document.getElementById('footer-name').textContent = config.personal.name.en;
    document.getElementById('footer-tagline').textContent = config.personal.tagline;
    document.getElementById('footer-copyright-name').textContent = config.personal.name.en;
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Footer Social
    const footerSocial = document.getElementById('footer-social');
    footerSocial.innerHTML = config.contact.social.map(social => `
      <a href="${social.url}" target="_blank" rel="noopener noreferrer"
         class="social-link" aria-label="${social.name}">
        ${getSocialIcon(social.icon)}
      </a>
    `).join('');
  }

  // ============================================
  // SOCIAL ICONS HELPER
  // ============================================
  function getSocialIcon(iconName) {
    const icons = {
      github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
      linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
      twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>',
      instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
      facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'
    };

    return icons[iconName] || icons.github;
  }

  // ============================================
  // INTERACTIONS
  // ============================================
  function initInteractions() {
    initThemeToggle();
    initMobileNav();
    initSmoothScroll();
    initBackToTop();
    initProjectFilters();
    initHeaderScroll();
  }

  // Theme Toggle
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    function updateThemeIcon() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    updateThemeIcon();

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem(THEME_KEY, newTheme);
      updateThemeIcon();
    });
  }

  // Mobile Navigation
  function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nav');

    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }

  // Smooth Scroll & Active Navigation
  function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          const headerOffset = 80;
          const elementPosition = targetSection.offsetTop;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Update active navigation on scroll
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // Back to Top Button
  function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Project Filters
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-categories').includes(filter)) {
            card.style.display = 'flex';
            setTimeout(() => card.style.opacity = '1', 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => card.style.display = 'none', 300);
          }
        });
      });
    });
  }

  // Header Scroll Effect
  function initHeaderScroll() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ============================================
  // PARTICLES BACKGROUND
  // ============================================
  function initParticles() {
    if (typeof particlesJS === 'undefined' || !config.settings.features.enableParticles) {
      return;
    }

    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: config.settings.theme.primaryColor },
        shape: { type: 'circle' },
        opacity: {
          value: 0.5,
          random: false,
          anim: { enable: false }
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: false }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: config.settings.theme.primaryColor,
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

})();
