const header = document.querySelector('header');
console.log(header);

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const navLinks = document.querySelector('.footer');

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