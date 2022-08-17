import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { getAPIHealth } from '../axios-services';
import {Home,Header,Login,Products,Cart,Dell,HP,ASUS,Apple} from './'
import '../style/App.css';

const App = () => {
const [loggedIn,setLoggedIn] = useState(false)

  useEffect(() => {
    
  }, []);

  return (
    <div className="app-container">
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      <Routes>

         <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} />
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
