const progressBar = document.getElementById('progress');
const teddy = document.getElementById('teddy');
const finalText = document.getElementById('finalText');
const whatsappBtn = document.getElementById('whatsappBtn');
const progressText = document.getElementById('progressText');

let holding = false;
let progress = 0;
let interval;
let heartInterval;

function openBox() {
  document.getElementById('screen1').classList.add('hidden');
  document.getElementById('screen2').classList.remove('hidden');
}

function showHug() {
  document.getElementById('screen2').classList.add('hidden');
  document.getElementById('screen3').classList.remove('hidden');
}

function startHold() {
  if (progress >= 100) return;
  document.body.classList.add('warm-hug');
  holding = true;
  teddy.classList.add('hugging');

  heartInterval = setInterval(() => {
  createHeart();
  if (Math.random() > 0.6) createHeart(); // sometimes double hearts
}, 220);


  interval = setInterval(() => {
    if (!holding) return;

    progress += 2;
    progressBar.style.width = progress + '%';

    // Progress text logic
    if (progress >= 30 && progress < 60) {
      progressText.textContent = "A little comfort…";
    } else if (progress >= 60 && progress < 100) {
      progressText.textContent = "A little warmth…";
    } else if (progress >= 100) {
      progressText.textContent = "All my care ❤️";
      completeHug();
    }
  }, 50);
}

function stopHold() {
  holding = false;
  teddy.classList.remove('hugging');
  document.body.classList.remove('warm-hug');
  clearInterval(interval);
  clearInterval(heartInterval);
}

function completeHug() {
  clearInterval(interval);
  clearInterval(heartInterval);

  finalText.classList.remove('hidden');
  for (let i = 0; i < 12; i++) {
  setTimeout(createHeart, i * 80);
}
  whatsappBtn.classList.remove('hidden');
  document.body.classList.add('warm-hug');
  navigator.vibrate?.(300);
}

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '❤️';

  const size = 22 + Math.random() * 12;
  heart.style.fontSize = size + 'px';

  const xOffset = Math.random() * 140 - 70;
  heart.style.left = `calc(50% + ${xOffset}px)`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 3000);
}


teddy.addEventListener('mousedown', startHold);
teddy.addEventListener('touchstart', startHold);

teddy.addEventListener('mouseup', stopHold);
teddy.addEventListener('mouseleave', stopHold);
teddy.addEventListener('touchend', stopHold);

function goWhatsApp() {
  const msg = encodeURIComponent(
    "This made me smile 🧸❤️.\nHappy Teddy Day ❤️."
  );
  const t = Date.now();
  window.location.href = `https://wa.me/9111113431?text=${msg}&v=${t}`;
}

