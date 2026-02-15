import products, { BUNDLE_DISCOUNT_PERCENT } from './products.js';

let currentCategory = 'All';
let currentSearch = '';
let currentPriceRange = '';
let currentSort = '';

window.showPage = function(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(a => {
        a.classList.toggle('active', a.dataset.page === pageId);
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if(pageId === 'catalogue') {
        renderCatalogue();
    }
};

window.toggleMobileMenu = function() {
    const nav = document.getElementById('mobile-nav');
    nav.classList.toggle('open');
};

function getDiscountedPrice(p) {
    if (p.discount > 0) {
        return Math.round(p.price * (1 - p.discount / 100));
    }
    return p.price;
}

function generateBundles(availableProducts) {
    const premiums = availableProducts.filter(p => p.premium);
    const standards = availableProducts.filter(p => !p.premium);
    const bundles = [];

    premiums.forEach(premiumProduct => {
        standards.forEach(standardProduct => {
            const originalTotal = getDiscountedPrice(premiumProduct) + getDiscountedPrice(standardProduct);
            const bundlePrice = Math.round(originalTotal * (1 - BUNDLE_DISCOUNT_PERCENT / 100));
            bundles.push({
                premium: premiumProduct,
                standard: standardProduct,
                originalTotal,
                bundlePrice,
                savings: originalTotal - bundlePrice
            });
        });
    });

    return bundles;
}

function renderCatalogue() {
    const mainGrid = document.getElementById('product-grid');
    const archiveGrid = document.getElementById('archive-grid');
    const bundleGrid = document.getElementById('bundle-grid');
    
    let filtered = currentCategory === 'All' 
        ? [...products] 
        : products.filter(p => p.category === currentCategory);

    if (currentSearch) {
        const q = currentSearch.toLowerCase();
        filtered = filtered.filter(p =>
            p.brand.toLowerCase().includes(q) ||
            p.name.toLowerCase().includes(q) ||
            p.notes.toLowerCase().includes(q)
        );
    }

    if (currentPriceRange) {
        const [min, max] = currentPriceRange.split('-').map(Number);
        filtered = filtered.filter(p => {
            const price = getDiscountedPrice(p);
            return price >= min && price <= max;
        });
    }

    if (currentSort) {
        switch (currentSort) {
            case 'price-low': filtered.sort((a, b) => getDiscountedPrice(a) - getDiscountedPrice(b)); break;
            case 'price-high': filtered.sort((a, b) => getDiscountedPrice(b) - getDiscountedPrice(a)); break;
            case 'brand': filtered.sort((a, b) => a.brand.localeCompare(b.brand)); break;
            case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
        }
    }

    const available = filtered.filter(p => p.stock > 0);
    const archived = filtered.filter(p => p.stock === 0);

    if (available.length === 0) {
        mainGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 4rem; color:#999;">Currently exclusive to waitlist.</div>';
    } else {
        mainGrid.innerHTML = available.map(p => createCard(p)).join('');
    }

    archiveGrid.innerHTML = archived.map(p => createCard(p, true)).join('');

    // Render bundles
    const allAvailable = products.filter(p => p.stock > 0);
    const bundles = generateBundles(allAvailable);
    if (bundleGrid) {
        if (bundles.length > 0) {
            bundleGrid.innerHTML = bundles.map(b => createBundleCard(b)).join('');
            document.getElementById('bundle-section').style.display = 'block';
        } else {
            document.getElementById('bundle-section').style.display = 'none';
        }
    }
}

function createCard(p, isArchive = false) {
    const premiumBadge = p.premium ? '<span class="premium-badge">★ Premium</span>' : '';
    const hasDiscount = p.discount > 0 && p.stock > 0;
    const discountedPrice = getDiscountedPrice(p);

    let priceHtml;
    if (isArchive) {
        priceHtml = '<span class="price" style="color:#999; font-size:0.8rem; letter-spacing:1px;">UNAVAILABLE</span>';
    } else if (hasDiscount) {
        priceHtml = `
            <span class="discount-badge">-${p.discount}%</span>
            <span class="price"><s class="original-price">₱${p.price.toLocaleString()}</s> ₱${discountedPrice.toLocaleString()}</span>
        `;
    } else {
        priceHtml = `<span class="price">₱${p.price.toLocaleString()}</span>`;
    }

    return `
        <div class="product-card" onclick="openModal('${p.id}')">
            ${premiumBadge}
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <h3>${p.brand}</h3>
            <p>${p.name}</p>
            ${priceHtml}
        </div>
    `;
}

function createBundleCard(b) {
    return `
        <div class="bundle-card">
            <div class="bundle-items">
                <div class="bundle-item" onclick="openModal('${b.premium.id}')">
                    <img src="${b.premium.image}" alt="${b.premium.name}">
                    <span class="premium-badge">★ Premium</span>
                    <p>${b.premium.brand} — ${b.premium.name}</p>
                </div>
                <span class="bundle-plus">+</span>
                <div class="bundle-item" onclick="openModal('${b.standard.id}')">
                    <img src="${b.standard.image}" alt="${b.standard.name}">
                    <p>${b.standard.brand} — ${b.standard.name}</p>
                </div>
            </div>
            <div class="bundle-pricing">
                <span class="original-price">₱${b.originalTotal.toLocaleString()}</span>
                <span class="bundle-price">₱${b.bundlePrice.toLocaleString()}</span>
                <span class="bundle-savings">Save ₱${b.savings.toLocaleString()} (${BUNDLE_DISCOUNT_PERCENT}% off)</span>
            </div>
            <button class="gold-btn" style="width:100%; margin-top:1rem; background:var(--text-main); color:#fff;"
                onclick="window.open('https://m.me/ralphcastanares.3')">
                Acquire Bundle via Concierge
            </button>
        </div>
    `;
}

window.filterProducts = function(category) {
    currentCategory = category;
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    const clicked = document.querySelector(`.filter-btn[onclick*="'${category}'"]`);
    if (clicked) {
        clicked.classList.add('active');
        clicked.setAttribute('aria-pressed', 'true');
    }
    renderCatalogue();
};

window.searchProducts = function(query) {
    currentSearch = query;
    renderCatalogue();
};

window.sortProducts = function(sortBy) {
    currentSort = sortBy;
    renderCatalogue();
};

window.filterByPrice = function(range) {
    currentPriceRange = range;
    renderCatalogue();
};

window.toggleArchive = function() {
    const container = document.getElementById('archive-container');
    const icon = document.getElementById('archive-icon');
    const toggle = document.querySelector('.archive-toggle');
    container.classList.toggle('open');
    const isOpen = container.classList.contains('open');
    icon.textContent = isOpen ? '−' : '+';
    toggle.setAttribute('aria-expanded', isOpen);
};

window.openModal = function(id) {
    const p = products.find(prod => prod.id === id);
    const modal = document.getElementById('product-modal');
    const body = document.getElementById('modal-body');
    const hasDiscount = p.discount > 0 && p.stock > 0;
    const discountedPrice = getDiscountedPrice(p);
    const premiumLabel = p.premium
        ? '<span class="premium-badge" style="position:static; display:inline-block; margin-bottom:1rem;">★ Premium</span>'
        : '';

    let priceDisplay;
    if (p.stock > 0 && hasDiscount) {
        priceDisplay = `<s class="original-price">₱${p.price.toLocaleString()}</s> ₱${discountedPrice.toLocaleString()} <span class="discount-badge" style="position:static; display:inline;">-${p.discount}%</span>`;
    } else if (p.stock > 0) {
        priceDisplay = '₱' + p.price.toLocaleString();
    } else {
        priceDisplay = 'Currently Unavailable';
    }
    
    body.innerHTML = `
        <div style="flex: 1; display:flex; align-items:center; justify-content:center;">
            <img src="${p.image}" alt="${p.brand} ${p.name}" style="max-width: 100%; max-height: 400px; object-fit: contain; mix-blend-mode: multiply;">
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
            ${premiumLabel}
            <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing:1px; font-weight:600; color:#1A1A1A;">${p.brand}</h2>
            <h3 style="font-size: 1.2rem; font-weight: 400; margin-bottom: 1.5rem; color:#333;">${p.name}</h3>
            <p style="font-style: italic; color: #555; margin-bottom: 1.5rem; font-size:0.95rem;">"${p.desc}"</p>
            
            <div style="margin: 0 0 20px; padding: 15px; background: #faf8f3; border-left: 3px solid var(--gold);">
                <strong style="text-transform:uppercase; font-size:0.75rem; letter-spacing:1px; color:#1A1A1A;">Notes</strong><br>
                <span style="font-size:0.95rem; color:#333; font-weight:400;">${p.notes}</span>
            </div>

            <p class="price" style="font-size: 1.5rem; margin-bottom: 2rem; font-weight:600;">
                ${priceDisplay}
            </p>

            <button class="gold-btn" style="width: 100%; background: ${p.stock > 0 ? 'var(--text-main)' : 'transparent'}; color: ${p.stock > 0 ? '#fff' : 'var(--text-main)'};" 
            onclick="window.open('https://m.me/ralphcastanares.3')">
                ${p.stock > 0 ? 'Acquire via Concierge' : 'Join Waitlist'}
            </button>
        </div>
    `;
    modal.style.display = "block";
    document.body.style.overflow = 'hidden'; 
};

window.closeModal = () => {
    document.getElementById('product-modal').style.display = "none";
    document.body.style.overflow = 'auto'; 
};

window.onclick = (e) => {
    if (e.target == document.getElementById('product-modal')) closeModal();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('product-modal').style.display === 'block') {
            closeModal();
        }
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav.classList.contains('open')) {
            toggleMobileMenu();
        }
    }
});

document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    if (window.innerWidth > 768) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

showPage('home');
