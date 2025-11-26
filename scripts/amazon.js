import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

let productHTML = '';
products.forEach(product => {
  productHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)} 
          </div>

          <div class="product-quantity-container">
            <select class = 'js-product-quantity'>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
           Data-product-id = "${product.id}"
           Data-product-image = "${product.image}"
           Data-product-name = "${product.name}"
           Data-product-price-cents = "${(product.priceCents / 100).toFixed(2)}"
           Data-product-rating-count = "${product.rating.count}"
           Data-product-rating-stars = "images/ratings/rating-${product.rating.stars * 10}.png">
            Add to Cart
          </button>
        </div>`
})

document.querySelector('.js-products-grid').innerHTML = productHTML;


document.querySelectorAll('.js-add-to-cart').forEach(button => {
  button.addEventListener('click', () =>{

    let productId = button.dataset.productId;
    let productName = button.dataset.productName;
    let productImage = button.dataset.productImage;
    let productPriceCents = button.dataset.productPriceCents;
    let productRatingCount = button.dataset.productRatingCount;
    let productRatingStars = button.dataset.productRatingStars;

    const productQuantity = Number(button.closest('.product-container').querySelector(`.js-product-quantity`).value);
    console.log(productQuantity);

    let matchingItem;
    cart.forEach(item => {
      if(item.productId === productId){
        matchingItem = item;
      };
    });

    if(matchingItem){
      matchingItem.quantity += productQuantity;
    }else{
      cart.push({
      productId,
      productName,
      productImage,
      productPriceCents,
      productRatingCount,
      productRatingStars,
      quantity : productQuantity
    });
    }

    let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += item.quantity;
    });
  
    
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;

    let parent = button.closest('.product-container');
    parent.querySelector('.js-added-to-cart').style.opacity = 1;

    setTimeout(() => {
      parent.querySelector('.js-added-to-cart').style.opacity = 0;
    },3000);


console.log(cart);
  });
  
});