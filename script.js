// ═══════════════════════════════════════════════════════════
//  JEISSON ROJAS · DATA ANALYST PORTFOLIO — script.js
// ═══════════════════════════════════════════════════════════

/* ─── NAVBAR scroll effect ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ─── MOBILE NAV TOGGLE ─── */
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── REVEAL ON SCROLL ─── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ─── SKILL BARS animate on scroll ─── */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const target = fill.style.width;
      fill.style.width = '0';
      setTimeout(() => { fill.style.width = target; }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });
skillFills.forEach(f => skillObserver.observe(f));

/* ─── COUNTER ANIMATION ─── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    let val = Math.round(eased * target);
    if (target >= 1000) {
      // Display as K
      el.textContent = (val >= 1000) ? Math.round(val / 1000) + 'K' + suffix : val;
    } else {
      el.textContent = val + suffix;
    }
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = (target >= 1000) ? Math.round(target / 1000) + 'K' + suffix : target + suffix;
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat-n[data-target]').forEach(el => counterObserver.observe(el));

/* ─── PROJECT SWITCHER ─── */
const pIndexBtns = document.querySelectorAll('.pindex-btn');
const pDetails = document.querySelectorAll('.project-detail');

pIndexBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.project;
    pIndexBtns.forEach(b => b.classList.remove('active'));
    pDetails.forEach(d => d.classList.remove('active'));
    btn.classList.add('active');
    const targetEl = document.getElementById(target);
    if (targetEl) {
      targetEl.classList.add('active');
      // Animate skill bars inside that project
      targetEl.querySelectorAll('.skill-fill').forEach(f => {
        const w = f.style.width;
        f.style.width = '0';
        setTimeout(() => { f.style.width = w; }, 100);
      });
    }
  });
});

/* ─── LIGHTBOX ─── */
function openLightbox(img) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

/* ─── ACTIVE NAV LINK on scroll ─── */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinksAll.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});

/* ─── GROWTH BARS animate on scroll ─── */
const growthBars = document.querySelectorAll('.gv-bar');
const growthObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.gv-bar');
      bars.forEach((bar, i) => {
        const targetH = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => { bar.style.height = targetH; }, 100 + i * 120);
      });
      growthObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.gv-bars').forEach(el => growthObserver.observe(el));
