export let deliveryOptions = [{
  id : 1,
  deliveryTime : 7,
  priceCents : 0
},{
  id : 2,
  deliveryTime : 5,
  priceCents : 499
},{
  id : 3,
  deliveryTime : 1,
  priceCents : 999
}];

export function findDeliveryOption(cartItem){
  return deliveryOptions.find(
    option => option.id === cartItem.deliveryOptionId
  ) || deliveryOptions[0];
}