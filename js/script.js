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