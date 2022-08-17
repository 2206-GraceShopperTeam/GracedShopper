import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { getAPIHealth } from '../axios-services';
import {Home,Header,Login,Products,Cart,Checkout} from './'
import '../style/App.css';

const App = () => {
const [loggedIn,setLoggedIn] = useState(false)

  useEffect(() => {
    
  }, []);

  return (
    <div className="app-container">
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      <Routes>
         <Route path="/Checkout" element={<Checkout />} />
         <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} />
         <Route path="/Products" element={<Products/>} />
         <Route path="/Cart" element={<Cart/>} />
         <Route path="/" element={<Home/>} />
         
      </Routes>
    </div>
  );
};

export default App;
