const checkoutItemsEl = document.getElementById("checkout-items");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const discountEl = document.getElementById("discount");
const grandTotalEl = document.getElementById("grand-total");

const promoInput = document.getElementById("promo-input");
const applyPromoBtn = document.getElementById("apply-promo-btn");
const promoMsgEl = document.getElementById("promo-msg");

const orderForm = document.getElementById("order-form");
const studentNameInput = document.getElementById("student-name");
const rollNumberInput = document.getElementById("roll-number");
const orderMsgEl = document.getElementById("order-msg");
const cartStorageKey = "campus_cart";

function loadCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(cartStorageKey) || "[]");
    if (!Array.isArray(savedCart)) return [];

    return savedCart.filter((item) =>
      item &&
      typeof item.name === "string" &&
      Number.isFinite(Number(item.price)) &&
      Number(item.price) >= 0 &&
      Number.isInteger(Number(item.qty)) &&
      Number(item.qty) > 0
    ).map((item) => ({
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
let discountAmount = 0;

function calculateSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCheckout() {
  checkoutItemsEl.innerHTML = "";

  if (cart.length === 0) {
    checkoutItemsEl.innerHTML = '<li class="empty-state">No items found in your order.</li>';
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-row";
      const name = document.createElement("span");
      name.textContent = `${item.name} × ${item.qty}`;
      const price = document.createElement("span");
      price.textContent = `₹${(item.price * item.qty).toFixed(2)}`;
      li.append(name, price);
      checkoutItemsEl.appendChild(li);
    });
  }

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.05;
  const grandTotal = Math.max(0, subtotal + tax - discountAmount);

  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  discountEl.textContent = discountAmount.toFixed(2);
  grandTotalEl.textContent = grandTotal.toFixed(2);
}

applyPromoBtn.addEventListener("click", () => {
  const promoCode = promoInput.value.trim().toUpperCase();
  const subtotal = calculateSubtotal();
  discountAmount = 0;
  promoMsgEl.classList.remove("msg-success");
  promoMsgEl.classList.add("msg-error");

  if (promoCode !== "STUDENT15") {
    promoMsgEl.textContent = "That promo code is invalid. Please try STUDENT15.";
  } else if (subtotal < 150) {
    promoMsgEl.textContent = "STUDENT15 requires a subtotal of at least ₹150.";
  } else {
    discountAmount = subtotal * 0.15;
    promoMsgEl.textContent = "STUDENT15 applied: 15% off your subtotal.";
    promoMsgEl.classList.replace("msg-error", "msg-success");
  }

  renderCheckout();
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  orderMsgEl.classList.remove("msg-success");
  orderMsgEl.classList.add("msg-error");

  if (cart.length === 0) {
    orderMsgEl.textContent = "Your cart is empty. Return to the menu and add items before confirming.";
    return;
  }

  if (!studentNameInput.value.trim() || !rollNumberInput.value.trim()) {
    orderMsgEl.textContent = "Please enter your full name and roll number.";
    return;
  }

  const orderId = `CC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  localStorage.removeItem(cartStorageKey);
  cart = [];
  discountAmount = 0;
  renderCheckout();
  orderMsgEl.textContent = `Order confirmed! Your Order ID is ${orderId}.`;
  orderMsgEl.classList.replace("msg-error", "msg-success");
  orderForm.reset();
});

renderCheckout();
