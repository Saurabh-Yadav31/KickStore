// data.js
// Single source of truth for all KickStore product data.

(function(){
  const productsLocal = [

  // ── JERSEYS ────────────────────────────────────────────────
  {
    id: 1,
    name: "Argentina Home Jersey 2026",
    category: "Jerseys",
    price: 1299,
    stock: "In Stock",
    rating: 4.9,
    description: "Official adidas replica, lightweight Aeroready fabric",
    image: "./images/argentina-home-jersey.avif"
  },
  {
    id: 2,
    name: "Brazil Away Jersey 2026",
    category: "Jerseys",
    price: 1299,
    stock: "In Stock",
    rating: 4.7,
    description: "Nike Dri-FIT technology, classic yellow and green design",
    image: "./images/brasil-away-jersey.webp"
  },
  {
    id: 3,
    name: "France Home Jersey 2026",
    category: "Jerseys",
    price: 1399,
    stock: "Low Stock",
    rating: 4.8,
    description: "Nike vapor knit, deep blue with gold badge detailing",
    image: "./images/france-home-jersey.webp"
  },
  {
    id: 4,
    name: "Portugal Home Jersey 2026",
    category: "Jerseys",
    price: 1349,
    stock: "In Stock",
    rating: 4.8,
    description: "Nike Dri-FIT ADV, iconic red and green with CR7 legacy",
    image: "./images/portugal-home-jersey.webp"
  },
  {
    id: 5,
    name: "Germany Away Jersey 2026",
    category: "Jerseys",
    price: 1199,
    stock: "Out of Stock",
    rating: 4.4,
    description: "Adidas classic black away kit, clean minimal design",
    image: "./images/germany-away-jersey.webp"
  },

  // ── FOOTBALLS ──────────────────────────────────────────────
  {
    id: 6,
    name: "Adidas AlVolante Match Ball",
    category: "Footballs",
    price: 3499,
    stock: "In Stock",
    rating: 4.8,
    description: "Official FIFA World Cup 2026 match ball, size 5",
    image: "./images/adidas-football.avif"
  },
  {
    id: 7,
    name: "Nike Premier League Training Ball",
    category: "Footballs",
    price: 1299,
    stock: "In Stock",
    rating: 4.3,
    description: "Durable machine-stitched training ball for all surfaces",
    image: "./images/nike-ball.jpg"
  },
  {
    id: 8,
    name: "Puma Orbita World Cup Replica",
    category: "Footballs",
    price: 1899,
    stock: "Low Stock",
    rating: 4.5,
    description: "World Cup 2026 replica ball, 32-panel design, size 5",
    image: "./images/puma-ball.jpeg"
  },

  // ── BOOTS ──────────────────────────────────────────────────
  {
    id: 9,
    name: "Adidas Predator Elite FG Boots",
    category: "Boots",
    price: 4999,
    stock: "Low Stock",
    rating: 4.9,
    description: "Controlskin upper with hybrid stud configuration, firm ground",
    image: "./images/adidas-prediators.avif"
  },
  {
    id: 10,
    name: "Nike Phantom GX Pro FG Boots",
    category: "Boots",
    price: 4499,
    stock: "In Stock",
    rating: 4.7,
    description: "Gripknit collar, precision fit, ideal for technical players",
    image: "./images/nike-boots.jpeg"
  },
  {
    id: 11,
    name: "Puma Future 7 Ultimate FG Boots",
    category: "Boots",
    price: 3299,
    stock: "In Stock",
    rating: 4.5,
    description: "FUZIONFIT+ compression band, adaptive fit for all foot shapes",
    image: "./images/puma-boots.jpeg"
  },

  // ── SCARVES & CAPS ─────────────────────────────────────────
  {
    id: 12,
    name: "Argentina Fan Scarf 2026",
    category: "Scarves & Caps",
    price: 449,
    stock: "In Stock",
    rating: 4.6,
    description: "Soft knitted scarf, blue and white stripes, official WC badge",
    image: "./images/argentina-scarf.jpeg"
  },
  {
    id: 13,
    name: "Brazil Bucket Hat 2026",
    category: "Scarves & Caps",
    price: 599,
    stock: "In Stock",
    rating: 4.2,
    description: "100% cotton, embroidered crest, one size fits all",
    image: "./images/brazil-bucket-hat.jpeg"
  },

  // ── POSTERS & COLLECTIBLES ────────────────────────────────
  {
    id: 14,
    name: "FIFA World Cup 2026 Sticker Album",
    category: "Posters & Collectibles",
    price: 349,
    stock: "Low Stock",
    rating: 4.7,
    description: "Official sticker album featuring teams and tournament moments",
    image: "./images/sticker-album.jpeg"
  },
  {
    id: 15,
    name: "Messi Framed Poster — World Cup 2026",
    category: "Posters & Collectibles",
    price: 899,
    stock: "In Stock",
    rating: 4.9,
    description: "Premium matte finish framed poster for collectors",
    image: "./images/messi-poster.jpeg"
  }

  ];

  // Expose to browser fallback
  if (typeof window !== "undefined") {
    window.productsData = productsLocal;
  }

  // Export for Node.js (used by backend seed script)
  if (typeof module !== "undefined" && module.exports) {
    module.exports = productsLocal;
  }
})();