/* ── TYPEWRITER ─────────────────────────────────────── */
const twTexts = [
  "Software Developer",
  "Full Stack Developer",
  "Database Enthusiast",
  "Backend Engineer",
  "Flask Engineer",
  "API Builder",
  "Python Specialist",
  "Problem Solver",
];
let twIdx = 0, twChar = 0, twDeleting = false;
const twEl = document.getElementById("typewriter");

function typewrite() {
  const text = twTexts[twIdx];
  twEl.textContent = twDeleting
    ? text.substring(0, twChar--)
    : text.substring(0, twChar++);

  if (!twDeleting && twChar > text.length) {
    twDeleting = true;
    setTimeout(typewrite, 2200);
    return;
  }
  if (twDeleting && twChar < 0) {
    twDeleting = false;
    twIdx = (twIdx + 1) % twTexts.length;
    setTimeout(typewrite, 380);
    return;
  }
  setTimeout(typewrite, twDeleting ? 55 : 95);
}
typewrite();

/* ── PARTICLES CANVAS ───────────────────────────────── */
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const isMobile = () => window.innerWidth < 768;
const particleCount = () => (isMobile() ? 30 : 60);

let particles = [];

function buildParticles() {
  const count = particleCount();
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.8 + 0.5,
    o: Math.random() * 0.45 + 0.08,
  }));
}
buildParticles();
window.addEventListener("resize", buildParticles);

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(124,58,237,${p.o})`;
    ctx.fill();
  });

  const maxDist = isMobile() ? 80 : 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < maxDist) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(124,58,237,${0.12 * (1 - d / maxDist)})`;
        ctx.lineWidth = 0.7;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ── NAVBAR SCROLL & ACTIVE LINK ────────────────────── */
const navbar = document.getElementById("navbar");
const navLinkEls = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

function onScroll() {
  navbar.classList.toggle("scrolled", window.scrollY > 30);

  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navLinkEls.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });

/* ── HAMBURGER MENU ─────────────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navLinksEl = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinksEl.classList.toggle("open");
});

navLinksEl.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinksEl.classList.remove("open");
  });
});

/* ── SCROLL REVEAL ──────────────────────────────────── */
const revealObs = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

/* ── COUNTER ANIMATION ──────────────────────────────── */
function animateCount(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 45));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 38);
}

const statsObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll(".stat-num").forEach(animateCount);
        statsObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.35 }
);
document.querySelectorAll(".about-stats").forEach((el) => statsObs.observe(el));

/* ── THEME TOGGLE ───────────────────────────────────── */
const themeBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  themeBtn.innerHTML =
    theme === "light"
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
  localStorage.setItem("theme", theme);
}

applyTheme(localStorage.getItem("theme") || "dark");

themeBtn.addEventListener("click", () => {
  const isLight = document.body.classList.contains("light");
  applyTheme(isLight ? "dark" : "light");
});

/* ── SKILL ICON MAP ─────────────────────────────────── */
const ICONS = {
  Python: "🐍",
  Flask: "⚗️",
  HTML: "🌐",
  CSS: "🎨",
  Java: "☕",
  "GIT/GITHUB": "🔀",
  "SQL Alchemy": "🗄️",
  "REST API": "🔌",
  JavaScript: "⚡",
  PostgreSQL: "🐘",
  MySQL: "🐬",
  Docker: "🐳",
  Redis: "🔴",
  React: "⚛️",
  TypeScript: "📘",
};

/* ── FETCH DATA & RENDER ────────────────────────────── */
fetch("/api/data")
  .then((r) => r.json())
  .then((data) => {
    /* Skills */
    const skillsList = document.getElementById("skills-list");
    data.skills.forEach((skill, i) => {
      const card = document.createElement("div");
      card.className = "skill-card";
      card.style.transitionDelay = `${i * 70}ms`;
      card.innerHTML = `<span class="skill-icon">${ICONS[skill] || "💻"}</span><span class="skill-name">${skill}</span>`;
      skillsList.appendChild(card);
    });

    const skillObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll(".skill-card").forEach((c) => c.classList.add("visible"));
        });
      },
      { threshold: 0.1 }
    );
    skillObs.observe(skillsList);

    /* Projects */
    const projectsList = document.getElementById("projects-list");
    data.projects.forEach((proj, i) => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.style.transitionDelay = `${i * 90}ms`;

      const tags = (proj.tags || []).map((t) => `<span class="project-tag">${t}</span>`).join("");
      const ghLink = proj.github
        ? `<a href="${proj.github}" target="_blank" class="project-link" title="GitHub"><i class="fab fa-github"></i></a>`
        : "";
      const liveLink = proj.live
        ? `<a href="${proj.live}" target="_blank" class="project-link" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>`
        : "";

      card.innerHTML = `
        <div class="project-header">
          <div class="project-icon"><i class="fas fa-code"></i></div>
          <div class="project-links">${ghLink}${liveLink}</div>
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        ${tags ? `<div class="project-tags">${tags}</div>` : ""}
      `;
      projectsList.appendChild(card);
    });

    const projObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll(".project-card").forEach((c) => c.classList.add("visible"));
        });
      },
      { threshold: 0.08 }
    );
    projObs.observe(projectsList);
  })
  .catch((err) => console.error("Data fetch error:", err));

/* ── CONTACT FORM ───────────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

emailjs.init(EMAILJS_PUBLIC_KEY);

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const status = document.getElementById("form-status");
  const btn = this.querySelector("button[type='submit']");

  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name:  document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    message:    document.getElementById("message").value,
  })
    .then(() => {
      status.textContent = "✓ Message sent! I'll get back to you soon.";
      status.className = "form-status success";
      this.reset();
    })
    .catch(() => {
      status.textContent = "✗ Failed to send. Please try again.";
      status.className = "form-status error";
    })
    .finally(() => {
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    });
});
