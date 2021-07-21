import React, { useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import NavBarComp from "./Components/NavBar/NavBarComp";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Home/Home";
import ProductComp from './Components/ProductComp/ProductComp';
import CategoryComp from './Components/CategoryComp/CategoryComp';
import Cart from './Components/Cart/Cart';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import addproducts from './Components/AddProducts/addproducts';
import { firebaseAuth } from './Context/AuthProvider/AuthProvider';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';

function App() {
  const { adminLoggedIn } = useContext(firebaseAuth);
  // let adminToken;
  // if(localStorage.userToken){
  //   adminToken = JSON.parse(localStorage.getItem("userToken")).token.i;
  // }
  // const adminId = "ctql1N6sHXMFGVYhYfY1XQsIYdg2";

  return (
    <>
      <NavBarComp />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/:productFor/:id" component={ProductComp} />
        <Route exact path="/:category" component={CategoryComp} />
        <Route exact path="/cart" component={Cart} />
        {localStorage.userToken ? (
          null
        ) : (
          <Route exact path="/signup" component={SignUp} />
        )}
        {localStorage.userToken ? (
          null
        ) : (
          <Route exact path="/signin" component={SignIn} />
        )}
        <Route exact path="/create/product" component={adminLoggedIn ? addproducts : null} />
        <Route exact path="/:id/edit/product" component={UpdateProduct} />
      </BrowserRouter>
    </>
  );
}

export default App;