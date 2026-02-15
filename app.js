import products from './products.js';

// Generate a random promo discount between 10-15% for each user session
function getUserPromoDiscount() {
    let discount = sessionStorage.getItem('promoDiscount');
    if (!discount) {
        discount = Math.floor(Math.random() * 6) + 10; // 10 to 15
        sessionStorage.setItem('promoDiscount', discount);
    }
    return Number(discount);
}
const USER_PROMO_DISCOUNT = getUserPromoDiscount();

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

const LOW_STOCK_THRESHOLD = 3;

let currentCategory = 'All';
let currentSearch = '';
let currentPriceRange = '';
let currentScent = '';
let currentSort = '';
let compareList = [];

window.showPage = function(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(a => {
        a.classList.toggle('active', a.dataset.page === pageId);
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const titles = { home: 'Luxe Scent Privé — Premium Perfume Boutique', catalogue: 'Collection — Luxe Scent Privé', about: 'Heritage — Luxe Scent Privé' };
    document.title = titles[pageId] || 'Luxe Scent Privé';

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

function renderBundleBuilder() {
    const allAvailable = products.filter(p => p.stock > 0);
    const premiums = allAvailable.filter(p => p.premium);
    const standards = allAvailable.filter(p => !p.premium);
    const bundleSection = document.getElementById('bundle-section');
    const select1 = document.getElementById('bundle-select-1');
    const select2 = document.getElementById('bundle-select-2');
    const discountPct = document.getElementById('bundle-discount-pct');

    if (allAvailable.length < 2) {
        bundleSection.style.display = 'none';
        document.getElementById('bundle-promo').style.display = 'none';
        const homePromo = document.getElementById('home-bundle-promo');
        if (homePromo) homePromo.style.display = 'none';
        return;
    }

    bundleSection.style.display = 'block';
    discountPct.textContent = USER_PROMO_DISCOUNT;

    // Show and update the promo banner
    const promo = document.getElementById('bundle-promo');
    promo.style.display = 'block';
    document.getElementById('bundle-promo-pct').textContent = USER_PROMO_DISCOUNT;

    // Show and update the home page promo banner
    const homePromo = document.getElementById('home-bundle-promo');
    if (homePromo) {
        homePromo.style.display = 'block';
        document.getElementById('home-bundle-promo-pct').textContent = USER_PROMO_DISCOUNT;
    }

    // Build grouped options for both selects
    const buildOptions = () => {
        let html = '<option value="">— Choose Fragrance —</option>';
        if (premiums.length > 0) {
            html += '<optgroup label="★ Premium">';
            html += premiums.map(p => `<option value="${p.id}">${escapeHtml(p.brand)} — ${escapeHtml(p.name)} (₱${getDiscountedPrice(p).toLocaleString()})</option>`).join('');
            html += '</optgroup>';
        }
        if (standards.length > 0) {
            html += '<optgroup label="Standard">';
            html += standards.map(p => `<option value="${p.id}">${escapeHtml(p.brand)} — ${escapeHtml(p.name)} (₱${getDiscountedPrice(p).toLocaleString()})</option>`).join('');
            html += '</optgroup>';
        }
        return html;
    };

    select1.innerHTML = buildOptions();
    select2.innerHTML = buildOptions();

    document.getElementById('bundle-summary').style.display = 'none';
}

window.updateBundleSummary = function() {
    const id1 = document.getElementById('bundle-select-1').value;
    const id2 = document.getElementById('bundle-select-2').value;
    const summary = document.getElementById('bundle-summary');

    if (!id1 || !id2) {
        summary.style.display = 'none';
        return;
    }
    if (id1 === id2) {
        summary.innerHTML = '<p class="bundle-duplicate-msg">Please select two different fragrances.</p>';
        summary.style.display = 'block';
        return;
    }

    const product1 = products.find(p => p.id === id1);
    const product2 = products.find(p => p.id === id2);
    const originalTotal = getDiscountedPrice(product1) + getDiscountedPrice(product2);
    const bundlePrice = Math.round(originalTotal * (1 - USER_PROMO_DISCOUNT / 100));
    const savings = originalTotal - bundlePrice;

    const badgeHtml = (p) => p.premium
        ? '<span class="premium-badge" style="position:static; display:inline-block; font-size:0.55rem; padding:2px 6px;">★ Premium</span>'
        : '';

    summary.innerHTML = `
        <div class="bundle-summary-items">
            <div class="bundle-summary-item" onclick="openModal('${product1.id}')">
                <img src="${product1.image}" alt="${escapeHtml(product1.name)}">
                ${badgeHtml(product1)}
                <p>${escapeHtml(product1.brand)} — ${escapeHtml(product1.name)}</p>
            </div>
            <span class="bundle-plus">+</span>
            <div class="bundle-summary-item" onclick="openModal('${product2.id}')">
                <img src="${product2.image}" alt="${escapeHtml(product2.name)}">
                ${badgeHtml(product2)}
                <p>${escapeHtml(product2.brand)} — ${escapeHtml(product2.name)}</p>
            </div>
        </div>
        <div class="bundle-pricing">
            <span class="original-price">₱${originalTotal.toLocaleString()}</span>
            <span class="bundle-price">₱${bundlePrice.toLocaleString()}</span>
            <span class="bundle-savings">Save ₱${savings.toLocaleString()} (${USER_PROMO_DISCOUNT}% off)</span>
        </div>
        <p class="bundle-screenshot-reminder">📸 Please screenshot your bundle selection before contacting us!</p>
        <button class="gold-btn" style="width:100%; margin-top:1rem; background:var(--text-main); color:#fff;"
            onclick="window.open('https://m.me/ralphcastanares.3')">
            Acquire Bundle via Concierge
        </button>
    `;
    summary.style.display = 'block';
};

function renderCatalogue() {
    const mainGrid = document.getElementById('product-grid');
    const archiveGrid = document.getElementById('archive-grid');
    
    let filtered = currentCategory === 'All' 
        ? [...products] 
        : [...products.filter(p => p.category === currentCategory)];

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

    if (currentScent) {
        filtered = filtered.filter(p => p.topScent === currentScent);
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

    const countEl = document.getElementById('product-count');
    if (countEl) {
        const total = products.filter(p => p.stock > 0).length;
        countEl.textContent = available.length === total
            ? `Showing all ${total} fragrances`
            : `Showing ${available.length} of ${total} fragrances`;
    }

    if (available.length === 0) {
        mainGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 4rem; color:#999;">Currently exclusive to waitlist.</div>';
    } else {
        mainGrid.innerHTML = available.map(p => createCard(p)).join('');
    }

    archiveGrid.innerHTML = archived.map(p => createCard(p, true)).join('');

    // Render bundle builder
    renderBundleBuilder();
}

function createCard(p, isArchive = false) {
    const premiumBadge = p.premium ? '<span class="premium-badge">★ Premium</span>' : '';
    const stockBadge = (p.stock <= LOW_STOCK_THRESHOLD && p.stock > 0) ? `<span class="stock-badge${p.stock === 1 ? ' stock-badge-last' : ''}">Only ${escapeHtml(String(p.stock))} left</span>` : '';
    const hasDiscount = p.discount > 0 && p.stock > 0;
    const discountedPrice = getDiscountedPrice(p);
    const isCompared = compareList.includes(p.id);

    let compareBtn = '';
    if (!isArchive) {
        compareBtn = `<button class="compare-checkbox ${isCompared ? 'selected' : ''}" onclick="event.stopPropagation(); toggleCompare('${p.id}')" title="Compare" aria-label="Compare ${p.brand} ${p.name}">✓</button>`;
    }

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
            ${stockBadge}
            ${compareBtn}
            <img src="${p.image}" alt="${escapeHtml(p.brand)} ${escapeHtml(p.name)}" loading="lazy">
            <h3>${escapeHtml(p.brand)}</h3>
            <p>${escapeHtml(p.name)}</p>
            ${priceHtml}
        </div>
    `;
}


window.filterProducts = function(category) {
    currentCategory = category;
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
    });
    const clicked = document.querySelector(`.filter-btn[data-category="${category}"]`);
    if (clicked) {
        clicked.classList.add('active');
        clicked.setAttribute('aria-pressed', 'true');
    }
    renderCatalogue();
};

window.searchProducts = function(query) {
    currentSearch = query.replace(/[<>&"']/g, '');
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

window.filterByScent = function(scent) {
    currentScent = scent;
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
    sessionStorage.setItem('archiveOpen', isOpen);
};

window.openModal = function(id) {
    const p = products.find(prod => prod.id === id);
    if (!p) return;
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
            <img src="${p.image}" alt="${escapeHtml(p.brand)} ${escapeHtml(p.name)}" style="max-width: 100%; max-height: 400px; object-fit: contain; mix-blend-mode: multiply;">
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
            ${premiumLabel}
            <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing:1px; font-weight:600; color:#1A1A1A;">${escapeHtml(p.brand)}</h2>
            <h3 style="font-size: 1.2rem; font-weight: 400; margin-bottom: 1.5rem; color:#333;">${escapeHtml(p.name)}</h3>
            <p style="font-style: italic; color: #555; margin-bottom: 1.5rem; font-size:0.95rem;">"${escapeHtml(p.desc)}"</p>
            
            <div style="margin: 0 0 20px; padding: 15px; background: #faf8f3; border-left: 3px solid var(--gold);">
                <strong style="text-transform:uppercase; font-size:0.75rem; letter-spacing:1px; color:#1A1A1A;">Notes</strong><br>
                <span style="font-size:0.95rem; color:#333; font-weight:400;">${escapeHtml(p.notes)}</span>
            </div>

            <p class="price" style="font-size: 1.8rem; margin-bottom: 2rem; font-weight:700; letter-spacing:0.5px;">
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
    modal.querySelector('.close').focus();
};

window.closeModal = () => {
    document.getElementById('product-modal').style.display = "none";
    document.body.style.overflow = 'auto'; 
};

window.onclick = (e) => {
    if (e.target == document.getElementById('product-modal')) closeModal();
    if (e.target == document.getElementById('compare-modal')) closeCompareModal();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('product-modal').style.display === 'block') {
            closeModal();
        }
        if (document.getElementById('compare-modal').style.display === 'block') {
            closeCompareModal();
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

// --- Compare Feature ---
window.toggleCompare = function(id) {
    const idx = compareList.indexOf(id);
    if (idx > -1) {
        compareList.splice(idx, 1);
    } else if (compareList.length < 3) {
        compareList.push(id);
    }
    updateCompareTray();
    renderCatalogue();
};

function updateCompareTray() {
    const tray = document.getElementById('compare-tray');
    const items = document.getElementById('compare-tray-items');
    const count = document.getElementById('compare-count');
    const btn = document.getElementById('compare-btn');

    if (compareList.length === 0) {
        tray.style.display = 'none';
        return;
    }

    tray.style.display = 'block';
    count.textContent = compareList.length;
    btn.disabled = compareList.length < 2;

    items.innerHTML = compareList.map(id => {
        const p = products.find(prod => prod.id === id);
        return `<img src="${p.image}" alt="${escapeHtml(p.brand)} ${escapeHtml(p.name)}" title="${escapeHtml(p.brand)} — ${escapeHtml(p.name)}">`;
    }).join('');
}

window.clearCompare = function() {
    compareList = [];
    updateCompareTray();
    renderCatalogue();
};

window.openCompareModal = function() {
    if (compareList.length < 2) return;
    const modal = document.getElementById('compare-modal');
    const body = document.getElementById('compare-body');
    const items = compareList.map(id => products.find(p => p.id === id));

    body.style.gridTemplateColumns = `repeat(${items.length}, 1fr)`;
    body.innerHTML = items.map(p => {
        const price = getDiscountedPrice(p);
        const premiumLabel = p.premium ? '<span class="premium-badge premium-badge-inline">★ Premium</span>' : '';
        return `
            <div class="compare-column">
                <img src="${p.image}" alt="${escapeHtml(p.brand)} ${escapeHtml(p.name)}">
                ${premiumLabel}
                <h3>${escapeHtml(p.brand)}</h3>
                <h4>${escapeHtml(p.name)}</h4>
                <div class="compare-row">
                    <div class="compare-row-label">Price</div>
                    <div class="compare-row-value price">₱${price.toLocaleString()}</div>
                </div>
                <div class="compare-row">
                    <div class="compare-row-label">Category</div>
                    <div class="compare-row-value">${escapeHtml(p.category)}</div>
                </div>
                <div class="compare-row">
                    <div class="compare-row-label">Notes</div>
                    <div class="compare-row-value">${escapeHtml(p.notes)}</div>
                </div>
                <div class="compare-row">
                    <div class="compare-row-label">Description</div>
                    <div class="compare-row-value compare-row-value-desc">"${escapeHtml(p.desc)}"</div>
                </div>
            </div>
        `;
    }).join('');

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-content').scrollTop = 0;
    modal.querySelector('.close').focus();
};

window.closeCompareModal = function() {
    document.getElementById('compare-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
};

// --- Back to Top & Sticky Header ---
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const btn = document.getElementById('back-to-top');
    if (window.scrollY > 400) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }

    const header = document.querySelector('.catalogue-header');
    const trigger = document.getElementById('sticky-trigger');
    if (header && document.getElementById('catalogue').classList.contains('active')) {
        if (window.scrollY > 200) {
            header.classList.add('sticky');
            trigger.style.display = 'block';

            // On mobile: show on scroll-up, hide on scroll-down
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
                if (window.scrollY < lastScrollY) {
                    header.classList.add('visible');
                } else {
                    header.classList.remove('visible');
                }
            }
        } else {
            header.classList.remove('sticky');
            header.classList.remove('visible');
            trigger.style.display = 'none';
        }
    } else {
        if (trigger) trigger.style.display = 'none';
    }

    lastScrollY = window.scrollY;
});

// --- Sticky header hover-reveal ---
(function() {
    const trigger = document.getElementById('sticky-trigger');
    const catalogueHeader = document.querySelector('.catalogue-header');
    const nav = document.querySelector('nav');
    const getHeader = () => document.querySelector('.catalogue-header.sticky');
    let hideTimeout;

    function showStickyHeader() {
        clearTimeout(hideTimeout);
        const header = getHeader();
        if (header) header.classList.add('visible');
    }

    function scheduleStickyHide() {
        hideTimeout = setTimeout(() => {
            const header = getHeader();
            if (header) header.classList.remove('visible');
        }, 500);
    }

    // Desktop hover behavior
    if (trigger) {
        trigger.addEventListener('mouseenter', showStickyHeader);
        trigger.addEventListener('mouseleave', scheduleStickyHide);
    }

    if (nav) {
        nav.addEventListener('mouseenter', showStickyHeader);
        nav.addEventListener('mouseleave', scheduleStickyHide);
    }

    if (catalogueHeader) {
        catalogueHeader.addEventListener('mouseenter', showStickyHeader);
        catalogueHeader.addEventListener('mouseleave', scheduleStickyHide);
    }

    // Mobile tap on nav to toggle sticky header
    if (nav) {
        nav.addEventListener('click', (e) => {
            if (window.innerWidth > 768) return;
            if (e.target.closest('.mobile-menu-icon') || e.target.closest('a')) return;
            const header = getHeader();
            if (header) {
                header.classList.toggle('visible');
            }
        });
    }
})();

// Restore archive state
if (sessionStorage.getItem('archiveOpen') === 'true') {
    const container = document.getElementById('archive-container');
    const icon = document.getElementById('archive-icon');
    const toggle = document.querySelector('.archive-toggle');
    if (container) {
        container.classList.add('open');
        icon.textContent = '−';
        toggle.setAttribute('aria-expanded', 'true');
    }
}

showPage('home');
renderBundleBuilder();
