/* =====================
   PERSONALIZE HERE
===================== */
const birthdayName = "dimas bayu almareta";
const birthdayMessage =
  "wishing you a year filled with balance, love, growth, and quiet wins.";
const birthDate = new Date("2026-02-07:00:00");

/* Message */
document.getElementById("message").innerText =
  `Dear ${birthdayName},\n\n${birthdayMessage}`;

/* Countdown */
const countdownEl = document.getElementById("countdown");
setInterval(() => {
  const diff = birthDate - new Date();
  if (diff <= 0) {
    countdownEl.innerText = "Today is your day.";
    return;
  }
  const h = Math.floor(diff / 1000 / 60 / 60);
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;
  countdownEl.innerText = `${h}h ${m}m ${s}s remaining`;
}, 1000);

/* Candle click */
document.getElementById("candle").onclick = () => {
  document.getElementById("flame").style.display = "none";
  document.getElementById("candleSurprise").classList.remove("hidden");
};

/* Gift click → trigger fireworks */
document.getElementById("gift").onclick = () => {
  document.getElementById("giftText").classList.remove("hidden");
  triggerGlitterFireworks();
};

/* ===== GLITTER FIREWORKS ===== */
const fwCanvas = document.getElementById("fireworks");
const fwCtx = fwCanvas.getContext("2d");
fwCanvas.width = innerWidth;
fwCanvas.height = innerHeight;

let particles = [];

function createGlitterBurst(x, y) {
  for (let i = 0; i < 60; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      alpha: 1,
      size: Math.random() * 10 + 8,
      symbol: ["✦", "✧", "✨"][Math.floor(Math.random() * 3)]
    });
  }
}

function animateFireworks() {
  fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

  particles.forEach((p, i) => {
    fwCtx.globalAlpha = p.alpha;
    fwCtx.font = `${p.size}px serif`;
    fwCtx.fillStyle = "#6b5b4b";
    fwCtx.fillText(p.symbol, p.x, p.y);

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.04;
    p.alpha -= 0.015;

    if (p.alpha <= 0) particles.splice(i, 1);
  });

  fwCtx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

function triggerGlitterFireworks() {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      createGlitterBurst(
        Math.random() * innerWidth,
        Math.random() * innerHeight * 0.4
      );
    }, i * 300);
  }
}

/* ===== CONFETTI NEUTRAL (sedikit & subtle) ===== */
const confettiCanvas = document.getElementById("confetti");
const cctx = confettiCanvas.getContext("2d");
confettiCanvas.width = innerWidth;
confettiCanvas.height = innerHeight;

// jumlah lebih sedikit → 70 confetti
let confetti = Array.from({ length: 70 }, () => ({
  x: Math.random() * innerWidth,
  y: Math.random() * innerHeight,
  r: Math.random() * 5 + 2,
  c: ["#8b6f47", "#c7b299", "#e6dfd3", "#a0a0a0", "#2b2b2b"][Math.floor(Math.random() * 5)]
}));

(function confettiAnim() {
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(p => {
    cctx.fillStyle = p.c;
    cctx.beginPath();
    cctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    cctx.fill();
    p.y += 0.8; // turun lebih pelan
    if (p.y > confettiCanvas.height) p.y = 0;
  });
  requestAnimationFrame(confettiAnim);
})();

/* Music autoplay fix (klik sekali untuk mulai) */
document.body.addEventListener("click", () => {
  document.getElementById("music").play();
}, { once: true });
        
