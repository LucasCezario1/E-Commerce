import React from 'react';
import {BrowserRouter} from 'react-router-dom';

//redux
import { Provider} from 'react-redux';
//mesagems
import {ToastContainer} from 'react-toastify';

//estilos global
import GlobalStyle from './styles/global';
//rotas
import Routes from './routes';
import Header from './components/Header';

//reactotom
import './config/Reactotron';


//controle de paginas
import store from './store';

function App(){
  return(
    <Provider store={store}>
      <BrowserRouter>
      <Header />
        <Routes />
        <GlobalStyle/>
        <ToastContainer autoClose={3000}/>
      </BrowserRouter>
    </Provider> 
  );
}

export default App;