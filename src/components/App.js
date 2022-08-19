import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { whoAmI } from '../axios-services';
import {Home,Header,Login,Products,Cart,Checkout,AllUsers,UserInfo,Dell,HP,ASUS,Apple, SingleCartProduct} from './'
import '../style/App.css';

const App = () => {
const [loggedIn,setLoggedIn] = useState(false)
const [user,setUser] = useState([])
const [updated,setUpdated] = useState(false)
const [cart,setCart] = useState([])
const [cartInfo,setCartInfo] = useState([])

useEffect(() => {
  const stable = async () =>  {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
  }}
  document.addEventListener("load", setUpdated(!updated))
  
stable()
}, [loggedIn]);

useEffect(()=>{
  const data = JSON.parse(localStorage.getItem("user"))
  document.addEventListener("load", setUser(data))
},[updated])

  return (
    <div className="app-container">
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn} user={user} setUser={setUser}/>
      <Routes>
         <Route path="/Checkout" element={<Checkout cart={cart}/>} />
         <Route path="/AllUsers" element={<AllUsers />} />
         <Route path="/UserInfo" element={<UserInfo user={user} setUser={setUser} setUpdated={setUpdated} updated={updated}/>} />
         <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} user={user} setUser={setUser}/>} />
         <Route path="/Products" element={<Products setLoggedIn={setLoggedIn} loggedIn={loggedIn} user={user} setUser={setUser} cart={cart} setCart={setCart} />} />
         <Route path="/Products/Dell" element={<Dell cart={cart} />} />
         <Route path="/Products/HP" element={<HP cart={cart} />} />
         <Route path="/Products/ASUS" element={<ASUS cart={cart} />} />
         <Route path="/Products/Apple" element={<Apple cart={cart} />} />
         <Route path="/Cart" element={<Cart cart={cart} />} />
         <Route path="/Products/:productId" element={<SingleCartProduct cart={cart}/>} />
         <Route path="/" element={<Home user={user} setCartInfo={setCartInfo}/>} />
         
      </Routes>
    </div>
  );
};

export default App;
