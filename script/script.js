// Encapsulate Typed.js Initialization
(function initTypedJS() {
  document.addEventListener('DOMContentLoaded', function() {
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
  });
})();

// Encapsulate Navbar Dynamic Update
(function initNavbarUpdate() {
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
})();
