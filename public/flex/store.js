if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}

function ready() {
  let removeCartItemButtons = document.getElementsByClassName('btn-danger');
  console.log(removeCartItemButtons);
  for (let index = 0; index < removeCartItemButtons.length; index++) {
    const button = removeCartItemButtons[index];

    button.addEventListener('click', removeCartItem);
  }
}

function removeCartItem(event) {
  console.log('clicked!!!!');
  console.log(event.target);
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

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

  document.getElementsByClassName('cart-total-price')[0].innerText =
    '$' + total;
};
