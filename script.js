// ===== Projects data: edit this list to add or change projects =====
const projects = [
  {
    title: "Network Design and Implementation Using BGP",
    description:
      "A university network designed and tested in Cisco Packet Tracer: a Main Campus, an ISP and a Branch Campus, each in its own autonomous system (AS 65001, 65002, 65003) and exchanging routes with eBGP. An extended ACL lets the Branch reach the web server only over HTTP and HTTPS, and remote management is limited to the Staff LAN.",
    tech: ["Cisco Packet Tracer", "BGP / eBGP", "Extended ACL", "IP Subnetting"],
    links: [{ label: "View Report", url: "projects/bgp-network/BGP_Network_Report.pdf" }]
  },
  {
    title: "Smart Housing: Rental House Finder",
    description:
      "A Python desktop app that gathers rental listings in one place. Tenants can search by location, rent range, bedrooms and house type; landlords can add, update and delete listings. It includes availability status, a dashboard, input validation and CSV export, with data stored in SQLite.",
    tech: ["Python", "Tkinter", "SQLite"],
    links: [
      { label: "Source Code", url: "projects/smart-housing/smart_housing_system.py" },
      { label: "View Report", url: "projects/smart-housing/Smart_Housing_Report.pdf" }
    ]
  },
  {
    title: "Surprize: Gift & Surprise Planning Platform",
    description:
      "A group mini project (with Sangay Phuntsho and Yeshi Lhaden) for a platform that helps people plan surprise gifts and celebrations: browsing gift ideas, setting a budget, scheduling delivery and getting reminders. We produced the full system documentation: problem analysis, feasibility study, data flow diagrams, use case and ER diagrams, database normalization and user interface designs for eight screens.",
    tech: ["System Analysis & Design", "DFD & UML", "ERD & Normalization", "UI Design", "Agile"],
    links: [{ label: "View Documentation", url: "projects/surprize/Surprize_Project_Documentation.docx" }]
  },
  {
    title: "Personal Portfolio Website",
    description:
      "This responsive portfolio, built to present my skills, education, certificates and projects, with a dark/light theme toggle, mobile menu, scroll animations and my own background video with sound.",
    tech: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "Source Code", url: "https://github.com/YOUR-USERNAME/portfolio" }]
  }
];

// ===== Render projects =====
const grid = document.getElementById("projectGrid");
projects.forEach((p) => {
  const card = document.createElement("article");
  card.className = "card project reveal";
  const links = p.links
    .map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label} &rarr;</a>`)
    .join("");
  card.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <div class="tags">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
    <div class="links">${links}</div>`;
  grid.appendChild(card);
});

// ===== Theme toggle (remembered) =====
const themeBtn = document.getElementById("themeToggle");
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) {}
function syncThemeIcon() {
  themeBtn.innerHTML = root.getAttribute("data-theme") === "light" ? "&#9728;" : "&#9790;";
}
syncThemeIcon();
themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
  syncThemeIcon();
});

// ===== Mobile menu =====
const navLinks = document.getElementById("navLinks");
document.getElementById("menuToggle").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navLinks.classList.remove("open")));

// ===== Background video sound =====
// Browsers only allow autoplay when muted, so the video starts silent
// and the sound turns on at the visitor's first tap, click or key press.
const video = document.getElementById("bgVideo");
const musicBtn = document.getElementById("musicToggle");
video.volume = 0.6;
function updateSoundBtn() {
  musicBtn.innerHTML = video.muted ? "&#128263;" : "&#128266;";
  musicBtn.classList.toggle("on", !video.muted);
}
function setSound(on) {
  video.muted = !on;
  if (video.paused) video.play().catch(() => {});
  updateSoundBtn();
}
updateSoundBtn();
musicBtn.addEventListener("click", (e) => { e.stopPropagation(); autoUnmuted = true; setSound(video.muted); });
let autoUnmuted = false;
function firstInteraction(e) {
  if (e && e.target.closest && e.target.closest("#musicToggle")) return;
  if (autoUnmuted) return;
  autoUnmuted = true;
  setSound(true);
}
["click", "touchstart", "keydown"].forEach((ev) =>
  window.addEventListener(ev, firstInteraction)
);

// ===== Active link, back-to-top, skill bars, reveal =====
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach((s) => { if (window.scrollY >= s.offsetTop - 140) current = s.id; });
  links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  toTop.classList.toggle("show", window.scrollY > 500);
});
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add("visible");
      en.target.querySelectorAll(".fill").forEach((f) => (f.style.width = f.dataset.w + "%"));
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ===== Contact form (opens the visitor's email app, no backend needed) =====
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const msg = document.getElementById("cMsg").value.trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) {
    note.textContent = "Please fill in all fields with a valid email.";
    note.style.color = "#ff6b6b";
    return;
  }
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = `mailto:05250170.jnec@rub.edu.bt?subject=${subject}&body=${body}`;
  note.textContent = "Opening your email app. Thank you!";
  note.style.color = "#6fcf97";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

// ===== Smooth motion enhancements =====
// Scroll progress bar + shrinking navbar
const progressBar = document.getElementById("progress");
const navbar = document.getElementById("navbar");
function onScrollFx() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}
window.addEventListener("scroll", onScrollFx, { passive: true });
onScrollFx();

// Word-by-word section titles
document.querySelectorAll(".title").forEach((t) => {
  let i = 0;
  (function wrap(node) {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part.trim()) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement("span");
          w.className = "word";
          const inner = document.createElement("span");
          inner.style.setProperty("--i", i++);
          inner.textContent = part;
          w.appendChild(inner);
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) wrap(n);
    });
  })(t);
});

// Staggered entrance for cards in the same grid
document.querySelectorAll(".about-grid, .skills-grid, .contact-grid, .project-grid, .cert-grid, .timeline").forEach((g) => {
  [...g.querySelectorAll(":scope > .reveal")].forEach((el, i) => el.style.setProperty("--d", i * 0.14 + "s"));
});

// Rotating words in the hero (cross-fade and slide)
const rotateEl = document.getElementById("rotateWord");
const words = ["network builder", "creative designer", "curious problem solver", "lifelong learner"];
let wi = 0;
if (rotateEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    rotateEl.classList.add("out");
    setTimeout(() => {
      wi = (wi + 1) % words.length;
      rotateEl.textContent = words[wi];
      rotateEl.classList.remove("out");
      rotateEl.classList.add("in");
      void rotateEl.offsetWidth;          // restart the transition
      rotateEl.classList.remove("in");
    }, 500);
  }, 2800);
}

// ===== 360 degree profile spin: on first view, on hover and on tap =====
const photoFrame = document.querySelector(".photo-frame");
if (photoFrame) {
  const spinOnce = () => {
    if (photoFrame.classList.contains("spin")) return;
    photoFrame.classList.add("spin");
    photoFrame.addEventListener("animationend", () => photoFrame.classList.remove("spin"), { once: true });
  };
  photoFrame.addEventListener("mouseenter", spinOnce);
  photoFrame.addEventListener("click", spinOnce);
  setTimeout(spinOnce, 900); // spin once when the page opens
}
