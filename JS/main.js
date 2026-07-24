/* ==========================================================================
   AfriConnect Summit 2026 — main.js (JavaScript vanilla pur)
   Sommaire :
   1. Dark / Light mode (localStorage)
   2. Navbar (scroll + menu hamburger mobile)
   3. Animations au scroll (IntersectionObserver)
   4. Compte à rebours
   5. Compteurs animés (chiffres clés)
   6. Onglets du programme (3 jours)
   7. Filtrage dynamique des intervenants
   8. Validation du formulaire de contact
   9. Bouton retour en haut
   10. Année dynamique dans le footer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. DARK / LIGHT MODE ---------- */
  const themeToggleButtons = document.querySelectorAll('.theme-toggle');
  const root = document.documentElement;

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('africonnect-theme', theme);
    themeToggleButtons.forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    });
  };

  const savedTheme = localStorage.getItem('africonnect-theme') || 'light';
  applyTheme(savedTheme);

  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  /* ---------- 2. NAVBAR : scroll + hamburger mobile ---------- */
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');

  const handleScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navbar.classList.toggle('mobile-open');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
    });

    // Ferme le menu mobile après le clic d'un lien
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navbar.classList.remove('mobile-open');
      });
    });
  }

  /* ---------- 3. ANIMATIONS AU SCROLL (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-zoom, .reveal-left');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
  }

  /* ---------- 4. COMPTE À REBOURS ---------- */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    // Date fictive de la conférence : 15 octobre 2026, 09:00
    const targetDate = new Date('2026-10-15T09:00:00').getTime();

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        countdownEl.innerHTML = '<p class="hero-sub">L\'événement a commencé !</p>';
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }

  /* ---------- 5. COMPTEURS ANIMÉS (chiffres clés) ---------- */
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (counters.length) {
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1600;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value.toLocaleString('fr-FR') + (el.getAttribute('data-suffix') || '');
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('fr-FR') + (el.getAttribute('data-suffix') || '');
      };
      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

  /* ---------- 6. ONGLETS DU PROGRAMME ---------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  }

  /* ---------- 7. FILTRAGE DYNAMIQUE DES INTERVENANTS ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const speakerCards = document.querySelectorAll('.speaker-card[data-category]');
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.filter;
        speakerCards.forEach(card => {
          const match = category === 'tous' || card.dataset.category === category;
          card.classList.toggle('hidden', !match);
        });
      });
    });
  }

  /* ---------- 8. VALIDATION DU FORMULAIRE DE CONTACT ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const fields = {
      nom: { el: form.querySelector('#nom'), validate: (v) => v.trim().length >= 3, msg: 'Veuillez saisir votre nom complet (3 caractères min).' },
      email: { el: form.querySelector('#email'), validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Adresse email invalide.' },
      telephone: { el: form.querySelector('#telephone'), validate: (v) => v.replace(/\D/g, '').length >= 8, msg: 'Numéro de téléphone invalide (8 chiffres min).' },
      participation: { el: form.querySelector('#participation'), validate: (v) => v !== '', msg: 'Veuillez choisir un type de participation.' },
      pays: { el: form.querySelector('#pays'), validate: (v) => v !== '', msg: 'Veuillez sélectionner votre pays.' },
      message: { el: form.querySelector('#message'), validate: (v) => v.trim().length >= 20, msg: 'Votre message doit contenir au moins 20 caractères.' }
    };

    const validateField = (key) => {
      const field = fields[key];
      if (!field || !field.el) return true;
      const group = field.el.closest('.form-group');
      const errorEl = group.querySelector('.error-msg');
      const isValid = field.validate(field.el.value);

      group.classList.toggle('valid', isValid);
      group.classList.toggle('invalid', !isValid);
      if (errorEl) errorEl.textContent = isValid ? '' : field.msg;

      return isValid;
    };

    Object.keys(fields).forEach(key => {
      const field = fields[key];
      if (!field.el) return;
      field.el.addEventListener('input', () => validateField(key));
      field.el.addEventListener('blur', () => validateField(key));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let allValid = true;
      Object.keys(fields).forEach(key => {
        if (!validateField(key)) allValid = false;
      });

      const successMsg = document.getElementById('form-success');
      if (allValid) {
        successMsg.classList.add('show');
        successMsg.focus?.();
        form.reset();
        Object.keys(fields).forEach(key => {
          const group = fields[key].el?.closest('.form-group');
          if (group) group.classList.remove('valid', 'invalid');
        });
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      } else {
        successMsg.classList.remove('show');
      }
    });
  }

  /* ---------- 9. BOUTON RETOUR EN HAUT ---------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 10. ANNÉE DYNAMIQUE DANS LE FOOTER ---------- */
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});