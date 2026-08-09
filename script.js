const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'Close' : 'Menu';
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.textContent = 'Menu';
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const stageImage = document.querySelector('#stage-image');
document.querySelectorAll('.stage-tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.stage-tab').forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  stageImage.style.opacity = '0';
  setTimeout(() => { stageImage.src = `assets/${tab.dataset.image}`; stageImage.style.opacity = '1'; }, 180);
}));

document.querySelectorAll('.tilt-card').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 801) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1300px) rotateY(${x * -14}deg) rotateX(${y * 8}deg) translateY(-5px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});
