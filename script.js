// ── TYPEWRITER ──
const words = ["Ntando.", "a CS student.", "a backend builder.", "a frontend builder.", "an ML enthusiast."];
let wordIndex = 0, charIndex = 0, deleting = false;
const el = document.getElementById('typewriter');

function type() {
  const current = words[wordIndex];
  if (deleting) {
    el.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
      return;
    }
  } else {
    el.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 800);

// ── PARTICLE CANVAS ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const cx = W / 2, cy = H / 2;
const particles = [];
const NUM = 120;

for (let i = 0; i < NUM; i++) {
  const angle = Math.random() * Math.PI * 2;
  const r = 30 + Math.random() * 100;
  particles.push({
    x: cx + Math.cos(angle) * r,
    y: cy + Math.sin(angle) * r,
    baseX: cx + Math.cos(angle) * r,
    baseY: cy + Math.sin(angle) * r,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.02 + 0.005,
    offset: Math.random() * Math.PI * 2,
    opacity: Math.random() * 0.6 + 0.2,
  });
}

let t = 0;
function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  t += 0.01;
  particles.forEach((p, i) => {
    p.x = p.baseX + Math.sin(t + p.offset) * 6;
    p.y = p.baseY + Math.cos(t * 0.8 + p.offset) * 6;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
    ctx.fill();

    // connect nearby particles
    particles.forEach((p2, j) => {
      if (i >= j) return;
      const dx = p.x - p2.x, dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 45) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 45)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(r => observer.observe(r));