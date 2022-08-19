import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Header,
  Login,
  Products,
  Cart,
  Checkout,
  AllUsers,
  UserInfo,
  Dell,
  HP,
  ASUS,
  Apple,
  AddProduct,
  SingleCartProduct,
  RemoveCartProduct,
  EditQuantity,
} from "./";
import "../style/App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartInfo, setCartInfo] = useState(false);

  useEffect(() => {
    const stable = async () => {
      if (localStorage.getItem("token")) {
        setLoggedIn(true);
      }
    };
    document.addEventListener("load", setUpdated(!updated));

    stable();
  }, [loggedIn]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    const renewedCart = JSON.parse(localStorage.getItem("cart"));
    setCart(renewedCart);
    document.addEventListener("load", setUser(data));
  }, [updated]);

  useEffect(() => {
    if (cart && cart.length !== 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cartInfo]);

  return (
    <div className="app-container">
      <Header
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        user={user}
        setUser={setUser}
      />
      <Routes>
         <Route path="/EditQuantity" element={<EditQuantity cart={cart} setCart={setCart} cartInfo={cartInfo} setCartInfo={setCartInfo}/>} />
         <Route path="/RemoveCartProduct" element={<RemoveCartProduct />} />
         <Route path="/SingleCartProduct" element={<SingleCartProduct cart={cart} setCart={setCart}/>} />
         <Route path="/AddProduct" element={<AddProduct />} />
         <Route path="/Checkout" element={<Checkout />} />
         <Route path="/AddProduct" element={<AddProduct />} />
         <Route path="/AllUsers" element={<AllUsers />} />
         <Route path="/UserInfo" element={<UserInfo user={user} setUser={setUser} setUpdated={setUpdated} updated={updated}/>} />
         <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} user={user} setUser={setUser}/>} />
         <Route path="/Products" element={<Products setLoggedIn={setLoggedIn} loggedIn={loggedIn} user={user} setUser={setUser} cart={cart} setCart={setCart} setCartInfo={setCartInfo} cartInfo={cartInfo}/>} />
         <Route path="/Products/Dell" element={<Dell cart={cart} />} />
         <Route path="/Products/HP" element={<HP cart={cart} />} />
         <Route path="/Products/ASUS" element={<ASUS cart={cart} />} />
         <Route path="/Products/Apple" element={<Apple cart={cart} />} />
         <Route path="/Cart" element={<Cart cart={cart} setCartInfo={setCartInfo} cartInfo={cartInfo} />} />
         <Route path="/Products/:productId" element={<SingleCartProduct cart={cart} setCart={setCart} setCartInfo={setCartInfo} cartInfo={cartInfo}/> } />
         <Route path="/" element={<Home user={user} setCart={setCart} cart={cart} />} />
         
      </Routes>
    </div>
  );
};

export default App;
