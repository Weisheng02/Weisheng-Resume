
/* Main JS for Portfolio */
(function () {
  const root = document.documentElement;
  const body = document.body;
  const sections = Array.from(document.querySelectorAll('.section'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const siteNav = document.querySelector('.site-nav');
  const navToggle = document.querySelector('.nav-toggle');
  const themeToggle = document.querySelector('.theme-toggle');
  const header = document.querySelector('.site-header');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Theme
  const THEME_KEY = 'ws-theme';
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  themeToggle?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
  });

  // Mobile nav
  navToggle?.addEventListener('click', () => {
    const expanded = siteNav.getAttribute('aria-expanded') === 'true';
    siteNav.setAttribute('aria-expanded', String(!expanded));
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });

  // SPA-like section switching with hash
  function activateSection(id) {
    const target = sections.find((s) => s.id === id);
    if (!target) return;

    // Highlight nav item only; do not hide other sections
    navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('data-section') === id));

    // Close mobile menu on navigation
    siteNav.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-expanded', 'false');

    // Defer scroll to target for smoother UX
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // If navigating to resume, try to embed PDF
    if (id === 'resume') maybeLoadResume();

    // Animate meters when visiting skills
    if (id === 'skills') animateMeters();
  }

  function handleHashChange() {
    const hash = location.hash.replace('#', '') || 'home';
    activateSection(hash);
  }

  window.addEventListener('hashchange', handleHashChange);
  // Bind nav links
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('data-section');
      if (!id) return;
      // Use hash navigation to enable deep-linking and smooth scroll
      if (location.hash !== `#${id}`) {
        e.preventDefault();
        history.pushState({}, '', `#${id}`);
        handleHashChange();
      } else {
        e.preventDefault();
        activateSection(id);
      }
    });
  });

  // Reveal on scroll (IntersectionObserver)
  const revealTargets = document.querySelectorAll('.reveal, .reveal-from-bottom');
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add(entry.target.classList.contains('reveal-from-bottom') ? 'reveal-from-bottom--visible' : 'reveal--visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1 });
  revealTargets.forEach((el) => io.observe(el));

  // Parallax shapes
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  function updateParallax() {
    const scrolled = window.scrollY;
    parallaxEls.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-speed') || '0.2');
      el.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
  }
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();

  // Sticky header shadow on scroll
  function updateHeaderState() {
    if (!header) return;
    const stuck = window.scrollY > 8;
    header.classList.toggle('is-stuck', stuck);
  }
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  // Projects data & rendering
  const projects = [
    {
      id: 'p1',
      title: 'Performance Observability Platform',
      cover: 'Perf',
      description: 'Collect frontend performance and error data with dashboards and alerting.',
      tags: ['web', 'frontend', 'observability'],
      links: { demo: '#', github: '#' }
    },
    {
      id: 'p2',
      title: 'E‑commerce Mini‑app & Admin',
      cover: 'E-Commerce',
      description: 'End‑to‑end modules for products, orders, payments, inventory, and support.',
      tags: ['web', 'frontend', 'backend'],
      links: { demo: '#', github: '#' }
    },
    {
      id: 'p3',
      title: 'Recommendation System Experiments',
      cover: 'Recsys',
      description: 'Recall and ranking experiments using collaborative filtering and deep learning.',
      tags: ['ml', 'backend'],
      links: { demo: '#', github: '#' }
    },
    {
      id: 'p4',
      title: 'BFF Service Gateway',
      cover: 'Gateway',
      description: 'Aggregate downstream services with unified high‑performance APIs and caching.',
      tags: ['backend', 'web'],
      links: { demo: '#', github: '#' }
    },
    {
      id: 'p5',
      title: 'Design System & Component Library',
      cover: 'Design System',
      description: 'Unified visual guidelines and interactions for efficiency and consistency.',
      tags: ['frontend', 'web'],
      links: { demo: '#', github: '#' }
    },
    {
      id: 'p6',
      title: 'Knowledge Graph Visualization',
      cover: 'Graph',
      description: 'Explore relationships with layout optimization and large‑scale graph rendering.',
      tags: ['web', 'frontend'],
      links: { demo: '#', github: '#' }
    }
  ];

  const grid = document.getElementById('project-grid');
  const filterButtons = Array.from(document.querySelectorAll('.project-filters .chip'));
  function renderProjects(filter) {
    if (!grid) return;
    const data = projects.filter((p) => filter === 'all' || p.tags.includes(filter));
    grid.innerHTML = data.map((p) => {
      const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join('');
      return `
        <article class="card reveal">
          <div class="card-cover">${p.cover}</div>
          <div class="card-body">
            <h3 class="card-title">${p.title}</h3>
            <p class="card-text">${p.description}</p>
            <div class="card-tags">${tags}</div>
            <div class="card-actions">
              <a class="btn btn--primary" href="${p.links.demo}" target="_blank" rel="noreferrer noopener">Demo</a>
              <a class="btn btn--ghost" href="${p.links.github}" target="_blank" rel="noreferrer noopener">Code</a>
            </div>
          </div>
        </article>`;
    }).join('');

    // Rebind reveal for new elements
    grid.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  }
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('chip--active'));
      btn.classList.add('chip--active');
      const filter = btn.getAttribute('data-filter') || 'all';
      renderProjects(filter);
    });
  });
  renderProjects('all');

  // Resume embedding (if PDF exists)
  async function maybeLoadResume() {
    const iframeContainer = document.getElementById('resume-viewer');
    const downloadLink = document.getElementById('resume-download');
    if (!iframeContainer || !downloadLink) return;
    const href = downloadLink.getAttribute('href');
    if (!href) return;
    try {
      const res = await fetch(href, { method: 'HEAD' });
      if (res.ok) {
        iframeContainer.innerHTML = `<iframe title="Resume PDF" src="${href}"></iframe>`;
      } else {
        // keep fallback
      }
    } catch {
      // offline file URLs might block fetch; try direct embed as last resort
      iframeContainer.innerHTML = `<iframe title="Resume PDF" src="${href}"></iframe>`;
    }
  }

  // Skills meter animation
  function animateMeters() {
    document.querySelectorAll('.meter').forEach((bar) => {
      const level = Number(bar.getAttribute('data-level') || '0');
      const span = bar.querySelector('span');
      if (span) requestAnimationFrame(() => { span.style.width = level + '%'; });
    });
  }

  // Contact form (mailto)
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('name') || {}).value || '';
    const email = (document.getElementById('email') || {}).value || '';
    const message = (document.getElementById('message') || {}).value || '';
    const to = 'hello@example.com'; // TODO: replace with your email
    const subject = encodeURIComponent(`New message from ${name} (Portfolio)`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });

  // Initial route
  handleHashChange();

  // Scrollspy: highlight nav on scroll
  const observer = new IntersectionObserver((entries) => {
    let activeId = null;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeId = entry.target.id;
      }
    });
    if (activeId) {
      navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('data-section') === activeId));
    }
  }, { rootMargin: '-50% 0px -40% 0px', threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] });
  sections.forEach((s) => observer.observe(s));

  // Register service worker for PWA/offline
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    });
  }
})();

