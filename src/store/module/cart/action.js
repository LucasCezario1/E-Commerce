//adicao no carinho
export function AddToCartRequest(id){
  return{
    type: '@cart/ADD_RESQUEST',
    id,
  };
}

//adicao no carinho
export function AddToCartSuccess(product){
  return{
    type: '@cart/ADD_SUCCESS',
    product,
  };
}

//remocao no carinho
export function removeFromCart(id){
  return{
      type: '@cart/REMOVE', 
      id,
 };

}

// adicionar ou remover conteudo 
export function upadateAmountRequest(id, amount){
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    id,
    amount,
  }
}
 
export function upadateAmountSuccess(id, amount){
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    id,
    amount,
  }
}