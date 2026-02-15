const whatsappNumber = "639219398475";

window.addEventListener("load",()=>{
  document.body.classList.add("loaded");
});

/* Page Fade Transition */
document.querySelectorAll("a").forEach(link=>{
  if(link.hostname===window.location.hostname){
    link.addEventListener("click",e=>{
      e.preventDefault();
      document.body.classList.remove("loaded");
      setTimeout(()=>{ window.location=link.href; },400);
    });
  }
});

/* Gold Cursor */
const cursor=document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX+"px";
  cursor.style.top=e.clientY+"px";
});

/* Catalogue Logic */
if(document.getElementById("standard")){
fetch("products.json")
.then(res=>res.json())
.then(data=>{
  displayProducts(data);
  setupFilters(data);
});
}

function displayProducts(products){
  const standard=document.getElementById("standard");
  const premium=document.getElementById("premium");
  standard.innerHTML="";
  premium.innerHTML="";

  products.forEach(product=>{
    const card=document.createElement("div");
    card.className="product-card";

    let badge="";
    if(product.tier==="Premium") badge=`<div class="badge">PREMIUM</div>`;
    if(product.category==="Best Seller") badge=`<div class="badge">BEST SELLER</div>`;

    const stockText=product.stock===1
      ? `<span class="stock low">Only 1 Left</span>`
      : `<span>${product.stock} in stock</span>`;

    card.innerHTML=`
      ${badge}
      <img src="images/${product.image}" loading="lazy">
      <h4>${product.name}</h4>
      <p>${stockText}</p>
    `;

    card.onclick=()=>openModal(product);

    if(product.tier==="Standard") standard.appendChild(card);
    else premium.appendChild(card);
  });
}

function openModal(product){
  const modal=document.getElementById("productModal");
  const body=document.getElementById("modalBody");

  body.innerHTML=`
    <img src="images/${product.image}">
    <h2>${product.name}</h2>
    <p><strong>Top:</strong> ${product.top}</p>
    <p><strong>Heart:</strong> ${product.heart}</p>
    <p><strong>Base:</strong> ${product.base}</p>
    <p>${product.why}</p>
    <button class="btn-gold" onclick="orderNow('${product.name}')">Order via WhatsApp</button>
  `;

  modal.classList.add("show");
}

function orderNow(name){
  const msg=encodeURIComponent(`Hi, I'd like to order 1x ${name}`);
  window.open(`https://wa.me/${whatsappNumber}?text=${msg}`,"_blank");
}

document.addEventListener("click",e=>{
  if(e.target.classList.contains("close")){
    document.getElementById("productModal").classList.remove("show");
  }
});

function setupFilters(products){
  document.querySelectorAll(".filters button").forEach(btn=>{
    btn.onclick=()=>{
      const filter=btn.dataset.filter;
      if(filter==="all") displayProducts(products);
      else displayProducts(products.filter(p=>p.category===filter));
    };
  });
      }function stockClass(stock){
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

if (window.innerWidth >= 1024) {
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}
