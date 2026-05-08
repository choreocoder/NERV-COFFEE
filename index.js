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
let productsData = {};

/* DOM elements */
const cartIcon = document.querySelector(".cart-icon a");
const cartDrawer = document.getElementById("cartDrawer");
const cartItemsContainer = document.getElementById("cartItems");

/* Save cart to localStorage */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* Update cart badge (item count) */
function updateCartUI() {
    const cartLink = document.querySelector(".cart-icon a");
    if (!cartLink) return;

    let badge = document.querySelector(".cart-count");

    if (!badge) {
        badge = document.createElement("span");
        badge.classList.add("cart-count");
        cartLink.appendChild(badge);
    }

    badge.textContent = cart.length;
    badge.style.display = cart.length > 0 ? "inline-block" : "none";
}

/* Add item to cart */
function addToCart(productKey) {
    const product = productsData[productKey];
    
    if (!product) {
        console.warn("Product not found:", productKey);
        return;
    }

    cart.push(product);
    saveCart();
    updateCartUI();
    renderCart();
    openCart();

    console.log("Added to cart:", product);
}

/* Remove item from cart by index */
function removeFromCart(index) {
    if (index < 0 || index >= cart.length) return;

    const removed = cart.splice(index, 1);
    saveCart();
    updateCartUI();
    renderCart();

    console.log("Removed from cart:", removed[0]);
}

/* Open/close cart drawer */
function toggleCart() {
    if (!cartDrawer) return;
    cartDrawer.classList.toggle("open");
}

function openCart() {
    if (cartDrawer) cartDrawer.classList.add("open");
}

function closeCart() {
    if (cartDrawer) cartDrawer.classList.remove("open");
}

/* Render cart items in drawer */
function renderCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='empty-cart'>Your cart is empty</p>";
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div class="cart-item-content">
                <p class="cart-item-name"><strong>${item.name}</strong></p>
                <p class="cart-item-price">R ${item.price}</p>
            </div>
            <button class="btn-remove" data-index="${index}" aria-label="Remove ${item.name}">
                ✕
            </button>
        `;

        cartItemsContainer.appendChild(div);
    });

    /* Add total */
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("cart-total");
    totalDiv.innerHTML = `<strong>Total: R ${total}</strong>`;
    cartItemsContainer.appendChild(totalDiv);

    /* Add checkout button */
    const checkoutBtn = document.createElement("button");
    checkoutBtn.classList.add("btn-checkout");
    checkoutBtn.textContent = "Proceed to Checkout";
    cartItemsContainer.appendChild(checkoutBtn);

    /* Attach remove button listeners */
    document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const index = parseInt(btn.getAttribute("data-index"));
            removeFromCart(index);
        });
    });
}

/* Wire cart icon to toggle drawer */
if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
        e.preventDefault();
        toggleCart();
    });
}

/* Close cart when clicking outside */
document.addEventListener("click", (e) => {
    if (cartDrawer && !cartDrawer.contains(e.target) && !cartIcon?.contains(e.target)) {
        closeCart();
    }
});

/* ===== DEFINE HARDCODED PRODUCTS ===== */
/* Map product keys to their details */
const defineProducts = () => {
    productsData = {
        forge: {
            id: "mk-001",
            name: "* NRV / MK - 001 FORGE",
            description: "Forge embodies our newest exploration with aluminium to build hardware. It reflects our raw and refined approach to design and product.",
            price: 2500
        },
        pitcher: {
            id: "mk-002",
            name: "* NRV / MK - 002 PITCHER",
            description: "Premium milk pitcher designed for precision steaming and pouring. Engineered with ergonomic handles and precision pour spouts.",
            price: 450
        },
        flusk: {
            id: "mk-003",
            name: "* NRV / MK - 003 FLUSK",
            description: "Engineered for those who take their coffee seriously, the NERV FLUSK Edition 1 delivers exact measurements and seamless control over every brew.",
            price: 1800
        }
    };
};

/* ===== ATTACH BUTTONS TO HARDCODED PRODUCTS ===== */
const attachProductButtons = () => {
    const buyButton1 = document.querySelector(".buy-button-1");
    const buyButton2 = document.querySelector(".buy-button-2");
    const buyButton3 = document.querySelector(".buy-button-3");

    if (buyButton1) {
        buyButton1.addEventListener("click", () => addToCart("forge"));
    }

    if (buyButton2) {
        buyButton2.addEventListener("click", () => addToCart("pitcher"));
    }

    if (buyButton3) {
        buyButton3.addEventListener("click", () => addToCart("flusk"));
    }
};

/* ===== INITIALIZE ON PAGE LOAD ===== */
document.addEventListener("DOMContentLoaded", () => {
    defineProducts();
    attachProductButtons();
    updateCartUI();
    renderCart();

    console.log("Products defined:", productsData);
    console.log("Cart initialized:", cart);
});

/* Fallback in case DOM content is already loaded */
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        defineProducts();
        attachProductButtons();
        updateCartUI();
        renderCart();
    });
} else {
    defineProducts();
    attachProductButtons();
    updateCartUI();
    renderCart();
}
