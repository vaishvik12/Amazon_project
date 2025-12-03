import {addToCart, cart, saveToStorage, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
import { convertPrice } from '../Modules/convertPrice.js';

export function renderCart(){
let cartItemHTML = '';
cart.forEach(cartItem => {

  let matchingItem;

  products.forEach(product => {
    if(product.id === cartItem.productId){
      matchingItem = product;
    }
  });

  // find matching delivery option for this cart item; fall back to first option
  let deliveryOption = deliveryOptions.find(
    option => option.id === cartItem.deliveryOptionId
  ) || deliveryOptions[0];

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryTime,'days');
  const deliveryDateFormat = deliveryDate.format('dddd, MMMM D');


cartItemHTML += ` <div class="cart-item-container js-cart-item-container">
  <div class="delivery-date">
    Delivery date: ${deliveryDateFormat}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingItem.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingItem.name}
      </div>
      <div class="product-price">
        $${(matchingItem.priceCents / 100).toFixed(2)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
          Update
        </span>
        <span class="delete-quantity-link link-primary js-delete-quantity"
        data-product-id = ${matchingItem.id}>
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
        ${genrateDeliveryOptions(cartItem)}
    </div>
  </div>
</div>`;
});


document.querySelector('.js-order-summary').innerHTML = cartItemHTML;
addDeleteEventListner();
addEventListnerToRadioButtons()
udpateCheckoutItem();
};


function genrateDeliveryOptions(cartItem){
  let html = ''
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryTime,'days');
      const deliveryDateFormat = deliveryDate.format('dddd, MMMM D');
      const price = deliveryOption.priceCents === 0 ? 'Free' : `$${convertPrice(deliveryOption.priceCents)}`

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;


        html += `<div class="delivery-option">
        <input type="radio"
        ${isChecked ? 'checked' : ''}
          class="delivery-option-input js-delivery-option-input"
          name="delivery-option-${cartItem.productId}"
          data-product-id = ${cartItem.productId}
          data-delivery-option-id = ${deliveryOption.id}>
        <div>
          <div class="delivery-option-date">
            ${deliveryDateFormat}
          </div>
          <div class="delivery-option-price">
           ${price} - Shipping
          </div>
        </div>
      </div>`
    });
    return html;
};

function addDeleteEventListner(){
document.querySelectorAll('.js-delete-quantity')
  .forEach((deleteButton) => {
    deleteButton.addEventListener('click', ()=> {
      let productId = deleteButton.dataset.productId;
      cart.forEach((cartItem,index) => {
          if(productId === cartItem.productId){
            cart.splice(index,1);
          }
      });
      saveToStorage();
      renderCart();
    });
  });
};

function udpateCheckoutItem(){
      let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += item.quantity;
    });
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
};

function addEventListnerToRadioButtons(){
  document.querySelectorAll('.js-delivery-option-input').forEach(radio => {
    radio.addEventListener('change', () => {
    const deliveryOptionId = radio.dataset.deliveryOptionId;
    const productId = radio.dataset.productId;
      updateDeliveryOption(productId,deliveryOptionId);
      renderCart();
    })
  })
}

// renderCart();