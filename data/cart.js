export let cart = JSON.parse(localStorage.getItem('cartItem')) || [];

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
      quantity : productQuantity
    });
    }
    saveToStorage();
};
