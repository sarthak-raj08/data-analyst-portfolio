/* ============================================
   SARTHAK RAJ — DATA ANALYST PORTFOLIO
   script.js — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CUSTOM CURSOR ── */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
  });

  // Smooth cursor follow
  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.transform = `translate(${cx - 18}px, ${cy - 18}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor scale on hover
  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform += ' scale(1.6)';
      cursor.style.background = 'rgba(0,255,163,0.08)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.background = 'transparent';
    });
  });


  /* ── NAV SCROLL EFFECT ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });


  /* ── REVEAL ON SCROLL ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${i * 0.07}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));




  /* ── SKILL BAR ANIMATION ── */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.classList.add('animate');
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) skillObserver.observe(skillsGrid);


  /* ── SMOOTH ACTIVE NAV LINK ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--accent)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => sectionObserver.observe(s));


  /* ── CONTACT FORM ── */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        btn.textContent = 'Send Message ✦';
        btn.disabled = false;
        formSuccess.classList.add('show');
        setTimeout(() => formSuccess.classList.remove('show'), 4000);
      }, 1200);
    });
  }


  /* ── STAGGERED HERO TITLE REVEAL ── */
  const heroLines = document.querySelectorAll('.hero-title .line');
  heroLines.forEach((line, i) => {
    line.style.opacity    = '0';
    line.style.transform  = 'translateY(20px)';
    line.style.transition = `opacity 0.7s ease ${0.1 + i * 0.15}s, transform 0.7s ease ${0.1 + i * 0.15}s`;
    setTimeout(() => {
      line.style.opacity   = '1';
      line.style.transform = 'translateY(0)';
    }, 100);
  });


  /* ── TILT EFFECT ON CARDS ── */
  document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx_val = rect.width  / 2;
      const cy_val = rect.height / 2;
      const tiltX  = ((y - cy_val) / cy_val) * 5;
      const tiltY  = ((x - cx_val) / cx_val) * -5;
      card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  /* ── TYPEWRITER FOR HERO TAG ── */
  const heroTag  = document.querySelector('.hero-tag');
  if (heroTag) {
    const original  = heroTag.textContent.trim();
    const prefix    = '01 / ';
    const words     = ['Data Analyst', 'SQL Expert', 'BI Developer', 'Data Storyteller'];
    let wordIndex   = 0;
    let charIndex   = 0;
    let isDeleting  = false;
    heroTag.innerHTML = `<span class="mono">01 /</span> <span id="typeSpan"></span>`;
    const typeSpan  = document.getElementById('typeSpan');

    function type() {
      const word    = words[wordIndex];
      const current = isDeleting
        ? word.substring(0, charIndex - 1)
        : word.substring(0, charIndex + 1);
      typeSpan.textContent = current;
      charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

      let speed = isDeleting ? 60 : 90;

      if (!isDeleting && current === word) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && current === '') {
        isDeleting  = false;
        wordIndex   = (wordIndex + 1) % words.length;
        speed       = 300;
      }
      setTimeout(type, speed);
    }
    setTimeout(type, 1500);
  }


  /* ── PARALLAX ORBS ── */
  window.addEventListener('mousemove', e => {
    const xFrac = (e.clientX / window.innerWidth  - 0.5) * 20;
    const yFrac = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelector('.orb1').style.transform = `translate(${xFrac}px, ${yFrac}px)`;
    document.querySelector('.orb2').style.transform = `translate(${-xFrac}px, ${-yFrac}px)`;
  });

  console.log('%cSarthak Raj — Portfolio', 'font-size:1.2rem;color:#00ffa3;font-weight:bold;');
  console.log('%cData Analyst | Python · SQL · Power BI', 'color:#8892a4');
});
