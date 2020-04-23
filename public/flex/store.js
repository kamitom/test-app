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
};

const addToCartClicked = (event) => {
  console.log('addToCart clicked: ', event.target);
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
  console.log('clicked!!!!');
  console.log(event.target);
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
