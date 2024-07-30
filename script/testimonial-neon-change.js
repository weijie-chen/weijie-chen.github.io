(function initTestimonialColorChange() {
    let hoverTimeout;
    let colorInterval;
    const testimonialItem = document.querySelector('.testimonial-item');
  
    if (testimonialItem) { // Ensure the element exists
        const testimonialText = testimonialItem.querySelector('.testimonial-text'); // Target the specific element

        testimonialItem.addEventListener('mouseenter', () => {
            hoverTimeout = setTimeout(() => {
                let isMainColor = true;
                colorInterval = setInterval(() => {
                    testimonialText.style.color = isMainColor ? 'var(--alternate-magenta)' : '#00ff00';
                    isMainColor = !isMainColor;
                }, 300);
            }, 300);
        });
  
        testimonialItem.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            clearInterval(colorInterval);
            testimonialText.style.color = ''; // Reset to initial color
        });
    } else {
        console.error('Element with class "testimonial-item" not found');
    }
})();
