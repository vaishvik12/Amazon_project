export let cart = [{
productId :"3ebe75dc-64d2-4137-8860-1f5a963e534b", // --> data deduplication/data normalization
quantity : 1 
}, 
{
  productId :"8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
quantity : 2
},
{
  productId :"dd82ca78-a18b-4e2a-9250-31e67412f98d",
quantity : 4
}];

export function addToCart(productId){
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
};
