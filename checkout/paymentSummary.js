import { getProduct } from "../data/products.js";
import { cart } from "../data/cart.js";
import { findDeliveryOption } from "../data/deliveryOptions.js";
import { convertPrice } from "../Modules/convertPrice.js";
 
export function renderPaymentSummary(){

let productPriceCents = 0;
let deliveryPrice = 0;
let cartQuantity = 0;

cart.forEach(cartItem => {
  const product =  getProduct(cartItem.productId);
  productPriceCents += cartItem.quantity * product.priceCents;
  
  let deliveryOption = findDeliveryOption(cartItem);
  deliveryPrice += deliveryOption.priceCents;

  cartQuantity += cartItem.quantity;
})
const totalBeforeTax = productPriceCents + deliveryPrice;
const estimatedTax = totalBeforeTax * 0.1;
const priceAfterTax = totalBeforeTax + estimatedTax;

const paymentSummaryHtml = `
   <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${convertPrice(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${convertPrice(deliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${convertPrice(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${convertPrice(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${convertPrice(priceAfterTax)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
`

document.querySelector('.js-payment-summary')
  .innerHTML = paymentSummaryHtml;
}