/* ==========================================================
   Portfolio — Main Interactions
   Handles cursor movement, scroll state, reveal animations,
   project hover effects, and contact form submission.
   ========================================================== */

// Cursor glow effect
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0;
let my = 0;
let rx = 0;
let ry = 0;

if (cursor && ring) {
  document.addEventListener('mousemove', (event) => {
    mx = event.clientX;
    my = event.clientY;
    cursor.style.left = `${mx - 6}px`;
    cursor.style.top = `${my - 6}px`;
  });

  function animateRing() {
    rx += (mx - rx - 20) * .12;
    ry += (my - ry - 20) * .12;
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
    requestAnimationFrame(animateRing);
  }

  animateRing();

  document.querySelectorAll('a, button, .btn, .project-card, .contact-channel, .skill-item').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      ring.style.width = '60px';
      ring.style.height = '60px';
      ring.style.borderColor = 'rgba(255,255,255,.5)';
      cursor.style.transform = 'scale(0)';
    });

    element.addEventListener('mouseleave', () => {
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderColor = 'rgba(255,255,255,.3)';
      cursor.style.transform = 'scale(1)';
    });
  });
}

// Navbar scroll state
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// Reveal-on-scroll observer
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealElements.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: .12 });

  revealElements.forEach((element) => observer.observe(element));
}

// Project card glow effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    card.style.setProperty('--mx', `${event.offsetX}px`);
    card.style.setProperty('--my', `${event.offsetY}px`);
  });
});

// Contact form submit handling
function handleFormSubmit(event) {
  event.preventDefault();

  const button = document.getElementById('submitBtn');
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmsg').value.trim();

  if (!name || !email || !message) {
    if (button) {
      button.textContent = 'Fill all fields';
      setTimeout(() => {
        button.textContent = 'Send message →';
      }, 2000);
    }
    return;
  }

  if (button) {
    button.textContent = 'Opening mail client…';
  }

  window.location.href = `mailto:shrutishejul30@gmail.com?subject=${encodeURIComponent(`Portfolio Contact from ${name}`)}&body=${encodeURIComponent(`${message}\n\nFrom: ${email}`)}`;

  setTimeout(() => {
    if (button) {
      button.textContent = 'Send message →';
    }
  }, 3000);
}

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

// Resume PDF links should open safely in a new tab.
async function openResumeLink(event) {
  const link = event.currentTarget;
  event.preventDefault();

  if (location.protocol === 'file:') {
    window.open(link.href, '_blank', 'noopener,noreferrer');
    return;
  }

  try {
    const response = await fetch(link.href, { method: 'HEAD', cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Resume PDF not found');
    }
    window.open(link.href, '_blank', 'noopener,noreferrer');
  } catch (error) {
    window.alert('Resume PDF could not be opened. Please make sure assets/resume/resume.pdf exists in the project.');
  }
}

document.querySelectorAll('a[data-resume-link]').forEach((link) => {
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.addEventListener('click', openResumeLink);
});
