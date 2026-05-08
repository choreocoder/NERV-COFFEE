/* ===== HEADER SCROLL EFFECT ===== */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* ===== FOOTER LOGO ANIMATION ===== */
const logo = document.querySelector(".footer-logo img");

if (logo) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logo.classList.add("spin");
            } else {
                logo.classList.remove("spin");
            }
        });
    });

    observer.observe(logo);
}


/* ===== CART SYSTEM ===== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let productsData = [];

/* DOM elements */
const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const cartItemsContainer = document.getElementById("cartItems");


/* Save cart */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


/* Update badge */
function updateCartUI() {
    const cartIcon = document.querySelector(".cart-icon");
    if (!cartIcon) return;

    let badge = document.querySelector(".cart-count");

    if (!badge) {
        badge = document.createElement("span");
        badge.classList.add("cart-count");
        cartIcon.appendChild(badge);
    }

    badge.textContent = cart.length;
}


/* Add item */
function addToCart(product) {
    if (!product) return;

    cart.push(product);
    saveCart();
    updateCartUI();
    renderCart();

    console.log("Added to cart:", product);
}


/* Render cart items */
function renderCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    cart.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <p><strong>${item.name}</strong></p>
            <p>R ${item.price}</p>
        `;

        cartItemsContainer.appendChild(div);
    });
}


/* Open / Close cart */
if (cartButton && cartPanel) {
    cartButton.addEventListener("click", (e) => {
        e.preventDefault();
        cartPanel.classList.toggle("active");
        renderCart();
    });
}


/* ===== PRODUCTS FETCH + UI UPDATE ===== */
fetch("http://localhost:3000/products")
  .then(res => res.json())
  .then(products => {

    console.log("DB PRODUCTS:", products);

    productsData = products;

    const cards = document.querySelectorAll(".product-card");

    products.forEach((product, index) => {
        const card = cards[index];
        if (!card) return;

        const name = card.querySelector(".product-name");
        const desc = card.querySelector(".product-description");
        const price = card.querySelector(".product-price");

        if (name) name.textContent = product.name;
        if (desc) desc.textContent = product.description;
        if (price) price.textContent = "R " + product.price;
    });

    document.querySelectorAll(".btn-add-to-cart").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            addToCart(productsData[index]);
        });
    });

    updateCartUI();
    renderCart();

  })
  .catch(error => {
    console.error("Error fetching products:", error);
  });