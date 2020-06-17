import {call ,select, put, all, takeLatest} from 'redux-saga/effects';

import api from '../../../services/api';


import {formatPrice} from '../../../util/format';

import {AddToCartSuccess , upadateAmountSuccess} from './action';

import {toast} from 'react-toastify'; // animacao de erro ou sucesso 

function* addToCart({id}){
  //nao houver duplicacao de produto
  const productExists = yield select(state => 
    state.cart.find(p => id === id)
  );
//verificar no estoque a quantidade dando erro a chamada api
    const stock = yield call(api.get, `/stock/${id}`);

    const stockAmount = stock.data.amount;
    const currentAmount = productExists ?  productExists.amount : 0;
  
    const amount = currentAmount + 1;
    if(amount > stockAmount ){
      toast.error('Quantidade solicitadada fora do estoque');
         return;
    }
  if(productExists){
    const amount = productExists.amount + 1;
   yield  put(upadateAmountSuccess(id, amount)) 
  }else{
  //chamada da api
  const res= yield call(api.get, `/products/${id}`);

  //add no carinho de compar
  const data = {
    ...res.data,
    amount: 1,
     priceFormatted:formatPrice(res.data.price)
  };
  yield put(AddToCartSuccess(data));
    
  }
  
}


function* updateAmount({id , amount}){
  if(amount <= 0)return ;

     const stock = yield call(api.get, `stock/${id}`);
     const stockAmount = stock.data.amount;

     if(amount > stockAmount ){
      toast.error('Quantidade solicitadada fora do estoque');
         return;
    }
    yield put(upadateAmountSuccess(id, amount));
}


//deixa masi rpaido e um middware
export default all([
  takeLatest('@cart/ADD_RESQUEST' , addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST' , updateAmount)
]);