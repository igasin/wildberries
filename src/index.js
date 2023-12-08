import { swiper } from "./swiper.js";

const getWildberriesData = async () => {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (response) => response.json()
  );
  const users = await fetch("https://fakestoreapi.com/users").then((response) =>
    response.json()
  );

  return {
    products,
    users,
  };
};

const runWildberriesApplication = async () => {
  const { users, products } = await getWildberriesData();
  console.log(users, products);

  // --------------------- Write your code ---------------------

  const boxCardsProduct = document.querySelector(".box-cards-product");

  function createCardProduct(imageCard, priceCard, titleCard) {
    const cardProduct = document.createElement("div");
    cardProduct.classList.add("box-cards-product__item");
    boxCardsProduct.append(cardProduct);

    const boxCardProductImage = document.createElement("div");
    boxCardProductImage.classList.add("box-cards-product__item-image");

    const cardProductImage = document.createElement("img");
    cardProductImage.classList.add("img-card-product");
    cardProductImage.src = imageCard;

    const labelQuickView = document.createElement("h5");
    labelQuickView.classList.add("label-quick-view");
    labelQuickView.textContent = "quick view";

    const discountPercentItem = document.createElement("span");
    discountPercentItem.classList.add("span");
    discountPercentItem.textContent = "Discount -10%";

    const addToBasket = document.createElement("button");
    addToBasket.classList.add("button-add-to-basket");

    const discountPriceItem = document.createElement("span");
    discountPriceItem.textContent = `New price ${(priceCard * 0.9).toFixed(
      2
    )} $`;

    const priceItem = document.createElement("span");
    priceItem.classList.add("span__line-through");
    priceItem.textContent = `Old Price ${priceCard} $`;

    const productName = document.createElement("h3");
    productName.classList.add("h3");
    productName.textContent = titleCard;

    boxCardProductImage.append(cardProductImage, labelQuickView);
    cardProduct.append(
      boxCardProductImage,
      discountPercentItem,
      addToBasket,
      discountPriceItem,
      priceItem,
      productName
    );
  }

  products.forEach((product) => {
    const { image, price, title } = product;
    createCardProduct(image, price, title);
  });


  const searchInput = document.querySelector("#search-input");

  searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery)
    );

    boxCardsProduct.innerHTML = "";

    filteredProducts.forEach((product) => {
      const { image, price, title } = product;
      createCardProduct(image, price, title);
    });
  });

  // --------------------- End your code ---------------------
};
runWildberriesApplication();
