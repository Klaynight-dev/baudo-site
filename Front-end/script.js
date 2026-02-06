    const DISCORD_AUTH_WORKER = "https://discord-auth.votre-nom.workers.dev";
    const DISCORD_WORKER_SECRET = "votre_secret_worker";
    // ============================
    // LOADING SCREEN
    // ============================
    
    // Empêche la restauration automatique du scroll
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.addEventListener('load', () => {
      // Force le scroll en haut au chargement
      window.scrollTo(0, 0);

      setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
      }, 500);
    });

    // ============================
    // NAVIGATION SCROLL EFFECT
    // ============================
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
    // ============================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          const offsetTop = target.offsetTop - 80; // Offset pour la nav fixe
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // ============================
    // SCROLL REVEAL ANIMATION
    // ============================
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;

      scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('revealed');
        }
      });
    };

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // ============================
    // YOUTUBE SUBSCRIBER COUNT
    // ============================
    async function updateSubCount() {
      const subCountElement = document.getElementById('subCount');
      
      try {
        // Utilisation de l'API avec URL complète
        const response = await fetch('https://baudo.fr/api/subscribers');
        const data = await response.json();
        
        if (data.subscriberCount) {
          animateNumber(subCountElement, 0, data.subscriberCount, 2000);
        } else {
          subCountElement.textContent = '60K+';
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des abonnés:', error);
        // Fallback: afficher une valeur statique
        subCountElement.textContent = '60K+';
      }
    }

    // ============================
    // ANIMATE NUMBER (pour les stats)
    // ============================
    function animateNumber(element, start, end, duration) {
      const startTime = performance.now();
      
      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (end - start) * easeOut);
        
        element.textContent = formatNumber(current);
        
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      
      requestAnimationFrame(update);
    }

    // ============================
    // FORMAT NUMBER (pour affichage)
    // ============================
    function formatNumber(num) {
      if (num >= 1_000_000) {
        return Math.floor(num / 1_000_000) + 'M';
      }

      if (num >= 1_000) {
        return Math.floor(num / 1_000) + 'k';
      }

      return num.toString();
    }

    // ============================
    // MOBILE MENU (pour version mobile)
    // ============================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
      });

      // Fermer le menu au clic sur un lien
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          mobileMenuBtn.textContent = '☰';
        });
      });
    }

    // ============================
    // PARALLAX EFFECT ON HERO
    // ============================
    const hero = document.querySelector('.hero');
    const profileWrapper = document.querySelector('.profile-image-wrapper');

    if (hero && profileWrapper) {
      window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        
        profileWrapper.style.transform = `translateY(-20px) translateX(${moveX}px) translateY(${moveY}px)`;
      });
    }

    // ============================
    // TYPING EFFECT FOR HERO SUBTITLE
    // ============================
    function typeWriter(element, text, speed = 100) {
      let i = 0;
      element.textContent = '';
      
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, speed);
        }
      }
      
      type();
    }

    // Optionnel: activer l'effet typing au chargement
    // const heroSubtitle = document.querySelector('.hero-subtitle');
    // if (heroSubtitle) {
    //   const originalText = heroSubtitle.textContent;
    //   typeWriter(heroSubtitle, originalText, 80);
    // }

    // ============================
    // CARD TILT EFFECT (3D hover)
    // ============================
    const cards = document.querySelectorAll('.game-card, .social-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });


    // ============================
    // NAVIGATION MOBILE
    // ============================
    function initMobileMenu() {
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const navLinks = document.querySelector('.nav-links');
      const navLinksItems = document.querySelectorAll('.nav-links a');

      if (!mobileMenuBtn || !navLinks) return;

      // Toggle menu mobile
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        mobileMenuBtn.classList.toggle('active');
        
        // Changer l'icône
        if (navLinks.classList.contains('mobile-active')) {
          mobileMenuBtn.textContent = '✕';
          document.body.style.overflow = 'hidden';
        } else {
          mobileMenuBtn.textContent = '☰';
          document.body.style.overflow = '';
        }
      });

      // Fermer le menu quand on clique sur un lien
      navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('mobile-active');
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.textContent = '☰';
          document.body.style.overflow = '';
        });
      });

      // Fermer le menu au scroll
      let lastScroll = 0;
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (Math.abs(currentScroll - lastScroll) > 50 && navLinks.classList.contains('mobile-active')) {
          navLinks.classList.remove('mobile-active');
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.textContent = '☰';
          document.body.style.overflow = '';
        }
        
        lastScroll = currentScroll;
      });
    }

    // ============================
    // SMOOTH SCROLL POUR LES ANCRES
    // ============================
    function initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          
          // Ignore les liens vides ou juste "#"
          if (!href || href === '#') return;
          
          e.preventDefault();
          
          const target = document.querySelector(href);
          if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }

    // ============================
    // INTERSECTION OBSERVER FOR STATS ANIMATION
    // ============================
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          
          statNumbers.forEach(stat => {
            const text = stat.textContent;
            if (text === '...' || !stat.dataset.animated) {
              stat.dataset.animated = 'true';
              
              // Pour le compteur d'abonnés
              if (stat.id === 'subCount') {
                updateSubCount();
              }
            }
          });
          
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
      statsObserver.observe(statsContainer);
    }

    // ============================
    // LAZY LOADING IMAGES
    // ============================
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    // ============================
    // PREVENT RIGHT CLICK ON IMAGES (protection)
    // ============================
    document.addEventListener('contextmenu', (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    });

    // ============================
    // PERFORMANCE MONITORING (optionnel)
    // ============================
    if ('PerformanceObserver' in window) {
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.renderTime || entry.loadTime);
          }
        }
      });
      
      perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // ============================
    // THEME TOGGLE (optionnel - mode clair/sombre)
    // ============================
    function initThemeToggle() {
      const themeToggle = document.getElementById('theme-toggle');
      if (!themeToggle) return;

      const currentTheme = localStorage.getItem('theme') || 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);

      themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }

    // Appeler au chargement si vous ajoutez un bouton de thème
    // initThemeToggle();

    // ============================
    // INITIALIZE ALL ON DOM READY
    // ============================
    document.addEventListener('DOMContentLoaded', () => {
      console.log('✅ Portfolio chargé avec succès!');
      
      // Lancer les animations initiales
      revealOnScroll();
      
      // Précharger les images importantes
      const criticalImages = document.querySelectorAll('.profile-image, .game-image');
      criticalImages.forEach(img => {
        if (img.complete) {
          img.classList.add('loaded');
        } else {
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
        }
      });
    });

    // ============================
    // SERVICE WORKER (PWA - optionnel)
    // ============================
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // Décommenter si vous voulez créer une PWA
        // navigator.serviceWorker.register('/sw.js')
        //   .then(registration => console.log('SW registered:', registration))
        //   .catch(error => console.log('SW registration failed:', error));
      });
    }

    // ============================
    // ANALYTICS (Google Analytics - optionnel)
    // ============================
    function trackEvent(category, action, label) {
      if (typeof gtag !== 'undefined') {
        gtag('event', action, {
          'event_category': category,
          'event_label': label
        });
      }
    }

      // Exemples d'utilisation:
      // trackEvent('Navigation', 'click', 'YouTube Button');
      // trackEvent('Games', 'view', 'Lethal Room');

      // ============================
      // EXPORT FUNCTIONS (si module)
      // ============================
      // export { updateSubCount, animateNumber, formatNumber, trackEvent };

      // ============================
      // FONCTIONS UTILITAIRES POUR GAME JAMS
      // ============================

      const gameJams = [
        // Exemple de structure d'une game jam
        //     {
        //       id: 1,
        //       name: "Ludum Dare 56",
        //       theme: "Tiny Creatures",
        //       description: "Créez un jeu complet en 72h autour du thème des créatures minuscules. Votez, jouez et partagez !",
        //       startDate: "2026-01-10T18:00:00",
        //       endDate: "2026-01-13T18:00:00",
        //       url: "https://ldjam.com",
        //       icon: "🕹️"
        //     },
        // ============================
      ];

      function getJamStatus(startDate, endDate) {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) return 'upcoming';
        if (now > end) return 'ended';
        return 'live';
      }

      function getStatusText(status) {
        const statusTexts = {
          live: '🔴 En cours',
          upcoming: '⏰ À venir',
          ended: '✓ Terminée'
        };
        return statusTexts[status] || status;
      }

      function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { 
          day: 'numeric', 
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        });
      }

      function calculateTimeRemaining(targetDate) {
        const now = new Date();
        const target = new Date(targetDate);
        const diff = target - now;

        if (diff <= 0) return null;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      }

      function calculateDuration(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffMs = end - start;
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHrs / 24);
        
        if (diffDays > 0) {
          const remainingHours = diffHrs % 24;
          return `${diffDays} jour${diffDays > 1 ? 's' : ''}${remainingHours > 0 ? ` ${remainingHours}h` : ''}`;
        }
        return `${diffHrs} heures`;
      }

      // ============================
      // CRÉATION DES CARTES
      // ============================
      
