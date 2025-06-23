const swiper = new Swiper(".testimonial-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

const counters = document.querySelectorAll('.stat-number');
let started = false;

function animateCount(el, target) {
  let count = 0;
  const speed = 200;
  const step = Math.ceil(target / speed);

  function update() {
    count += step;
    if (count > target) count = target;
    el.querySelector('b').textContent = count + '+';
    if (count < target) requestAnimationFrame(update);
  }

  update();
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !started) {
      counters.forEach(el => {
        const target = +el.dataset.target;
        animateCount(el, target);
      });
      started = true;
    }
  });
}, {
  threshold: 0.5
});

document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
