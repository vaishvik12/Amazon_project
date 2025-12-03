export let cart = JSON.parse(localStorage.getItem('cartItem'));

if(!cart){
  cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 1,
    deliveryOptionId : 1
  },{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity : 2,
    deliveryOptionId : 2
  },{
    productId : "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    quantity : 2,
    deliveryOptionId : 3
  }]
}

export function saveToStorage(){
  localStorage.setItem('cartItem',JSON.stringify(cart));
}

export function addToCart(productId,productQuantity){
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
      quantity : productQuantity,
      // default delivery option
      deliveryOptionId : 1
    });
    }
    saveToStorage();
};