// Modifier la fonction createJamCard pour ajouter le bouton Discord
      function createJamCard(jam) {
        const status = getJamStatus(jam.startDate, jam.endDate);
        const isActive = status === 'live' || status === 'upcoming';
        const isUpcoming = status === 'upcoming';

        const card = document.createElement('div');
        card.className = 'gamejam-card';
        card.dataset.jamId = jam.id;

        const targetDate = status === 'live' ? jam.endDate : jam.startDate;
        const countdownLabel = status === 'live' ? 'Temps restant' : 'Commence dans';

        card.innerHTML = `
          <div class="jam-status ${status}">
            ${getStatusText(status)}
          </div>
          
          <div class="jam-header">
            <div class="jam-icon">${jam.icon}</div>
          </div>
          
          <div class="jam-content">
            <h3 class="jam-title">${jam.name}</h3>
            <p class="jam-theme">Thème : "${jam.theme}"</p>
            <p class="jam-description">${jam.description}</p>
            
            <div class="jam-dates">
              <div class="date-item">
                <span class="date-icon">🚀</span>
                <span>Début : ${formatDate(jam.startDate)}</span>
              </div>
              <div class="date-item">
                <span class="date-icon">🏁</span>
                <span>Fin : ${formatDate(jam.endDate)}</span>
              </div>
            </div>
            
            ${isActive ? `
              <div class="jam-countdown" data-target="${targetDate}">
                <div class="countdown-label">${countdownLabel}</div>
                <div class="countdown-timer">
                  <div class="countdown-unit">
                    <span class="countdown-value days">00</span>
                    <span class="countdown-unit-label">Jours</span>
                  </div>
                  <div class="countdown-unit">
                    <span class="countdown-value hours">00</span>
                    <span class="countdown-unit-label">Heures</span>
                  </div>
                  <div class="countdown-unit">
                    <span class="countdown-value minutes">00</span>
                    <span class="countdown-unit-label">Min</span>
                  </div>
                  <div class="countdown-unit">
                    <span class="countdown-value seconds">00</span>
                    <span class="countdown-unit-label">Sec</span>
                  </div>
                </div>
              </div>
            ` : ''}
            
            <div class="jam-actions">
              ${isUpcoming ? `
                <button class="jam-btn jam-btn-primary discord-register" onclick="loginWithDiscord(${jam.id})">
                  <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.svg" 
                      style="width: 20px; height: 20px; filter: brightness(0) invert(1);">
                  S'inscrire via Discord
                </button>
              ` : status === 'live' ? `
                <a href="${jam.url || '#'}" target="_blank" class="jam-btn jam-btn-primary" ${!jam.url ? 'onclick="return false;" style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                  🎮 Participer
                </a>
              ` : `
                <a href="${jam.url || '#'}" target="_blank" class="jam-btn jam-btn-primary" ${!jam.url ? 'onclick="return false;" style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                  👀 Voir les jeux
                </a>
              `}
              <button class="jam-btn jam-btn-secondary" onclick="openJamModal(${jam.id})">
                ℹ️ Infos
              </button>
            </div>
          </div>
        `;

        return card;
      }
      

      // Fonction pour se connecter avec Discord
      async function loginWithDiscord(jamId) {
        try {
          const response = await fetch(`${DISCORD_AUTH_WORKER}/auth/discord?jamId=${jamId}`);
          const data = await response.json();
          
          if (data.authUrl) {
            // Sauvegarder jamId dans localStorage pour le callback
            localStorage.setItem('pending_jam_registration', jamId);
            window.location.href = data.authUrl;
          }
        } catch (error) {
          console.error('Erreur lors de la connexion Discord:', error);
          alert('Erreur lors de la connexion à Discord');
        }
      }

      // Vérifier si l'utilisateur est inscrit à une jam
      async function checkJamRegistration(jamId) {
        const userData = JSON.parse(localStorage.getItem('discord_user') || '{}');
        
        if (!userData.id) return false;
        
        try {
          const response = await fetch(`${DISCORD_AUTH_WORKER}/check-registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jamId,
              userId: userData.id,
              secret: DISCORD_WORKER_SECRET
            })
          });
          
          const data = await response.json();
          return data.registered;
        } catch (error) {
          console.error('Erreur vérification inscription:', error);
          return false;
        }
      }

      // Gérer le retour de Discord
      function handleDiscordCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const registered = urlParams.get('registered');
        const jamId = urlParams.get('jamId');
        
        if (registered === 'true' && jamId) {
          // Afficher un message de succès
          showSuccessMessage(`✅ Inscription confirmée à la Game Jam #${jamId} !`);
          
          // Nettoyer l'URL
          window.history.replaceState({}, document.title, window.location.pathname);
          
          // Rafraîchir l'affichage des jams
          initGameJams();
        }
      }

      // Afficher un message de succès
      function showSuccessMessage(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          z-index: 10000;
          animation: slideIn 0.3s ease;
          font-weight: 600;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
          toast.style.animation = 'slideOut 0.3s ease';
          setTimeout(() => toast.remove(), 300);
        }, 3000);
      }
      // ============================
      // FONCTIONS MODAL
      // ============================
      function openJamModal(jamId) {
        const jam = gameJams.find(j => j.id === jamId);
        if (!jam) return;

        const modal = document.getElementById('jamModal');
        const modalBody = modal.querySelector('.jam-modal-body');
        
        const status = getJamStatus(jam.startDate, jam.endDate);
        const isActive = status === 'live' || status === 'upcoming';
        const targetDate = status === 'live' ? jam.endDate : jam.startDate;
        const countdownLabel = status === 'live' ? 'Temps restant' : 'Commence dans';

        modalBody.innerHTML = `
          <div class="jam-modal-header">
            <div class="jam-modal-status ${status}">
              ${getStatusText(status)}
            </div>
            <div class="jam-modal-icon">${jam.icon}</div>
          </div>
          
          <h2 class="jam-modal-title">${jam.name}</h2>
          <p class="jam-modal-theme">Thème : "${jam.theme}"</p>
          <p class="jam-modal-description">${jam.description}</p>
          
          <div class="jam-modal-info-grid">
            <div class="jam-info-item">
              <div class="jam-info-label">
                <span>🚀</span>
                <span>Date de début</span>
              </div>
              <div class="jam-info-value">${formatDate(jam.startDate)}</div>
            </div>
            
            <div class="jam-info-item">
              <div class="jam-info-label">
                <span>🏁</span>
                <span>Date de fin</span>
              </div>
              <div class="jam-info-value">${formatDate(jam.endDate)}</div>
            </div>
            
            <div class="jam-info-item">
              <div class="jam-info-label">
                <span>⏱️</span>
                <span>Durée</span>
              </div>
              <div class="jam-info-value">${calculateDuration(jam.startDate, jam.endDate)}</div>
            </div>
            
            <div class="jam-info-item">
              <div class="jam-info-label">
                <span>📊</span>
                <span>Statut</span>
              </div>
              <div class="jam-info-value">${getStatusText(status)}</div>
            </div>
          </div>
          
          ${isActive ? `
            <div class="jam-modal-countdown" data-target="${targetDate}">
              <div class="countdown-label">${countdownLabel}</div>
              <div class="countdown-timer">
                <div class="countdown-unit">
                  <span class="countdown-value days">00</span>
                  <span class="countdown-unit-label">Jours</span>
                </div>
                <div class="countdown-unit">
                  <span class="countdown-value hours">00</span>
                  <span class="countdown-unit-label">Heures</span>
                </div>
                <div class="countdown-unit">
                  <span class="countdown-value minutes">00</span>
                  <span class="countdown-unit-label">Minutes</span>
                </div>
                <div class="countdown-unit">
                  <span class="countdown-value seconds">00</span>
                  <span class="countdown-unit-label">Secondes</span>
                </div>
              </div>
            </div>
          ` : ''}
          
          <div class="jam-modal-actions">
            <a href="${jam.url || '#'}" target="_blank" class="jam-modal-btn jam-modal-btn-primary" ${!jam.url ? 'onclick="return false;" style="opacity: 0.5; cursor: not-allowed;"' : ''}>
              ${status === 'live' ? '🎮 Participer maintenant' : status === 'upcoming' ? '📅 S\'inscrire' : '👀 Voir les résultats'}
            </a>
            <button class="jam-modal-btn jam-modal-btn-secondary" onclick="closeJamModal()">
              ✕ Fermer
            </button>
          </div>
        `;

        modal.classList.add('active');
        document.body.classList.add('modal-open');

        // Mettre à jour le countdown du modal
        if (isActive) {
          updateCountdowns();
        }
      }

      function closeJamModal() {
        const modal = document.getElementById('jamModal');
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
      }

      // ============================
      // MISE À JOUR DES COUNTDOWNS
      // ============================
      function updateCountdowns() {
        // Sélectionner TOUS les countdowns (cartes + modal)
        const allCountdowns = document.querySelectorAll('.jam-countdown, .jam-modal-countdown');
        
        allCountdowns.forEach(countdown => {
          const targetDate = countdown.dataset.target;
          const timeRemaining = calculateTimeRemaining(targetDate);

          if (!timeRemaining) {
            countdown.innerHTML = '<div class="countdown-label">Terminé !</div>';
            return;
          }

          const daysEl = countdown.querySelector('.days');
          const hoursEl = countdown.querySelector('.hours');
          const minutesEl = countdown.querySelector('.minutes');
          const secondsEl = countdown.querySelector('.seconds');

          if (daysEl) daysEl.textContent = String(timeRemaining.days).padStart(2, '0');
          if (hoursEl) hoursEl.textContent = String(timeRemaining.hours).padStart(2, '0');
          if (minutesEl) minutesEl.textContent = String(timeRemaining.minutes).padStart(2, '0');
          if (secondsEl) secondsEl.textContent = String(timeRemaining.seconds).padStart(2, '0');
        });
      }

      // ============================
      // INITIALISATION
      // ============================
      // Modifier l'initialisation pour gérer le callback Discord
      function initGameJams() {
        const grid = document.getElementById('gamejamGrid');
        
        // Trier par statut (live > upcoming > ended) puis par date
        const sortedJams = gameJams.sort((a, b) => {
          const statusOrder = { live: 0, upcoming: 1, ended: 2 };
          const statusA = getJamStatus(a.startDate, a.endDate);
          const statusB = getJamStatus(b.startDate, b.endDate);
          
          if (statusA !== statusB) {
            return statusOrder[statusA] - statusOrder[statusB];
          }
          
          return new Date(a.startDate) - new Date(b.startDate);
        });

        if (sortedJams.length === 0) {
          grid.innerHTML = `
            <div class="empty-state">
              <div class="empty-icon">🎮</div>
              <p>Aucune game jam en cours pour le moment</p>
              <p style="margin-top: 0.5rem; font-size: 0.9rem;">Revenez bientôt pour découvrir les prochains événements !</p>
            </div>
          `;
          return;
        }

        // Vider la grille
        grid.innerHTML = '';

        // Créer les cartes
        sortedJams.forEach(jam => {
          grid.appendChild(createJamCard(jam));
        });

        // Lancer le countdown
        updateCountdowns();
        setInterval(updateCountdowns, 1000);
      }

      // ============================
      // INITIALISATION DE LA MODAL
      // ============================
      function initModal() {
        const modal = document.getElementById('jamModal');
        if (!modal) return;

        const overlay = modal.querySelector('.jam-modal-overlay');
        
        // Fermer avec l'overlay
        if (overlay) {
          overlay.addEventListener('click', closeJamModal);
        }
        
        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeJamModal();
          }
        });
      }

      // Modifier le DOMContentLoaded
      document.addEventListener('DOMContentLoaded', () => {
        handleDiscordCallback(); // Gérer le retour de Discord en premier
        initGameJams();
        initModal();
        initMobileMenu(); 
        initSmoothScroll(); 
      });
