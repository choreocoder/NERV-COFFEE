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

/* ===== TYPEWRITER MANIFESTO EFFECT ===== */
/* Animates text appearance with typewriter effect on about page */
if (document.getElementById('manifesto')) {
    const text = `NERV / THE MANIFESTO

01 / THE ORIGIN

Born from the Grind.
NERV was conceived in the quiet hours of deep work—between lines of code and the need for absolute mental clarity. We found that most coffee was either too decorative or too burnt to serve a real purpose. We created NERV to provide a sensory environment that mirrors the work we do: structured, intentional, and void of unnecessary noise.

02 / THE PHILOSOPHY

The Architecture of Focus.
We believe coffee is the primary infrastructure for creativity. Our brand is built on the principles of "clean brutalism"—stripping away the fluff to reveal the raw power of the bean. We don't sell a lifestyle; we provide the utility of high-grade caffeine for those who build the future.

03 / THE MATERIAL

Single-Origin Integrity.
Our story starts at the source. We select beans from high-altitude regions where the climate forces the coffee cherry to develop more density and complexity. By sourcing only single-origin lots, we ensure that the "data" of the soil and the farm is preserved. We don't blend because we don't believe in diluting the truth of the origin.

04 / THE SPECIFICATION

Technical Precision.
Roasting is our manufacturing phase. We use a light, technical roast profile to ensure the bean's natural acidity remains the protagonist. Every batch is treated as a blueprint, dialed in to the milligram and the degree. No ash, no bitterness—just a sharp, clean output that wakes up the nervous system.`;

    const el = document.getElementById('manifesto');
    const formatted = text.replace(/\n+/g, '<br>'); // Split text into words based on whitespace
    let index = 0;

    function type() {
        if (index < text.length) {
            el.textContent += text[index] + ' ';
            index++;
            setTimeout(type, 35); // Adjust typing speed here
        }
    }   

    setTimeout(type, 2000); // Start typing after a short delay
}