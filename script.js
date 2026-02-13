const whatsappNumber = "639219398475";

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  document.querySelector(".hero").classList.add("show");
});

fetch('products.json')
.then(res => res.json())
.then(data => {
  displayProducts(data);
  setupFilters(data);
  initScrollReveal();
});

function displayProducts(products) {
  const standard = document.getElementById('standard');
  const premium = document.getElementById('premium');
  standard.innerHTML = "";
  premium.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card hidden';
    card.innerHTML = `
      <h4>${product.name}</h4>
      <p>${product.category}</p>
      <p>Stock: <span class="stock ${stockClass(product.stock)}">${product.stock}</span></p>
    `;
    card.onclick = () => openModal(product);

    if(product.tier === "Standard") standard.appendChild(card);
    else premium.appendChild(card);
  });
}

function stockClass(stock){
  if(stock < 3) return "low";
  if(stock < 6) return "medium";
  return "";
}

function openModal(product){
  const modal = document.getElementById('productModal');
  const body = document.getElementById('modalBody');

  body.innerHTML = `
    <h2>${product.name}</h2>
    <p><strong>Top Notes:</strong> ${product.top}</p>
    <p><strong>Heart Notes:</strong> ${product.heart}</p>
    <p><strong>Base Notes:</strong> ${product.base}</p>
    <div>
      <label>Longevity:</label>
      <div style="background:#333;height:10px;">
        <div style="background:#D4AF37;width:${product.longevity}%;height:10px;"></div>
      </div>
    </div>
    <p>${product.why}</p>
    <button class="btn-gold" onclick="orderNow('${product.name}')">Order via WhatsApp</button>
  `;

  modal.classList.add("show");
}

function orderNow(name){
  const message = encodeURIComponent(`Hi, I'd like to order 1x ${name}`);
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
}

document.querySelector('.close').onclick = () => {
  document.getElementById('productModal').classList.remove("show");
};

function initScrollReveal(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".product-card, .about").forEach(el => {
    observer.observe(el);
  });
}

function setupFilters(products){
  const buttons = document.querySelectorAll(".filters button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      const filtered = filter === "all"
        ? products
        : products.filter(p => p.category === filter);

      displayProducts(filtered);
      initScrollReveal();
    });
  });
        } 
