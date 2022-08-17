import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { getAPIHealth } from '../axios-services';
import {Home,Header,Login,Products,Cart} from './'
import '../style/App.css';

const App = () => {
const [loggedIn,setLoggedIn] = useState(false)
const [user,setUser] = useState({})

  useEffect(() => {
    
  }, []);

  return (
    <div className="app-container">
      <Header setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>
      <Routes>

         <Route path="/Login" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} user={user} setUser={setUser}/>} />
         <Route path="/Products" element={<Products/>} />
         <Route path="/Cart" element={<Cart/>} />
         <Route path="/" element={<Home/>} />
         
      </Routes>
    </div>
  );
};

export default App;
