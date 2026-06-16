// =====================================================
// KICKSTORE - PRODUCT SEARCH LOGIC
// =====================================================

// ---------- DOM ELEMENTS ----------
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll("#category-filters button");
const productsGrid = document.getElementById("products-grid");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");
const resetButton = document.getElementById("reset-button");

// ---------- APP STATE ----------
let selectedCategory = "All";
let currentSearchTerm = "";
let products = [];
const apiBaseUrl = "http://localhost:5000";

// ---------- HELPER: FORMAT PRICE ----------
function formatPrice(price) {
  return `₹${price}`;
}

// ---------- HELPER: STOCK CLASS ----------
function getStockClass(stock) {
  if (stock === "In Stock") return "in-stock";
  if (stock === "Low Stock") return "low-stock";
  return "out-of-stock";
}

// ---------- RENDER PRODUCTS ----------
function renderProducts(productList) {
  productsGrid.innerHTML = "";

  productList.forEach((product) => {
    const card = document.createElement("article");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>

      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-description">${product.description}</p>

        <div class="product-meta">
          <p class="product-price">${formatPrice(product.price)}</p>
          <span class="product-stock ${getStockClass(product.stock)}">${product.stock}</span>
        </div>

        <p class="product-rating">⭐ ${product.rating}</p>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

// ---------- FILTER PRODUCTS ----------
function getFilteredProducts() {
  return products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(currentSearchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });
}

// ---------- UPDATE RESULTS COUNT ----------
function updateResultsCount(count) {
  const trimmedSearch = currentSearchTerm.trim();

  if (trimmedSearch && selectedCategory !== "All") {
    resultsCount.textContent = `Showing ${count} results for "${trimmedSearch}" in ${selectedCategory}`;
  } else if (trimmedSearch) {
    resultsCount.textContent = `Showing ${count} results for "${trimmedSearch}"`;
  } else if (selectedCategory !== "All") {
    resultsCount.textContent = `Showing ${count} products in ${selectedCategory}`;
  } else {
    resultsCount.textContent = `Showing ${count} products`;
  }
}

// ---------- UPDATE UI ----------
function updateUI() {
  const filteredProducts = getFilteredProducts();

  if (filteredProducts.length > 0) {
    renderProducts(filteredProducts);
    productsGrid.classList.remove("hidden");
    emptyState.classList.add("hidden");
  } else {
    productsGrid.classList.add("hidden");
    emptyState.classList.remove("hidden");
  }

  updateResultsCount(filteredProducts.length);
}

// ---------- SEARCH INPUT ----------
// Debounce helper
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

// Perform search against backend (or fallback to local data)
async function performSearch() {
  const q = currentSearchTerm.trim();
  const category = selectedCategory;

  // Build endpoint
  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (category && category !== 'All') params.set('category', category);

  const url = params.toString()
    ? `${apiBaseUrl}/api/products/search?${params.toString()}`
    : `${apiBaseUrl}/api/products`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('API error');
    products = await res.json();
  } catch (err) {
    console.warn('Search failed, using local data fallback', err);
    if (typeof window !== 'undefined' && window.productsData) products = window.productsData;
  }

  updateUI();
}

const debouncedSearch = debounce(performSearch, 300);

searchInput.addEventListener('input', () => {
  currentSearchTerm = searchInput.value;
  debouncedSearch();
});

// ---------- FETCH PRODUCTS ----------
async function fetchProducts() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/products`);
    if (!response.ok) {
      throw new Error("API response not OK");
    }
    products = await response.json();
  } catch (error) {
    console.warn("Failed to load products from backend, using local data.", error);
    if (typeof window !== "undefined" && window.productsData) {
      products = window.productsData;
    }
  }
  updateUI();
}

// ---------- INITIAL FETCH ----------
fetchProducts();

// ---------- CATEGORY BUTTONS ----------
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    selectedCategory = button.dataset.category;
      // trigger a server-side search when category changes
      performSearch();
  });
});

// ---------- RESET BUTTON ----------
resetButton.addEventListener("click", () => {
  currentSearchTerm = "";
  selectedCategory = "All";
  searchInput.value = "";

  categoryButtons.forEach((btn) => btn.classList.remove("active"));
  categoryButtons[0].classList.add("active");
  // reload from server / fallback
  performSearch();
});