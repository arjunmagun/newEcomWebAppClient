import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './Context/AuthProvider/AuthProvider';
import { CartProvider } from './Context/CartContext';
import { ProductProvider } from './Context/Products/products';

ReactDOM.render(
  <BrowserRouter>
    <CartProvider>
      <AuthProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </AuthProvider>
    </CartProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

