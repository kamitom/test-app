const ready = () => {
  let removeCartItemButtons = document.getElementsByClassName('btn-danger');
  console.log(removeCartItemButtons);
  for (let index = 0; index < removeCartItemButtons.length; index++) {
    const button = removeCartItemButtons[index];

    button.addEventListener('click', removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName('cart-quantity-input');
  // console.log('qty input: ', quantityInputs);
  for (let index = 0; index < quantityInputs.length; index++) {
    const input = quantityInputs[index];
    input.addEventListener('change', quantityChanged);
  }

  let addToCartButtons = document.getElementsByClassName('shop-item-button');
  for (let index = 0; index < addToCartButtons.length; index++) {
    const button = addToCartButtons[index];
    button.addEventListener('click', addToCartClicked);
  }

  document
    .getElementsByClassName('btn-purchase')[0]
    .addEventListener('click', purchaseClicked);
};

const purchaseClicked = () => {
  alert('thank you for your purchase');
  let cartItems = document.getElementsByClassName('cart-items')[0];

  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
};

const addToCartClicked = (event) => {
  // console.log('addToCart clicked: ', event.target);
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  console.log('shop-item: ', shopItem);
  let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  // console.log(title, price, imageSrc);

  addItemToCart(title, price, imageSrc);
  updateCartTotal();
};

const addItemToCart = (title, price, imageSrc) => {
  console.log(title, price, imageSrc);
  let cartRow = document.createElement('div');
  // cartRow.innerText = title;
  cartRow.classList.add('cart-row');
  let cartItems = document.getElementsByClassName('cart-items')[0];
  let cartItemNames = document.getElementsByClassName('cart-item-title');
  for (let index = 0; index < cartItemNames.length; index++) {
    // const element = cartItemNames[index].innerText;
    // console.log('element: ', element);
    if (cartItemNames[index].innerText == title) {
      alert('the item is already added to the cart.');
      return;
    }
  }

  let cartRowContents = `
  <div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src="${imageSrc}"
              width="100"
              height="100"
              alt=""
            />
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">$${price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" />
            <button class="btn btn-danger cart-quantity-button" role="button">
              REMOVE
            </button>
          </div>
  `;

  cartRow.innerHTML = cartRowContents;

  cartItems.append(cartRow);

  cartRow
    .getElementsByClassName('btn-danger')[0]
    .addEventListener('click', removeCartItem);
  cartRow
    .getElementsByClassName('cart-quantity-input')[0]
    .addEventListener('change', quantityChanged);
};

const quantityChanged = (event) => {
  console.log('changed!');
  console.log(event.target);

  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
};

const removeCartItem = (event) => {
  // console.log('clicked!!!!');
  // console.log(event.target);
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
};

const updateCartTotal = () => {
  let cartItemContainer = document.getElementsByClassName('cart-items')[0];
  let cartRows = cartItemContainer.getElementsByClassName('cart-row');
  let total = 0;
  for (let index = 0; index < cartRows.length; index++) {
    let cartRow = cartRows[index];
    let priceElement = cartRow.getElementsByClassName('cart-price')[0];
    let quantityElement = cartRow.getElementsByClassName(
      'cart-quantity-input'
    )[0];

    let price = parseFloat(priceElement.innerText.replace('$', ''));
    let quantity = parseInt(quantityElement.value);
    total = total + price * quantity;
    console.log('total: ', total);
    console.log(quantityElement, priceElement);
  }

  total = Math.round(total * 100) / 100;

  document.getElementsByClassName('cart-total-price')[0].innerText =
    '$' + total;
};

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
