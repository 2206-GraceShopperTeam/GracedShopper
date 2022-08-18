import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { whoAmI } from '../axios-services';
import {Home,Header,Login,Products,Cart,Checkout,AllUsers,UserInfo} from './'
import '../style/App.css';

const App = () => {
const [loggedIn,setLoggedIn] = useState(false)
const [user,setUser] = useState([])
const [updated,setUpdated] = useState(false)

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
         <Route path="/Checkout" element={<Checkout />} />
         <Route path="/AllUsers" element={<AllUsers />} />
         <Route path="/UserInfo" element={<UserInfo user={user} setUser={setUser} setUpdated={setUpdated} updated={updated}/>} />
         <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} user={user} setUser={setUser}/>} />
         <Route path="/Products" element={<Products/>} />
         <Route path="/Products/Dell" element={<Dell/>} />
         <Route path="/Products/HP" element={<HP/>} />
         <Route path="/Products/ASUS" element={<ASUS/>} />
         <Route path="/Products/Apple" element={<Apple/>} />
         <Route path="/Cart" element={<Cart/>} />
         <Route path="/" element={<Home/>} />
         
      </Routes>
    </div>
  );
};

export default App;
