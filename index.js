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

// ===== MENU: Add to Cart handlers =====
document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('.btn-add-to-cart');
        // Create cart badge and side panel UI
        const cartIconLink = document.querySelector('.cart-icon a');
        const cartBadge = document.createElement('span');
        cartBadge.className = 'cart-badge';
        cartBadge.textContent = '0';
        cartBadge.style.display = 'none';
        // position relative container for badge
        const cartLi = document.querySelector('.cart-icon');
        if (cartLi) cartLi.style.position = 'relative';
        if (cartIconLink) cartLi.appendChild(cartBadge);

        // create side cart panel
        const sideCart = document.createElement('aside');
        sideCart.className = 'side-cart';
        sideCart.innerHTML = `
            <div class="cart-header">
                <strong>Your Cart</strong>
                <div>
                    <button class="clear-cart">Clear</button>
                    <button class="close-cart" aria-label="Close">×</button>
                </div>
            </div>
            <div class="cart-items"></div>
            <div class="cart-footer">
                <div class="cart-total">Total: R0.00</div>
            </div>
        `;
        document.body.appendChild(sideCart);

        async function fetchCart() {
            try {
                const resp = await fetch('http://localhost:3000/cart');
                if (!resp.ok) throw new Error('Failed to fetch cart');
                const items = await resp.json();
                updateCartUI(items);
                return items;
            } catch (err) {
                console.error('fetchCart error', err);
                return [];
            }
        }

        function updateCartUI(items) {
            const count = items.length || 0;
            if (count > 0) {
                cartBadge.style.display = 'inline-grid';
                cartBadge.textContent = String(count);
            } else {
                cartBadge.style.display = 'none';
            }
            const container = sideCart.querySelector('.cart-items');
            container.innerHTML = '';
            let total = 0;
            items.forEach((it) => {
                const row = document.createElement('div');
                row.className = 'cart-item';
                row.dataset.id = it.id;
                const left = document.createElement('div');
                left.innerHTML = `<div><strong>${it.name}</strong><div style="font-size:0.9rem;color:#666">R ${it.price}</div></div>`;
                const right = document.createElement('div');
                const remove = document.createElement('button');
                remove.className = 'remove-item';
                remove.textContent = 'Remove';
                right.appendChild(remove);
                row.appendChild(left);
                row.appendChild(right);
                container.appendChild(row);
                const p = parseFloat(String(it.price).replace(/,/g, '')) || 0;
                total += p;
            });
            sideCart.querySelector('.cart-total').textContent = `Total: R${total.toFixed(2)}`;
        }

        async function addItemToCart(item) {
            try {
                const resp = await fetch('http://localhost:3000/cart', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(item),
                });
                if (!resp.ok) throw new Error('Network response was not ok');
                await fetchCart();
            } catch (err) {
                console.error('Add to cart failed', err);
                alert('Could not add to cart. Try again later.');
            }
        }

        // toggle side cart
        if (cartIconLink) {
            cartIconLink.addEventListener('click', async (e) => {
                e.preventDefault();
                sideCart.classList.toggle('open');
                if (sideCart.classList.contains('open')) {
                    await fetchCart();
                }
            });
        }

        // close & clear handlers + remove delegation
        sideCart.addEventListener('click', (e) => {
            if (e.target.matches('.close-cart')) sideCart.classList.remove('open');
            if (e.target.matches('.clear-cart')) {
                fetch('http://localhost:3000/cart/clear', { method: 'POST' }).then(() => fetchCart());
            }
            if (e.target.matches('.remove-item')) {
                const row = e.target.closest('.cart-item');
                if (!row) return;
                const id = row.dataset.id;
                fetch(`http://localhost:3000/cart/${encodeURIComponent(id)}`, { method: 'DELETE' }).then(() => fetchCart());
            }
        });

        // wire add-to-cart buttons
        buttons.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const card = e.target.closest('.product-card');
                if (!card) return;
                const nameEl = card.querySelector('.product-name');
                const priceEl = card.querySelector('.product-price');
                const name = nameEl ? nameEl.textContent.trim() : 'Unknown';
                const priceText = priceEl ? priceEl.textContent.trim() : '';
                const price = priceText.replace(/[^0-9.,]/g, '').trim();

                const item = {
                    id: `${name.replace(/\s+/g, '_')}_${Date.now()}`,
                    name,
                    price,
                };

                await addItemToCart(item);
            });
        });

        const buyButtons = document.querySelectorAll('.buy-button-1, .buy-button-2, .buy-button-3');
        buyButtons.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const name = btn.dataset.name || btn.textContent.trim() || 'Product';
                const price = btn.dataset.price || '0.00';
                const item = {
                    id: `${name.replace(/\s+/g, '_')}_${Date.now()}`,
                    name,
                    price,
                };
                await addItemToCart(item);
                sideCart.classList.add('open');
            });
        });

        // initialize badge on load
        fetchCart();
});

