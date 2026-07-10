const warningAudio = new Audio("./assets/sound/warning.mp3");
warningAudio.preload = "auto";
warningAudio.volume = 1;

const HINT_TEXTS = [
  'This button does absolutely nothing. Probably.',
  'Seriously. Don\'t.',
  'We cannot be held responsible.',
  'Last warning.',
  '...Are you sure?',
];

let hintIdx = 0;

// ==========================
// CLICK SOUND
// ==========================

const clickAudio = new Audio("./assets/sound/click.mp3");
clickAudio.preload = "auto";
clickAudio.volume = 0.5;

clickAudio.load();

function playClickSound() {
  clickAudio.pause();

    clickAudio.currentTime = 0;

    clickAudio.play().catch(() => {});
}

// Play sound for every button
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");

  if (!btn) return;

  playClickSound();
});

function enterButton() {

  const dangerBtn = $('#danger-btn');
  const hintText  = $('#danger-hint-text');
  const ripple    = $('#danger-ripple');

  dangerBtn?.addEventListener('mouseover', () => {

    hintText.textContent = HINT_TEXTS[hintIdx % HINT_TEXTS.length];
    hintIdx++;

    const wave = document.createElement('div');
    wave.className = 'ripple-wave';
    ripple.appendChild(wave);

    setTimeout(() => wave.remove(), 800);

  });

dangerBtn?.addEventListener("click", () => {

    // Prevent multiple clicks
    dangerBtn.disabled = true;
    dangerBtn.style.pointerEvents = "none";

    // Play warning
    warningAudio.currentTime = 0;
    warningAudio.play().catch(() => {});

    // Stop warning after 1.90 seconds
    setTimeout(() => {
        warningAudio.pause();
        warningAudio.currentTime = 0;
    }, 1900);

    // Continue with ending immediately
    triggerEnding();

});
}