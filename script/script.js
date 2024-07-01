
  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1500
    });
  }




// This is testinomial color change code, not working yet
// (function() {
//   let hoverTimeout;
//   let colorInterval;
//   const testimonialItem = document.querySelector('.testimonial-item');

//   if (testimonialItem) { // Ensure the element exists
//     testimonialItem.addEventListener('mouseenter', () => {
//       hoverTimeout = setTimeout(() => {
//         let isMainColor = true;
//         colorInterval = setInterval(() => {
//           document.documentElement.style.setProperty('--main-color', isMainColor ? 'var(--alternate-magenta)' : '#00ff00');
//           isMainColor = !isMainColor;
//         }, 300);
//       }, 300);
//     });

//     testimonialItem.addEventListener('mouseleave', () => {
//       clearTimeout(hoverTimeout);
//       clearInterval(colorInterval);
//       document.documentElement.style.setProperty('--main-color', '#00ff00'); // Reset to initial color
//     });
//   } else {
//     console.error('Element with class "testimonial-item" not found');
//   }
// })();


// navbar dynamic update
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar a');

  function changeActiveLink() {
      let index = sections.length;

      while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

      navLinks.forEach((link) => link.classList.remove('active'));
      navLinks[index].classList.add('active');
  }

  changeActiveLink();
  window.addEventListener('scroll', changeActiveLink);
});