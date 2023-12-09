import { swiper } from './swiper.js';

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
    const { image, price, title, id } = product;
    createCardProduct(image, price, title, id);
  });


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


  const listBasket = document.querySelector('#basket-btn');
  const shopingList = document.querySelector('#basket');

  listBasket.addEventListener('click', () => {
    shopingList.classList.add('basket-modal-window_show');
  });
  
  const cancelListBasketBtn = document.querySelector('.reset-button');

  cancelListBasketBtn.addEventListener('click', () => {
    shopingList.classList.remove('basket-modal-window_show');
  });
  

  // const quickView = document.querySelector('.label-quick-view');

  const listCardsProduct = document.querySelector('.box-cards-product');
  let isImgViewAdded = false;
  let imgView;

  listCardsProduct.addEventListener('click', function (event) {

    if (event.target.classList.contains('label-quick-view')) {
      const cardProductItem = event.target.closest('.box-cards-product__item');

      const imageCardItem = products.filter((element) => element.id === +cardProductItem.id);
      const linkToPicture = imageCardItem[0].image;

      if(!isImgViewAdded) {
      imgView = document.createElement('img');
      imgView.classList.add('image-view-box');
      imgView.src = linkToPicture;
      listCardsProduct.append(imgView);
      isImgViewAdded = true;
      }
    };

    if (event.target.classList.contains('image-view-box') && isImgViewAdded) {
      imgView.remove();
      isImgViewAdded = false;
    }
  });

  

  // document.addEventListener('click', function (event) {
  //   if (event.target.classList.contains('image-view-box') && isImgViewAdded) {
  //     imgView.remove();
  //     isImgViewAdded = false;
  //   }
  // });
  


  // quickView.addEventListener('click', (event) => {
  //   const cardProductItem = event.target.closest('.box-cards-product__item');
  //   console.log(cardProductItem);
  // });



  // --------------------- End your code ---------------------
};
runWildberriesApplication();
