import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { getAPIHealth } from '../axios-services';
import {Home,Header,Login,Products,Cart} from './'
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <div className="app-container">
      <Header/>
      <Routes>

         <Route path="/Login" element={<Login/>} />
         <Route path="/Products" element={<Products/>} />
         <Route path="/Cart" element={<Cart/>} />
         <Route path="/" element={<Home/>} />
         
      </Routes>
     
      <p>API Status: {APIHealth}</p>
    </div>
  );
};

export default App;
