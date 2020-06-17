import React, {Component} from 'react';
import { connect} from 'react-redux';
import { MdAddShoppingCart} from 'react-icons/md';
import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice} from '../../util/format'; //preco em real

//ACTIONS
import  {bindActionCreators} from 'redux'
import * as CartActions from '../../store/module/cart/action';

class Home extends Component {
//estado
  state ={
    products: [], 
 };

 //funcoes
 async componentDidMount(){
   const res = await api.get('products'); 
   this.setState({products: res.data});
 };

 //funcao de adicionar ao carrinho com reducer
 handleAddProduct = id =>{
  const {AddToCartRequest} = this.props;

  AddToCartRequest(id);
 };


 render(){
  //estados
  const { products } = this.state;
  const { amount } = this.props ;

  return (
    <ProductList>
      {products.map( product => (
            <li key={product.id}>
            <img src= {product.image}alt={product.title} />
            <strong>{product.title}</strong>
            <span>{formatPrice(product.price)}</span>
            <button type="button" onClick={() => this.handleAddProduct(product.id)}>
                <div>
                    <MdAddShoppingCart size={16} color="#FFF" /> {' '}
                    {amount[product.id] || 0}
                </div>
      
                <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
      
      ))}

    </ProductList>
    );
 }
}

//quantos informaao ja tem no carinho
const mapStateToProps = state =>({
  amount: state.cart.reduce((amount, product) =>{
    amount[product.id] = product.amount ;

    return amount;
  }, {}),
});


const mapDispatchToProps =  dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
