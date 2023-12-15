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

  // products.forEach((product) => {
  //   const { image, price, title, id } = product;
  //   createCardProduct(image, price, title, id);
  // });

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

  const listBasket = document.querySelector("#basket-btn");
  const shopingList = document.querySelector("#basket");

  listBasket.addEventListener("click", () => {
    if (shopingList.classList.contains("basket-modal-window_show")) {
      shopingList.classList.remove("basket-modal-window_show");
    } else {
      shopingList.classList.add("basket-modal-window_show");
    }
  });

  const listCardsProduct = document.querySelector(".box-cards-product");
  let isImgViewAdded = false;
  let imgView;

  listCardsProduct.addEventListener("click", function (event) {
    if (event.target.classList.contains("label-quick-view")) {
      const cardProductItem = event.target.closest(".box-cards-product__item");

      const imageCardItem = products.filter(
        (element) => element.id === +cardProductItem.id
      );
      const linkToPicture = imageCardItem[0].image;

      if (!isImgViewAdded) {
        imgView = document.createElement("img");
        imgView.classList.add("image-view-box");
        imgView.src = linkToPicture;
        listCardsProduct.append(imgView);
        isImgViewAdded = true;
      }
    }

    if (event.target.classList.contains("image-view-box") && isImgViewAdded) {
      imgView.remove();
      isImgViewAdded = false;
    }

    if (event.target.classList.contains("button-add-to-basket")) {
      const cardProductItem = event.target.closest(".box-cards-product__item");

      const cardItem = products.filter(
        (element) => element.id === +cardProductItem.id
      );
      const titleCardItem = cardItem[0].title;
      const priceCardItem = cardItem[0].price;
      console.log(titleCardItem, priceCardItem);

      const titleProduct = document.createElement("span");
      titleProduct.textContent = titleCardItem;
      titleProduct.classList.add("basket-shoping-list-span");

      const priceProduct = document.createElement("span");
      priceProduct.textContent = priceCardItem;
      priceProduct.classList.add("basket-shoping-list-span_price");

      const basketShopList = document.querySelector(".basket-shoping-list");
      basketShopList.append(titleProduct, priceProduct);

      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.push({ title: titleCardItem, price: priceCardItem });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateTotalPrice(cartItems);
    }
  });

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItems.forEach((item) => {
    const titleProduct = document.createElement("span");
    titleProduct.textContent = item.title;
    titleProduct.classList.add("basket-shoping-list-span");

    const priceProduct = document.createElement("span");
    priceProduct.textContent = item.price;
    priceProduct.classList.add("basket-shoping-list-span_price");

    const basketShopList = document.querySelector(".basket-shoping-list");
    basketShopList.append(titleProduct, priceProduct);
  });
  
  const discount = 0.9;
  function updateTotalPrice(cartItems) {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0) * discount;

    const totalPriceElement = document.querySelector(".total-price");
    totalPriceElement.textContent = `Dicount 10% - Total Price: ${totalPrice.toFixed(2)} $`;
    totalPriceElement.classList.add("total-price");

    const totalPriceContainer = document.querySelector(
      ".basket-shoping-list_total-price"
    );
    totalPriceContainer.append(totalPriceElement);
  }
  updateTotalPrice(cartItems);

  const cancelListBasketBtn = document.querySelector(".reset-button");
  cancelListBasketBtn.addEventListener("click", () => {
    localStorage.removeItem("cartItems");

    const basketShopList = document.querySelector(".basket-shoping-list");
    basketShopList.innerHTML = "";
    const totalPriceElement = document.querySelector(".total-price");
    totalPriceElement.textContent = "Total Price: 0.00 $";
  });

  // --------------------- End your code ---------------------
};
runWildberriesApplication();
