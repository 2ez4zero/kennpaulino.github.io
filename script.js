// =========================
// SCROLL ANIMATIONS
// =========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// =========================
// STAGGERED ANIMATIONS
// =========================
const staggerItems = document.querySelectorAll(
  '.skills-grid .skill-card, .projects-grid .project-card, .exp-list .exp-item'
);

staggerItems.forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});


// =========================
// NAV ACTIVE ON SCROLL
// =========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color =
      link.getAttribute('href') === `#${current}`
        ? 'var(--accent)'
        : '';
  });
});


// =========================
// EMAILJS FORM SUBMIT
// =========================
function handleSubmit() {
  const btn = document.querySelector('.form-submit');

  const params = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  emailjs.send(
    "service_fxah156",
    "template_scdswb8",
    params
  )
  .then(() => {
    btn.textContent = "Message Sent! ✓";
    btn.style.background = "rgba(79,255,164,0.2)";
    btn.style.color = "var(--accent)";
    btn.style.border = "1px solid rgba(79,255,164,0.4)";

    // reset form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";

    setTimeout(() => {
      btn.textContent = "Send Message →";
      btn.style.background = "";
      btn.style.color = "";
      btn.style.border = "";
    }, 3000);
  })
  .catch((error) => {
    console.error("Email send failed:", error);
    alert("Failed to send message. Try again.");
  });
}


// =========================
// SLIDESHOW CONTROL
// =========================
function changeSlide(button, direction) {
  const slideshow = button.parentElement;
  const slides = slideshow.querySelectorAll('.slide');

  let currentIndex = 0;

  slides.forEach((slide, index) => {
    if (slide.classList.contains('active')) {
      currentIndex = index;
      slide.classList.remove('active');
    }
  });

  let newIndex = currentIndex + direction;

  if (newIndex >= slides.length) newIndex = 0;
  if (newIndex < 0) newIndex = slides.length - 1;

  slides[newIndex].classList.add('active');
}