const progressBar = document.getElementById('progress');
const teddy = document.getElementById('teddy');
const finalText = document.getElementById('finalText');
const whatsappBtn = document.getElementById('whatsappBtn');

let holding = false;
let progress = 0;
let interval;

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

  interval = setInterval(() => {
    if (holding && progress < 100) {
      progress += 2;
      progressBar.style.width = progress + '%';

      if (progress >= 100) {
        clearInterval(interval);
        finalText.classList.remove('hidden');
        whatsappBtn.classList.remove('hidden');
        navigator.vibrate?.(200);
      }
    }
  }, 50);
}

function stopHold() {
  holding = false;
  teddy.classList.remove('hugging');
  clearInterval(interval);
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
