const products = [
  {
    id: 1,
    title: "Наушники",
    price: 3500,
    image: "assets/images/headphones.jpg"
  },
  {
    id: 2,
    title: "Клавиатура",
    price: 5200,
    image: "assets/images/keyboard.jpg"
  },
  {
    id: 3,
    title: "Мышь",
    price: 2400,
    image: "assets/images/mouse.jpg"
  },
  {
    id: 4,
    title: "Монитор",
    price: 18900,
    image: "assets/images/monitor.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsGrid = document.getElementById("products-grid");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartFinalTotal = document.getElementById("cart-final-total");

const openOrderModalBtn = document.getElementById("open-order-modal");
const closeOrderModalBtn = document.getElementById("close-order-modal");
const orderModal = document.getElementById("order-modal");
const orderForm = document.getElementById("order-form");
const orderMessage = document.getElementById("order-message");

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderProducts() {
  productsGrid.innerHTML = "";

  products.forEach(product => {
    const article = document.createElement("article");
    article.className = "product-card";

    article.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="product-price">${product.price} ₽</p>
      <button data-id="${product.id}">Добавить в корзину</button>
    `;

    const button = article.querySelector("button");
    button.addEventListener("click", () => addToCart(product.id));

    productsGrid.appendChild(article);
  });
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
}

function changeQuantity(productId, amount) {
  const cartItem = cart.find(item => item.id === productId);

  if (!cartItem) return;

  cartItem.quantity += amount;

  if (cartItem.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Корзина пуста</p>`;
  } else {
    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <div>
          <h3>${item.title}</h3>
          <p>${item.price} ₽ за штуку</p>
        </div>

        <div>
          <strong>${item.price * item.quantity} ₽</strong>
        </div>

        <div class="cart-controls">
          <button class="decrease-btn">-</button>
          <span>${item.quantity}</span>
          <button class="increase-btn">+</button>
        </div>

        <div>
          <button class="remove-btn">Удалить</button>
        </div>
      `;

      div.querySelector(".decrease-btn").addEventListener("click", () => {
        changeQuantity(item.id, -1);
      });

      div.querySelector(".increase-btn").addEventListener("click", () => {
        changeQuantity(item.id, 1);
      });

      div.querySelector(".remove-btn").addEventListener("click", () => {
        removeFromCart(item.id);
      });

      cartItems.appendChild(div);
    });
  }

  const total = getCartTotal();
  const count = getCartCount();

  cartCount.textContent = count;
  cartTotal.textContent = total;
  cartFinalTotal.textContent = total;
}

openOrderModalBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Корзина пуста");
    return;
  }

  orderModal.classList.remove("hidden");
});

closeOrderModalBtn.addEventListener("click", () => {
  orderModal.classList.add("hidden");
});

orderForm.addEventListener("submit", event => {
  event.preventDefault();

  orderMessage.textContent = "Заказ создан!";
  cart = [];
  saveCart();
  renderCart();
  orderForm.reset();
});

renderProducts();
renderCart();