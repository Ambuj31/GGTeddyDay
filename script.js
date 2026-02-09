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

  holding = true;
  teddy.classList.add('hugging');

  heartInterval = setInterval(createHeart, 400);

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
      progressText.textContent = "All my care 🤍";
      completeHug();
    }
  }, 50);
}

function stopHold() {
  holding = false;
  teddy.classList.remove('hugging');
  clearInterval(interval);
  clearInterval(heartInterval);
}

function completeHug() {
  clearInterval(interval);
  clearInterval(heartInterval);

  finalText.classList.remove('hidden');
  whatsappBtn.classList.remove('hidden');

  navigator.vibrate?.(300);
}

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '❤️';

  const xOffset = Math.random() * 100 - 50;
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
    "I wish I could hug you right now 🧸🤍\nHappy Teddy Day"
  );
  window.location.href = `https://wa.me/?text=${msg}`;
}
