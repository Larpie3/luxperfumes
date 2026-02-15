# 🌸 Black Vault Fragrances

> *A curated anthology of the world's most prestigious essences*

**Black Vault Fragrances** is an elegant, luxury perfume boutique website showcasing premium fragrances from the world's most renowned brands. Built as a single-page application with a sophisticated design aesthetic that mirrors the luxury of the products it presents.

![Black Vault Fragrances Homepage](https://github.com/user-attachments/assets/3f5e04db-1a27-4ff3-85f3-aa861c23ce4b)

---

## ✨ Features

### 🎨 Design & User Experience
- **Custom Cursor Effect** — Sophisticated gold circular cursor that follows mouse movement on desktop; hidden on touch devices
- **Smooth Page Transitions** — Elegant fade-in animations (0.8s) when navigating between pages
- **Responsive Design** — Fully optimized across three breakpoints: desktop, tablet (768px), and mobile (480px / 360px)
- **Mobile Navigation** — Full-screen overlay menu with smooth toggle and Escape key support
- **Premium Typography** — Cormorant Garamond serif headings paired with Montserrat sans-serif body text
- **Sticky Navigation** — Hover-reveal dropdown on desktop; scroll-direction-aware show/hide on mobile
- **Back-to-Top Button** — Appears after scrolling 400px with smooth scroll-to-top behavior

### 🛍️ Product Catalog & Shopping

![Collection Page — Product Cards with Premium Badges, Stock Warnings & Compare Buttons](https://github.com/user-attachments/assets/69fb117c-a2f7-4148-848b-81b8b14cf893)

- **24 Luxury Fragrances** — Curated collection from prestigious brands including Dior, Creed, Tom Ford, Chanel, and more
- **Premium Badges** — Gold gradient "★ Premium" tags on select high-end fragrances
- **Stock Warnings** — "Only X left" badges with flashing red animation when stock is critically low (≤ 3 units)
- **Product Modal** — Detailed view with full-size image, fragrance notes, pricing, and "Acquire via Concierge" CTA
- **Lazy Loading** — Product images use native `loading="lazy"` for faster page load
- **Archived Collection** — Out-of-stock products are separated into a collapsible archive section with persistent state (sessionStorage)

### 🔍 Search, Filter & Sort
- **Full-Text Search** — Search across brand names, product names, and fragrance notes in real-time
- **Category Filtering** — Filter by All, Men, Women, or Unisex with active button state and ARIA pressed attributes
- **Price Range Filtering** — Three price tier brackets for quick budget-based browsing
- **Scent Filtering** — Filter by top scent family: Amber, Aquatic, Aromatic, Citrus, Floral, Fruity, Vanilla, or Woody
- **Sorting** — Sort by price (low/high), brand name, or product name
- **Live Product Count** — Displays "Showing X fragrances" with `aria-live="polite"` for screen readers

### ⚖️ Compare Feature
- **Side-by-Side Comparison** — Select up to 3 products to compare price, category, notes, and descriptions
- **Compare Tray** — Fixed bottom tray shows selected products with thumbnail previews and a "Compare Now" button
- **Compare Modal** — Full-screen modal with side-by-side comparison grid

### 🎁 Bundle Builder & Promo Discounts

![Product Detail Modal — Premium Badge, Notes & Concierge CTA](https://github.com/user-attachments/assets/adab10d1-6de6-447e-a2b6-bb8a983bd1b9)

- **Bundle Builder** — Pair any two fragrances and receive a personalized discount (10–15% per session)
- **Session-Based Promo** — Each user receives a randomly generated discount stored in sessionStorage
- **Real-Time Bundle Pricing** — Shows original total, discounted total, and savings amount as you select fragrances
- **Duplicate Validation** — Prevents selecting the same fragrance twice with a user-friendly error message
- **Promo Banners** — Promotional cards on both the Home and Collection pages directing users to the bundle builder

### 🔒 Security
- **XSS Prevention** — All user-generated and product data is sanitized through `escapeHtml()` before any innerHTML insertion
- **Input Sanitization** — Search input strips potentially dangerous characters (`<>&"'`)

### ♿ Accessibility
- **Skip Link** — "Skip to main content" link for keyboard users
- **ARIA Attributes** — Proper `aria-pressed`, `aria-expanded`, `aria-modal`, `aria-label`, and `aria-live` attributes throughout
- **Keyboard Navigation** — Escape key closes modals, mobile menu, and compare modal
- **Focus Management** — Modal focus is trapped and returned to trigger elements on close
- **Semantic HTML** — Proper use of `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, and heading hierarchy

### 🔎 SEO & Performance
- **Open Graph Meta Tags** — Title, description, and type for social media sharing
- **Schema.org JSON-LD** — Organization structured data for search engines
- **Theme Color** — Gold accent (`#C5A059`) for browser chrome
- **Lazy Loading Images** — Native browser lazy loading for product images

### 📱 Pages

![Heritage Page — Brand Philosophy & Values](https://github.com/user-attachments/assets/5e96ff61-b1c7-4f65-9cd0-836cae2759d4)

1. **Home** — Hero section with elegant introduction and bundle promo banner
2. **Collection** — Full product catalog with search, filters, sorting, bundle builder, compare feature, and archived collection
3. **Heritage** — About section describing the boutique's philosophy, values (Authenticity, Curation, Experience), and concierge contact

---

## 🚀 Live Demo

![Collection Page](https://github.com/user-attachments/assets/958800da-304e-41c5-8ac2-77be46301fd8)

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic markup, ARIA attributes, Schema.org JSON-LD |
| **CSS3** | Custom properties, flexbox, grid, animations, backdrop-filter, clamp() |
| **Vanilla JavaScript (ES6+)** | Modules, template literals, sessionStorage, IntersectionObserver concepts |
| **Google Fonts** | Cormorant Garamond (400/600/700) & Montserrat (300/400/500/600) |
| **No frameworks** | Zero dependencies — lightweight and fast-loading |

---

## 📁 Project Structure

```
luxperfumes/
├── index.html          # Main HTML file (SPA entry point)
├── style.css           # Main stylesheet with custom properties
├── app.js              # Main application logic (ES6 modules)
├── products.js         # Product data (24 fragrances)
├── v2/                 # Version 2 — Premium tier variant
│   ├── index.html      # V2 HTML entry point
│   ├── style.css       # V2 stylesheet
│   ├── app.js          # V2 application logic
│   └── products.js     # V2 product data (higher price tier)
├── images/             # Product images (shared by both versions)
│   ├── dior-sauvage.jpg
│   ├── br540.jpg
│   ├── aventus.jpg
│   └── ... (26 images)
├── backup/             # Backup files
├── legacy/             # Legacy multi-page version files
└── README.md           # This file
```

---

## 🔀 Version Comparison

The repository contains two versions of the site with identical functionality but different pricing tiers:

| Aspect | Root (v1) | V2 (`/v2/`) |
|---|---|---|
| **Price Range** | ₱700 – ₱1,400 | ₱3,100 – ₱6,800 |
| **Stock Model** | Variable (0–10 units) | Exclusive (1 unit each) |
| **Price Filters** | Under ₱1,000 / ₱1,000–₱1,500 / Above ₱1,500 | Under ₱7,000 / ₱7,000–₱10,500 / Above ₱10,500 |
| **Image Paths** | `images/` | `../images/` (shared) |
| **All Other Features** | ✅ Identical | ✅ Identical |

---

## 🎯 Installation & Usage

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Larpie3/luxperfumes.git
   cd luxperfumes
   ```

2. **Start a local server**

   Using Python:
   ```bash
   python3 -m http.server 8000
   ```

   Using Node.js:
   ```bash
   npx http-server -p 8000
   ```

   Using PHP:
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### No Build Process Required

This is a static website with no build dependencies. Simply open `index.html` in a web browser or deploy to any static hosting service.

### Accessing Version 2

The premium-tier version lives in the `v2/` folder:

- **Local server**: Navigate to `http://localhost:8000/v2/`
- **GitHub Pages**: Visit `https://yourusername.github.io/luxperfumes/v2/`

---

## 🌐 Deployment

### GitHub Pages
1. Go to repository Settings → Pages
2. Select main branch as source
3. Your site will be published at `https://yourusername.github.io/luxperfumes`

### Netlify
1. Connect your GitHub repository
2. No build command needed
3. Publish directory: `/` (root)

### Vercel
1. Import repository
2. Framework Preset: Other
3. Deploy

---

## 📦 Products Featured

The catalog includes **24 luxury fragrances** across Men, Women, and Unisex categories from prestigious brands:

| Brand | Fragrances | Category |
|---|---|---|
| **Dior** | Sauvage EDP, Miss Dior Blooming Bouquet | Men, Women |
| **Maison Francis Kurkdjian** | Baccarat Rouge 540 ★ | Unisex |
| **Creed** | Aventus ★ | Men |
| **Tom Ford** | Lost Cherry ★, Tobacco Vanille ★, Oud Wood ★ | Unisex, Men |
| **Chanel** | Bleu de Chanel, Coco Mademoiselle | Men, Women |
| **Yves Saint Laurent** | Y EDP, Libre | Men, Women |
| **Jo Malone** | English Pear & Freesia, Wood Sage & Sea Salt | Women, Unisex |
| **Prada** | Paradoxe | Women |
| **Le Labo** | Santal 33 ★ | Unisex |
| **Versace** | Eros, Eros Flame, Eros Energy | Men |
| **Carolina Herrera** | Good Girl | Women |
| **Parfums de Marly** | Delina ★ | Women |
| **Louis Vuitton** | Ombre Nomade ★ | Unisex |
| **Valentino** | Born In Roma | Women |
| **Armani** | Acqua Di Gio, Acqua Di Gio Profondo, Acqua Di Gio Profumo | Men |

> ★ = Premium collection

### Scent Families

Products are tagged with one of 8 top scent families for filtering:

`Amber` · `Aquatic` · `Aromatic` · `Citrus` · `Floral` · `Fruity` · `Vanilla` · `Woody`

---

## 🎨 Color Palette

```css
--bg:          #FAFAFA     /* Page background */
--card-bg:     #FFFFFF     /* Card surfaces */
--text-main:   #1C1C1C     /* Primary text */
--text-muted:  #666666     /* Secondary text */
--gold:        #C5A059     /* Primary accent */
--gold-light:  #E6D8B5     /* Light accent */
--border:      #EAEAEA     /* Subtle borders */
--gold-gradient: linear-gradient(135deg, #C5A059, #D4AF6F)  /* Premium badges */
```

---

## ⚙️ Configuration

### Update Concierge Contact

In `app.js`, update the Messenger link in the modal button to your own contact:

```javascript
onclick="window.open('https://m.me/YOUR_MESSENGER_USERNAME')"
```

### Add New Products

Edit `products.js` and add new product objects to the array:

```javascript
{
  "id": "BRAND001",
  "brand": "Brand Name",
  "name": "Perfume Name",
  "category": "Men",        // "Men" | "Women" | "Unisex"
  "price": 1000,
  "stock": 5,               // 0 = archived, ≤3 = low stock warning
  "topScent": "Woody",      // Scent family for filtering
  "image": "images/product-image.jpg",
  "desc": "Product description",
  "notes": "Top, Middle, Base notes",
  "premium": true,           // true = gold premium badge
  "discount": 0              // percentage discount (e.g., 10 = 10% off)
}
```

---

## 📝 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Larpie3**
- GitHub: [@Larpie3](https://github.com/Larpie3)

## 🙏 Acknowledgments

- Product images are for demonstration purposes
- Fonts: [Google Fonts](https://fonts.google.com/) (Cormorant Garamond, Montserrat)
- Design inspired by luxury e-commerce aesthetics

---

**Made with ❤️ for perfume enthusiasts**