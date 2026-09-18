function setActiveNav(pageId) {
  const navButtons = document.querySelectorAll('.nav-link');
  navButtons.forEach((button) => {
    const active = button.dataset.page === pageId;
    button.classList.toggle('text-nssr-blue', active);
    button.classList.toggle('active-nav', active);
    button.classList.toggle('text-gray-600', !active);
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  menu.classList.toggle('hidden');
}

async function loadSharedLayout() {
  const headerHost = document.getElementById('site-header');
  const footerHost = document.getElementById('site-footer');

  if (headerHost) {
    const headerResponse = await fetch('assets/includes/header.html');
    if (headerResponse.ok) {
      headerHost.innerHTML = await headerResponse.text();
    }
  }

  if (footerHost) {
    const footerResponse = await fetch('assets/includes/footer.html');
    if (footerResponse.ok) {
      footerHost.innerHTML = await footerResponse.text();
    }
  }

  const currentPage = document.body.dataset.page;
  if (currentPage) {
    setActiveNav(currentPage);
  }

  const menuButton = document.getElementById('mobile-menu-btn');
  if (menuButton) {
    menuButton.addEventListener('click', toggleMobileMenu);
  }

  const mobileLinks = document.querySelectorAll('#mobile-menu a[data-page]');
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('mobile-menu');
      if (menu && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
      }
    });
  });
}

function updateCountdowns() {
  const earlyDeadline = new Date('November 1, 2026 23:59:59').getTime();
  const regDeadline = new Date('November 20, 2026 23:59:59').getTime();
  const now = new Date().getTime();

  const earlyDist = earlyDeadline - now;
  const earlyEl = document.getElementById('early-days');
  const earlyHoursEl = document.getElementById('early-hours');
  const earlyMinsEl = document.getElementById('early-mins');
  const earlySecsEl = document.getElementById('early-secs');

  if (earlyEl && earlyDist > 0) {
    earlyEl.textContent = String(Math.floor(earlyDist / (1000 * 60 * 60 * 24))).padStart(2, '0');
    earlyHoursEl.textContent = String(Math.floor((earlyDist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    earlyMinsEl.textContent = String(Math.floor((earlyDist % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    earlySecsEl.textContent = String(Math.floor((earlyDist % (1000 * 60)) / 1000)).padStart(2, '0');
  } else if (document.getElementById('countdown-early')) {
    document.getElementById('countdown-early').innerHTML = '<div class="text-xs font-semibold text-red-600 py-2">Early-Bird Deadline Passed</div>';
  }

  const regDist = regDeadline - now;
  const regDays = document.getElementById('reg-days');
  const regHours = document.getElementById('reg-hours');
  const regMins = document.getElementById('reg-mins');
  const regSecs = document.getElementById('reg-secs');

  if (regDays && regDist > 0) {
    regDays.textContent = String(Math.floor(regDist / (1000 * 60 * 60 * 24))).padStart(2, '0');
    regHours.textContent = String(Math.floor((regDist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    regMins.textContent = String(Math.floor((regDist % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    regSecs.textContent = String(Math.floor((regDist % (1000 * 60)) / 1000)).padStart(2, '0');
  } else if (document.getElementById('countdown-regular')) {
    document.getElementById('countdown-regular').innerHTML = '<div class="text-xs font-semibold text-red-600 py-2">Registration Closed</div>';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadSharedLayout();

  if (document.getElementById('countdown-early') || document.getElementById('countdown-regular')) {
    setInterval(updateCountdowns, 1000);
    updateCountdowns();
  }
});
