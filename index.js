/* ===== HEADER SCROLL EFFECT ===== */
/* Add styling to header when page is scrolled */
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ===== FOOTER LOGO ANIMATION ===== */
/* Trigger 3D rotation animation when footer logo enters viewport */
const logo = document.querySelector('.footer-logo img');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            logo.classList.add('spin');
        } else {
            logo.classList.remove('spin');
        }
    });
});

observer.observe(logo);