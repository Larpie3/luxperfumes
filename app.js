import products from './products.js';

const CONFIG = {
    whatsappNumber: '639219398475',
    currency: '₱',
    businessName: 'Luxe Scent Privé'
};

let currentCategory = 'All';
let currentSearch = '';
let currentPriceRange = '';
let currentSort = '';

window.showPage = function(pageId) {
    try {
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('active'));
        
        const page = document.getElementById(pageId);
        if (!page) {
            throw new Error('Page not found: ' + pageId);
        }
        page.classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if(pageId === 'catalogue') {
            renderCatalogue();
        }
    } catch (error) {
        console.error('Error showing page:', error);
    }
};

window.toggleMobileMenu = function() {
    const nav = document.getElementById('mobile-nav');
    nav.classList.toggle('open');
};

function getFilteredProducts() {
    let filtered = currentCategory === 'All'
        ? [...products]
        : products.filter(p => p.category === currentCategory);

    if (currentSearch) {
        const searchTerm = currentSearch.toLowerCase();
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.brand.toLowerCase().includes(searchTerm) ||
            p.notes.toLowerCase().includes(searchTerm)
        );
    }

    if (currentPriceRange) {
        const [min, max] = currentPriceRange.split('-').map(v => v === 'Infinity' ? Infinity : Number(v));
        filtered = filtered.filter(p => p.price >= min && p.price < max);
    }

    if (currentSort) {
        switch (currentSort) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'brand':
                filtered.sort((a, b) => a.brand.localeCompare(b.brand));
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
    }

    return filtered;
}

function renderCatalogue() {
    const mainGrid = document.getElementById('product-grid');
    const archiveGrid = document.getElementById('archive-grid');

    const filtered = getFilteredProducts();

    const available = filtered.filter(p => p.stock > 0);
    const archived = filtered.filter(p => p.stock === 0);

    if (available.length === 0) {
        mainGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 4rem; color:#999;">Currently exclusive to waitlist.</div>';
    } else {
        mainGrid.innerHTML = available.map(p => createCard(p)).join('');
    }

    archiveGrid.innerHTML = archived.map(p => createCard(p, true)).join('');
}

function createCard(p, isArchive = false) {
    return `
        <div class="product-card" onclick="openModal('${p.id}')">
            <img src="${p.image}" alt="${p.brand} ${p.name} - ${p.category} perfume" loading="lazy" onload="this.classList.add('loaded')" class="loading">
            <h3>${p.brand}</h3>
            <p>${p.name}</p>
            ${!isArchive 
                ? `<span class="price">₱${p.price.toLocaleString()}</span>` 
                : '<span class="price" style="color:#999; font-size:0.8rem; letter-spacing:1px;">UNAVAILABLE</span>'}
        </div>
    `;
}

window.filterProducts = function(category) {
    currentCategory = category;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
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
    container.classList.toggle('open');
    icon.textContent = container.classList.contains('open') ? '−' : '+';
};

window.openModal = function(id) {
    try {
        const p = products.find(prod => prod.id === id);
        if (!p) {
            throw new Error('Product not found');
        }
        const modal = document.getElementById('product-modal');
        const body = document.getElementById('modal-body');
        
        body.innerHTML = `
            <div style="flex: 1; display:flex; align-items:center; justify-content:center;">
                <img src="${p.image}" alt="${p.brand} ${p.name} - ${p.category} perfume" style="max-width: 100%; max-height: 400px; object-fit: contain; mix-blend-mode: multiply;">
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; letter-spacing:1px;">${p.brand}</h2>
                <h3 style="font-size: 1.2rem; font-weight: 300; margin-bottom: 1.5rem; color:#444;">${p.name}</h3>
                <p style="font-style: italic; color: #666; margin-bottom: 1.5rem; font-size:0.9rem;">"${p.desc}"</p>
                
                <div style="margin: 0 0 20px; padding: 15px; background: #fafafa; border-left: 2px solid var(--gold);">
                    <strong style="text-transform:uppercase; font-size:0.7rem; letter-spacing:1px;">Notes</strong><br>
                    <span style="font-size:0.9rem;">${p.notes}</span>
                </div>

                <p class="price" style="font-size: 1.5rem; margin-bottom: 2rem;">
                    ${p.stock > 0 ? '₱' + p.price.toLocaleString() : 'Currently Unavailable'}
                </p>

                <button class="gold-btn" style="width: 100%; background: ${p.stock > 0 ? 'var(--text-main)' : 'transparent'}; color: ${p.stock > 0 ? '#fff' : 'var(--text-main)'};" 
                onclick="window.open('https://wa.me/${CONFIG.whatsappNumber}?text=Inquiry for ${encodeURIComponent(p.name)}')">
                    ${p.stock > 0 ? 'Acquire via WhatsApp' : 'Join Waitlist'}
                </button>
            </div>
        `;
        modal.style.display = "block";
        document.body.style.overflow = 'hidden'; 
    } catch (error) {
        console.error('Error opening modal:', error);
        alert('Sorry, there was an error loading this product.');
    }
};

window.closeModal = () => {
    document.getElementById('product-modal').style.display = "none";
    document.body.style.overflow = 'auto'; 
};

window.onclick = (e) => {
    if (e.target == document.getElementById('product-modal')) closeModal();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('custom-cursor');
    if (window.innerWidth > 768) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

showPage('home');
