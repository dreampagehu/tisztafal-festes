const header = document.querySelector('header');
const menu = document.querySelector('.menu');
const rollerStyles = document.createElement('link');
rollerStyles.rel = 'stylesheet';
rollerStyles.href = 'roller.css?v=3d-roller-2';
document.head.append(rollerStyles);
const paintWash = document.createElement('div');
paintWash.className = 'paint-wash';
paintWash.setAttribute('aria-hidden', 'true');
const paintRoller = document.createElement('div');
paintRoller.className = 'paint-roller';
paintRoller.setAttribute('aria-hidden', 'true');
paintRoller.innerHTML = '<div class="roller-assembly"><img class="roller-ghost" src="assets/paint-roller-3d-v1.png?v=2" alt=""><img class="roller-part roller-part-head" src="assets/paint-roller-3d-v1.png?v=2" alt=""><img class="roller-part roller-part-frame" src="assets/paint-roller-3d-v1.png?v=2" alt=""><img class="roller-part roller-part-handle" src="assets/paint-roller-3d-v1.png?v=2" alt=""></div><small>3D PAINT SYSTEM</small>';
document.body.prepend(paintWash, paintRoller);
const colorSections = [...document.querySelectorAll('main > section')];
const paintColors = ['#ff7350', '#7c5cff', '#19b8a8', '#ff9c3d', '#3979ff', '#d94f88', '#87a857', '#9b66ff', '#16a6b6'];

menu.addEventListener('click', () => header.classList.toggle('open'));
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => header.classList.remove('open')));

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const toast = document.querySelector('.toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('main > section').forEach((section, index) => {
  if (index) section.classList.add('reveal');
  observer.observe(section);
});

document.querySelectorAll('.service-grid article, .process-grid article, .gallery figure, .review-grid article').forEach((card, index) => {
  card.style.setProperty('--delay', `${(index % 6) * 70}ms`);
  card.classList.add('mobile-reveal');
  observer.observe(card);
});

let paintTicking = false;
let activePaint = -1;
const renderPaint = () => {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
  const rollerY = innerHeight * (.16 + progress * .62);
  const assembly = Math.min(1, Math.max(0, scrollY / (innerHeight * 1.08)));
  const assemblyEase = assembly * assembly * (3 - 2 * assembly);
  paintRoller.style.setProperty('--roller-y', `${rollerY}px`);
  paintRoller.style.setProperty('--assemble', assemblyEase.toFixed(4));
  paintRoller.style.setProperty('--apart', (1 - assemblyEase).toFixed(4));
  paintWash.style.setProperty('--roller-y', `${rollerY + 18}px`);
  const focusY = scrollY + innerHeight * .48;
  let nextPaint = 0;
  colorSections.forEach((section, index) => {
    if (section.offsetTop <= focusY) nextPaint = index;
  });
  if (nextPaint !== activePaint) {
    const color = paintColors[nextPaint % paintColors.length];
    paintRoller.style.setProperty('--paint', color);
    paintWash.style.setProperty('--paint', color);
    activePaint = nextPaint;
  }
  paintTicking = false;
};
const requestPaint = () => {
  if (!paintTicking) {
    paintTicking = true;
    requestAnimationFrame(renderPaint);
  }
};
addEventListener('scroll', requestPaint, { passive: true });
addEventListener('resize', requestPaint);
renderPaint();
