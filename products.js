const products = [
  // --- AVAILABLE COLLECTION ---
  {
    "id": "D001",
    "brand": "Dior",
    "name": "Sauvage EDP",
    "category": "Men",
    "price": 899,
    "stock": 1,
    "image": "images/dior-sauvage.jpg",
    "desc": "The quintessential modern aromatic fougere. A composition of radical freshness.",
    "notes": "Bergamot, Sichuan Pepper, Ambroxan"
  },
  {
    "id": "MFK001",
    "brand": "Maison Francis Kurkdjian",
    "name": "Baccarat Rouge 540",
    "category": "Unisex",
    "price": 1250,
    "stock": 1,
    "image": "images/br540.jpg",
    "desc": "Luminous and sophisticated, laying on the skin like an amber floral and woody breeze.",
    "notes": "Jasmine, Saffron, Cedarwood, Ambergris"
  },
  {
    "id": "C001",
    "brand": "Creed",
    "name": "Aventus",
    "category": "Men",
    "price": 1450,
    "stock": 1,
    "image": "images/aventus.jpg",
    "desc": "The exceptional Aventus was inspired by the dramatic life of a historic emperor.",
    "notes": "Pineapple, Birch, Musk, Oakmoss"
  },
  {
    "id": "TF003",
    "brand": "Tom Ford",
    "name": "Lost Cherry",
    "category": "Unisex",
    "price": 1550,
    "stock": 1,
    "image": "images/tf-cherry.jpg",
    "desc": "A full-bodied journey into the once-forbidden.",
    "notes": "Black Cherry, Tonka Bean, Almond"
  },

  // --- ARCHIVE / SOLD OUT (Stock: 0) ---
  {
    "id": "TF001",
    "brand": "Tom Ford",
    "name": "Tobacco Vanille",
    "category": "Unisex",
    "price": 1300,
    "stock": 0,
    "image": "images/tf-tobacco.jpg",
    "desc": "Opulent. Warm. Iconic. Reminiscent of an English Gentleman's Club.",
    "notes": "Tobacco Leaf, Spice, Vanilla"
  },
  {
    "id": "TF002",
    "brand": "Tom Ford",
    "name": "Oud Wood",
    "category": "Unisex",
    "price": 1300,
    "stock": 0,
    "image": "images/tf-oud.jpg",
    "desc": "Rare. Exotic. Distinctive. One of the most rare, precious, and expensive ingredients.",
    "notes": "Rosewood, Cardamom, Oud Wood"
  },
  {
    "id": "CH001",
    "brand": "Chanel",
    "name": "Bleu de Chanel",
    "category": "Men",
    "price": 950,
    "stock": 0,
    "image": "images/bleu.jpg",
    "desc": "A tribute to masculine freedom in an aromatic-woody fragrance.",
    "notes": "Citrus, Labdanum, Sandalwood"
  },
  {
    "id": "CH002",
    "brand": "Chanel",
    "name": "Coco Mademoiselle",
    "category": "Women",
    "price": 950,
    "stock": 0,
    "image": "images/coco.jpg",
    "desc": "The essence of a free and captivating woman.",
    "notes": "Orange, Patchouli, Turkish Rose"
  },
  {
    "id": "YSL001",
    "brand": "Yves Saint Laurent",
    "name": "Y Eau de Parfum",
    "category": "Men",
    "price": 850,
    "stock": 0,
    "image": "images/ysl-y.jpg",
    "desc": "An authentic fragrance expression capturing the essence of modern men.",
    "notes": "Apple, Sage, Vetiver"
  },
  {
    "id": "YSL002",
    "brand": "Yves Saint Laurent",
    "name": "Libre",
    "category": "Women",
    "price": 850,
    "stock": 0,
    "image": "images/libre.jpg",
    "desc": "The floral lavender. The scent of freedom.",
    "notes": "Lavender, Orange Blossom, Musk"
  },
  {
    "id": "JM001",
    "brand": "Jo Malone",
    "name": "English Pear & Freesia",
    "category": "Women",
    "price": 750,
    "stock": 0,
    "image": "images/english-pear.jpg",
    "desc": "The essence of autumn. Sensuous freshness.",
    "notes": "King William Pear, Freesia, Patchouli"
  },
  {
    "id": "JM002",
    "brand": "Jo Malone",
    "name": "Wood Sage & Sea Salt",
    "category": "Unisex",
    "price": 750,
    "stock": 0,
    "image": "images/wood-sage.jpg",
    "desc": "Alive with the mineral scent of the rugged cliffs.",
    "notes": "Ambrette Seeds, Sea Salt, Sage"
  },
  {
    "id": "PR001",
    "brand": "Prada",
    "name": "Paradoxe",
    "category": "Women",
    "price": 920,
    "stock": 0,
    "image": "images/prada-paradoxe.jpg",
    "desc": "A floral ambery fragrance that embraces the paradoxes of iconic ingredients.",
    "notes": "Neroli, Amber, Musk"
  },
  {
    "id": "LL001",
    "brand": "Le Labo",
    "name": "Santal 33",
    "category": "Unisex",
    "price": 1400,
    "stock": 0,
    "image": "images/santal33.jpg",
    "desc": "A defining image of the spirit of the American West.",
    "notes": "Cardamom, Iris, Violet, Ambrox"
  },
  {
    "id": "V001",
    "brand": "Versace",
    "name": "Eros",
    "category": "Men",
    "price": 700,
    "stock": 0,
    "image": "images/eros.jpg",
    "desc": "Sublime masculinity through a luminous aura.",
    "notes": "Mint, Green Apple, Tonka Bean"
  },
  {
    "id": "CHH001",
    "brand": "Carolina Herrera",
    "name": "Good Girl",
    "category": "Women",
    "price": 880,
    "stock": 0,
    "image": "images/good-girl.jpg",
    "desc": "A bold blend of dark and light elements.",
    "notes": "Almond, Tuberose, Cocoa"
  },
  {
    "id": "PM001",
    "brand": "Parfums de Marly",
    "name": "Delina",
    "category": "Women",
    "price": 1350,
    "stock": 0,
    "image": "images/delina.jpg",
    "desc": "A floral bouquet structured with Turkish rose.",
    "notes": "Lychee, Rhubarb, Vanilla"
  },
  {
    "id": "LV001",
    "brand": "Louis Vuitton",
    "name": "Ombre Nomade",
    "category": "Unisex",
    "price": 1600,
    "stock": 0,
    "image": "images/ombre.jpg",
    "desc": "Designed for lovers of rare essences, Ombre Nomade concentrates that sensation of infinity.",
    "notes": "Oud, Benzoin, Incense"
  },
  {
    "id": "VAL001",
    "brand": "Valentino",
    "name": "Born In Roma",
    "category": "Women",
    "price": 900,
    "stock": 0,
    "image": "images/born-roma.jpg",
    "desc": "A modern floral haute couture fragrance.",
    "notes": "Blackcurrant, Jasmine, Vanilla"
  },
  {
    "id": "AR001",
    "brand": "Armani",
    "name": "Acqua Di Gio",
    "category": "Men",
    "price": 750,
    "stock": 0,
    "image": "images/adg.jpg",
    "desc": "A mythical, fresh and aquatic fragrance.",
    "notes": "Marine Notes, Bergamot, Cedar"
  }
];

export default products;
