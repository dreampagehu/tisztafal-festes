const header = document.querySelector('header');
const menu = document.querySelector('.menu');

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
