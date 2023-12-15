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

  function createCardProduct(imageCard, priceCard, titleCard, idCard) {
    const cardProduct = document.createElement("div");
    cardProduct.classList.add("box-cards-product__item");
    cardProduct.id = idCard;
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
    discountPriceItem.textContent = `New price ${(priceCard * 0.9).toFixed(2)} $`;

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

  function renderProducts(products) {
    products.forEach((product) => {
      const { image, price, title, id } = product;
      createCardProduct(image, price, title, id);
    });
  }

  renderProducts(products);

  function handleSearchInput() {
    const searchInput = document.querySelector("#search-input");

    searchInput.addEventListener("input", () => {
      const searchQuery = searchInput.value.toLowerCase().trim();

      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      );

      boxCardsProduct.innerHTML = "";

      filteredProducts.forEach((product) => {
        const { image, price, title, id } = product;
        createCardProduct(image, price, title, id);
      });
    });
  }

  handleSearchInput();

  function toggleShoppingList() {
    const listBasket = document.querySelector("#basket-btn");
    const shopingList = document.querySelector("#basket");
    const overlay = document.querySelector(".overlay");

    listBasket.addEventListener("click", () => {
      shopingList.classList.toggle("basket-modal-window_show");
      listBasket.style.zIndex = "99";
      overlay.classList.toggle("overlay_active");
    });
  }

  toggleShoppingList();

  const listCardsProduct = document.querySelector(".box-cards-product");
  const basketShopList = document.querySelector(".basket-shoping-list");
  const totalPriceElement = document.querySelector(".total-price");

  let isImgViewAdded = false;
  let imgView;

  listCardsProduct.addEventListener("click", handleProductClick);

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  renderCartItems(cartItems);
  updateTotalPrice(cartItems);

  const cancelListBasketBtn = document.querySelector(".reset-button");
  cancelListBasketBtn.addEventListener("click", cancelBasketList);

  function handleProductClick(event) {
    if (event.target.classList.contains("label-quick-view")) {
      handleQuickView(event);
    }

    if (event.target.classList.contains("image-view-box") && isImgViewAdded) {
      removeImageView();
    }

    if (event.target.classList.contains("button-add-to-basket")) {
      addToBasket(event);
    }
  }

  function handleQuickView(event) {
    const cardProductItem = event.target.closest(".box-cards-product__item");
    const imageCardItem = products.find(
      (element) => element.id === +cardProductItem.id
    );
    const linkToPicture = imageCardItem.image;

    if (!isImgViewAdded) {
      addImageView(linkToPicture);
    }
  }

  function addImageView(linkToPicture) {
    imgView = document.createElement("img");
    imgView.classList.add("image-view-box");
    imgView.src = linkToPicture;
    listCardsProduct.append(imgView);
    isImgViewAdded = true;
  }

  function removeImageView() {
    imgView.remove();
    isImgViewAdded = false;
  }

  function addToBasket(event) {
    const cardProductItem = event.target.closest(".box-cards-product__item");
    const cardItem = products.find(
      (element) => element.id === +cardProductItem.id
    );
    const titleCardItem = cardItem.title;
    const priceCardItem = cardItem.price;

    appendToBasketList(titleCardItem, priceCardItem);
    updateLocalStorage(titleCardItem, priceCardItem);
    updateTotalPrice(cartItems);
  }

  function appendToBasketList(title, price) {
    const titleProduct = document.createElement("span");
    titleProduct.textContent = title;
    titleProduct.classList.add("basket-shoping-list-span");

    const priceProduct = document.createElement("span");
    priceProduct.textContent = price;

    basketShopList.append(titleProduct, priceProduct);
    titleProduct.append(priceProduct);
  }

  function updateLocalStorage(title, price) {
    cartItems.push({ title, price });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function renderCartItems(items) {
    items.forEach((item) => appendToBasketList(item.title, item.price));
  }

  function updateTotalPrice(cartItems) {
    const discount = 0.9;
    const totalPrice =
      cartItems.reduce((sum, item) => sum + item.price, 0) * discount;

    totalPriceElement.textContent = `Discount 10% - Total Price: ${totalPrice.toFixed(2)} $`;
  }

  function cancelBasketList() {
    localStorage.removeItem("cartItems");
    basketShopList.innerHTML = "";
    totalPriceElement.textContent = "Total Price: 0.00 $";
  }

  // --------------------- End your code ---------------------
};
runWildberriesApplication();
