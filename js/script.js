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

const productsGrid = document.getElementById("products-grid");

function renderProducts() {

    const button = card.querySelector("button");
    button.addEventListener("click", () => addToCart(product.id));

  productsGrid.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.price} ₽</p>
      <button data-id="${product.id}">Добавить в корзину</button>
    `;

    productsGrid.appendChild(card);
  });
}

renderProducts();


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

function updateCartInfo() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = totalCount;
  cartTotal.textContent = totalPrice;
}

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Корзина пуста</p>";
    updateCartInfo();
    return;
  }

  cart.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
  <span>${item.title}</span>
  <span>${item.quantity} шт.</span>
  <span>${item.price * item.quantity} ₽</span>
  <button class="remove-btn">Удалить</button>`;

    cartItem.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(item.id);
    });

    cartItems.appendChild(cartItem);
  });

  cartItem.innerHTML = `
  <span>${item.title}</span>
  <div class="cart-controls">
    <button class="decrease-btn">-</button>
    <span>${item.quantity}</span>
    <button class="increase-btn">+</button>
  </div>
  <span>${item.price * item.quantity} ₽</span>
  <button class="remove-btn">Удалить</button>
`;
cartItem.querySelector(".decrease-btn").addEventListener("click", () => {
  changeQuantity(item.id, -1);
});

cartItem.querySelector(".increase-btn").addEventListener("click", () => {
  changeQuantity(item.id, 1);
});


  updateCartInfo();
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
  saveCart();
}

function changeQuantity(productId, amount) {
  const item = cart.find(product => product.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  renderCart();
  saveCart();
}

renderProducts();
renderCart();