import React from 'react';
import {connect} from 'react-redux';

import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete} from 'react-icons/md';
import { Container, ProductTable , Total } from './styles';

import { formatPrice} from '../../util/format'; // preco

//Actions
import  {bindActionCreators} from 'redux';
import * as CartActions from '../../store/module/cart/action';

function Cart({cart, total, removeFromCart, upadateAmountRequest}) {

//adiconar ao carinho
  function increment(product){
    upadateAmountRequest(product.id, product.amount + 1);
  }

//remover ao carinho
  function decrement(product){
    upadateAmountRequest(product.id, product.amount - 1);
  }

  return( 
  <Container>
    <ProductTable>
      <thead>
        <tr>
          <th />
           <th>Produto</th>
            <th>QTD</th>
            <th>SubTotal</th> 
          <th />
        </tr>
      </thead>
       <tbody> 
       {cart.map(product =>(
         <tr>
         <td>
           <img 
           src= {product.image}
           alt= {product.title}
            />
         </td>
         <td>
           <strong>{product.title}</strong>
           <span>{formatPrice(product.price)}</span>
         </td>
         <td>
           <div>
           <button type="button" onClick={() => decrement(product)}>
             <MdRemoveCircleOutline size={20}  color="#7159c1"/>
            </button> 
             <input type="number" readOnly value={product.amount} />

            <button type="button" onClick={() => increment(product)}>
             <MdAddCircleOutline size={20}  color="#7159c1"/>
            </button> 
            </div>
         </td>
          <td>
           <strong>{product.subtotal}</strong> 
            </td> 
           <td>
             <button type="button" onClick={() => 
             removeFromCart(product.id)
              }>
               <MdDelete size={20} color="#7159c1" />
               </button>
           </td> 
       </tr>
       ))}
    </tbody>
    </ProductTable>

    <footer>
      <button type="button">Finalizar pedido</button>

      <Total>
        <span>Total</span>
        <strong>{total}</strong>
      </Total>
    </footer>
  </Container>
    );
}

//criando uma ligacao com o carinho isso faz a conta do subtotal
const mapStateToProps = state =>({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount) //faz a conta do subtotal
  })),
  total: formatPrice( state.cart.reduce((total , product) =>{
    return total + product.price * product.amount; //conta do total compra completa
  }, 0)),
});



const mapDispatchToProps =  dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Cart);
