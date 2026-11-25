const menuGrid = document.getElementById("menu-grid");
const cartList = document.getElementById("cart-list");
const cartSubtotalEl = document.getElementById("cart-subtotal");
const cartCountEl = document.getElementById("cart-count");
const cartMsgEl = document.getElementById("cart-msg");
const checkoutBtn = document.getElementById("checkout-btn");
const searchInput = document.getElementById("search-input");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartStorageKey = "campus_cart";

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(cartStorageKey) || "[]");
    if (!Array.isArray(savedCart)) return [];

    return savedCart.filter((item) =>
      item &&
      Number.isInteger(Number(item.id)) &&
      typeof item.name === "string" &&
      Number.isFinite(Number(item.price)) &&
      Number(item.price) >= 0 &&
      Number.isInteger(Number(item.qty)) &&
      Number(item.qty) > 0
    ).map((item) => ({
      id: Number(item.id),
      name: item.name,
      price: Number(item.price),
      qty: Number(item.qty)
    }));
  } catch (error) {
    console.error("Could not read the saved cart.", error);
    return [];
  }
}

let cart = loadCart();
let activeCategory = "all";

function renderMenu(items) {
  menuGrid.innerHTML = "";

  if (items.length === 0) {
    menuGrid.innerHTML = '<p class="empty-state">No menu items match your search.</p>';
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.name;

    const header = document.createElement("div");
    header.className = "card-header";
    const category = document.createElement("span");
    category.className = "category-tag";
    category.textContent = item.category;
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = `₹${item.price}`;
    header.append(category, price);

    const name = document.createElement("h3");
    name.textContent = item.name;
    const description = document.createElement("p");
    description.textContent = item.description;
    description.className = "item-description";

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "btn btn-primary add-btn";
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(item.id));

    card.append(image, header, name, description, addButton);
    menuGrid.appendChild(card);
  });
}

function filterMenu() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  renderMenu(filteredItems);
}

function addToCart(itemId) {
  const found = MENU_ITEMS.find((item) => item.id === itemId);
  if (!found) return;

  const existingItem = cart.find((item) => item.id === itemId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: found.id,
      name: found.name,
      price: Number(found.price),
      qty: 1
    });
  }

  cartMsgEl.textContent = "";
  saveCart();
  renderCart();
}

function changeQuantity(itemId, amount) {
  const item = cart.find((entry) => entry.id === itemId);
  if (!item) return;

  item.qty += amount;
  if (item.qty <= 0) {
    cart = cart.filter((entry) => entry.id !== itemId);
  }

  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function renderCart() {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = '<li class="empty-state">Your cart is empty.</li>';
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-row";

      const name = document.createElement("span");
      name.textContent = `${item.name} (x${item.qty})`;

      const controls = document.createElement("div");
      controls.className = "qty-controls";
      const decrement = document.createElement("button");
      decrement.type = "button";
      decrement.className = "qty-btn";
      decrement.textContent = "−";
      decrement.setAttribute("aria-label", `Remove one ${item.name}`);
      decrement.addEventListener("click", () => changeQuantity(item.id, -1));

      const increment = document.createElement("button");
      increment.type = "button";
      increment.className = "qty-btn";
      increment.textContent = "+";
      increment.setAttribute("aria-label", `Add one ${item.name}`);
      increment.addEventListener("click", () => changeQuantity(item.id, 1));

      const price = document.createElement("span");
      price.textContent = `₹${(item.price * item.qty).toFixed(2)}`;
      controls.append(decrement, increment);
      li.append(name, controls, price);
      cartList.appendChild(li);
    });
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  cartSubtotalEl.textContent = subtotal.toFixed(2);
  cartCountEl.textContent = itemCount;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.category;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    filterMenu();
  });
});

searchInput.addEventListener("input", filterMenu);

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    cartMsgEl.textContent = "Add at least one item before proceeding to checkout.";
    return;
  }

  window.location.href = "pages/checkout.html";
});

filterMenu();
renderCart();
