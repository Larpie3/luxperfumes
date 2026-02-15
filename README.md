# 🌸 Luxe Scent Privé

> *A curated anthology of the world's most prestigious essences*

**Luxe Scent Privé** is an elegant, luxury perfume boutique website showcasing premium fragrances from the world's most renowned brands. Built as a single-page application with a sophisticated design aesthetic that mirrors the luxury of the products it presents.

![Luxe Scent Privé Homepage](https://github.com/user-attachments/assets/a2531c7d-f3dd-498c-9194-f094f4f45d17)

## ✨ Features

### 🎨 Design & User Experience
- **Custom Cursor Effect** - Sophisticated cursor design that follows mouse movement
- **Smooth Page Transitions** - Elegant fade-in animations between pages
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Mobile Navigation** - Full-screen overlay menu for mobile users
- **Premium Typography** - Cormorant Garamond and Montserrat font pairing

### 🛍️ E-Commerce Functionality
- **Product Catalog** - Display of luxury perfumes with images, prices, and details
- **Category Filtering** - Filter products by All, Men, Women, or Unisex categories
- **Product Modal** - Detailed view with fragrance notes and descriptions
- **Stock Management** - Clear distinction between available and archived products
- **WhatsApp Integration** - Direct inquiry via WhatsApp for purchases

### 📱 Pages
1. **Home** - Hero section with elegant introduction
2. **Collection** - Full product catalog with filtering options
3. **Heritage** - About section describing the boutique's philosophy

## 🚀 Live Demo

![Collection Page](https://github.com/user-attachments/assets/bcf636a5-41dd-44f5-8188-daf265e67465)

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, grid, animations
- **Vanilla JavaScript (ES6+)** - Modules, arrow functions, template literals
- **No frameworks** - Lightweight and fast-loading

## 📁 Project Structure

```
luxperfumes/
├── index.html          # Main HTML file (SPA entry point)
├── style.css           # Main stylesheet with custom properties
├── app.js              # Main application logic (ES6 modules)
├── products.js         # Product data export
├── images/             # Product images (23 perfume images)
│   ├── dior-sauvage.jpg
│   ├── br540.jpg
│   ├── aventus.jpg
│   └── ...
├── about.html          # Legacy about page (not used in SPA)
├── catalogue.html      # Legacy catalogue page (not used in SPA)
├── index1.html         # Alternative version
├── style1.css          # Alternative stylesheet
├── script.js           # Legacy script
└── README.md           # This file
```

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

## 📦 Products Featured

The catalog includes **23 luxury fragrances** from prestigious brands:

- **Dior** - Sauvage EDP, Miss Dior Blooming Bouquet
- **Maison Francis Kurkdjian** - Baccarat Rouge 540
- **Creed** - Aventus
- **Tom Ford** - Lost Cherry, Tobacco Vanille, Oud Wood
- **Chanel** - Bleu de Chanel, Coco Mademoiselle
- **Yves Saint Laurent** - Y EDP, Libre
- **Jo Malone** - English Pear & Freesia, Wood Sage & Sea Salt
- **Prada** - Paradoxe
- **Le Labo** - Santal 33
- **Versace** - Eros, Eros Flame, Eros Energy
- **Carolina Herrera** - Good Girl
- **Parfums de Marly** - Delina
- **Louis Vuitton** - Ombre Nomade
- **Valentino** - Born In Roma
- **Armani** - Acqua Di Gio

## 🎨 Color Palette

```css
Background:    #FAFAFA
Card:          #FFFFFF
Text:          #1C1C1C
Muted Text:    #666666
Gold Accent:   #C5A059
Gold Light:    #E6D8B5
Border:        #EAEAEA
```

## ⚙️ Configuration

### Update WhatsApp Number

In `app.js`, line 94, replace `YOURNUMBER` with your WhatsApp number in the template literal:

```javascript
// Inside the button onclick attribute in app.js
window.open('https://wa.me/YOUR_WHATSAPP_NUMBER?text=Inquiry for ${p.name}')
```

Format: Country code + number (e.g., `639171234567` for Philippines)

Example:
```javascript
onclick="window.open('https://wa.me/639171234567?text=Inquiry for ${p.name}')"
```

### Add New Products

Edit `products.js` and add new product objects:

```javascript
{
  "id": "BRAND001",
  "brand": "Brand Name",
  "name": "Perfume Name",
  "category": "Men|Women|Unisex",
  "price": 1000,
  "stock": 1,  // 0 for archived
  "image": "images/product-image.jpg",
  "desc": "Product description",
  "notes": "Top, Middle, Base notes"
}
```

## 📝 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Larpie3**
- GitHub: [@Larpie3](https://github.com/Larpie3)

## 🙏 Acknowledgments

- Product images are for demonstration purposes
- Fonts: Google Fonts (Cormorant Garamond, Montserrat)
- Design inspired by luxury e-commerce aesthetics

---

**Made with ❤️ for perfume enthusiasts**