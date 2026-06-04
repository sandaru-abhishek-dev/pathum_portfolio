/* ============================================================
   PATHUM DILSHAN – PORTFOLIO  |  script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll behaviour ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Mobile hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  /* Close nav on link click (mobile) */
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });

  /* ── Intersection Observer – fade-in elements ── */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          /* stagger siblings inside the same parent */
          const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
          let delay = 0;
          siblings.forEach((sib, idx) => {
            if (sib === entry.target) delay = idx * 100;
          });
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  fadeEls.forEach(el => observer.observe(el));

  /* ── Active nav link highlight on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}`
        ? 'var(--gold-light)'
        : '';
    });
  }, { passive: true });

  /* ── Typing animation for hero tagline ── */
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.opacity = '1';
    tagline.style.transform = 'none';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        tagline.textContent += text[i++];
        setTimeout(typeChar, 60);
      }
    }
    setTimeout(typeChar, 1200);
  }

  /* ── Parallax tilt on hero photo ── */
  const heroPhoto = document.querySelector('.hero-photo-ring');
  document.addEventListener('mousemove', (e) => {
    if (!heroPhoto) return;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    heroPhoto.style.transform = `translate(${dx * 8}px, ${dy * 6}px)`;
  });

  /* ── Smooth reveal for achievement items on scroll ── */
  document.querySelectorAll('.achievement-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });

  /* ── Gallery lightbox (simple) ── */
  const galleryItems = document.querySelectorAll('.gallery-inner img');
  
  /* Create lightbox overlay */
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.style.cssText = `
    position:fixed; inset:0; z-index:999;
    background:rgba(43,33,24,0.95);
    display:none; align-items:center; justify-content:center;
    cursor:zoom-out;
    backdrop-filter: blur(6px);
  `;
  const lbImg = document.createElement('img');
  lbImg.style.cssText = `
    max-width:90vw; max-height:90vh;
    border-radius:2px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.6);
    transform:scale(0.85); opacity:0;
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
  `;
  const lbClose = document.createElement('button');
  lbClose.textContent = '✕';
  lbClose.style.cssText = `
    position:absolute; top:24px; right:32px;
    background:none; border:none; color:#f5f0e8;
    font-size:1.5rem; cursor:pointer; opacity:0.7;
    transition: opacity 0.2s;
  `;
  lbClose.onmouseenter = () => lbClose.style.opacity = '1';
  lbClose.onmouseleave = () => lbClose.style.opacity = '0.7';

  lb.appendChild(lbImg);
  lb.appendChild(lbClose);
  document.body.appendChild(lb);

  function openLightbox(src) {
    lb.style.display = 'flex';
    lbImg.src = src;
    setTimeout(() => {
      lbImg.style.transform = 'scale(1)';
      lbImg.style.opacity   = '1';
    }, 20);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lbImg.style.transform = 'scale(0.85)';
    lbImg.style.opacity   = '0';
    setTimeout(() => {
      lb.style.display = 'none';
      document.body.style.overflow = '';
    }, 350);
  }

  galleryItems.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src));
  });
  lb.addEventListener('click', e => { if (e.target !== lbImg) closeLightbox(); });
  lbClose.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ── Subtle particle dots in hero ── */
  const hero = document.getElementById('hero');
  for (let i = 0; i < 22; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 3 + 1;
    dot.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      border-radius:50%;
      background: rgba(200,151,58,${Math.random() * 0.35 + 0.05});
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      pointer-events:none;
      animation: floatDot ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 4}s infinite alternate;
    `;
    hero.appendChild(dot);
  }

  /* Inject keyframe for floatDot */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatDot {
      from { transform: translate(0, 0); opacity: 0.4; }
      to   { transform: translate(${Math.round(Math.random()*40-20)}px, ${Math.round(Math.random()*40-20)}px); opacity: 0.9; }
    }
  `;
  document.head.appendChild(style);

  /* ── Stat counter animation ── */
  const statCards = document.querySelectorAll('.stat-card');
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'none';
        entry.target.offsetHeight; /* reflow */
        entry.target.style.animation = 'statPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards';
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(card => statObserver.observe(card));

  /* Inject statPop keyframe */
  const style2 = document.createElement('style');
  style2.textContent = `
    @keyframes statPop {
      from { transform: scale(0.8); opacity: 0.3; }
      to   { transform: scale(1);   opacity: 1; }
    }
  `;
  document.head.appendChild(style2);

  /* ── Scroll progress bar ── */
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:2px; width:0%;
    background: linear-gradient(to right, var(--gold), var(--tan));
    z-index:200; transition:width 0.1s linear;
  `;
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.body.scrollHeight - window.innerHeight;
    bar.style.width = `${(scrolled / total) * 100}%`;
  }, { passive: true });

  console.log('%cPathum Dilshan Portfolio', 'color:#c8973a; font-family:Georgia; font-size:1.2rem; font-weight:bold;');
  console.log('%cBSc Applied Science | Rajarata University of Sri Lanka', 'color:#8b6340; font-size:0.85rem;');
})();
