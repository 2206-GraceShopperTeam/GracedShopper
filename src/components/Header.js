import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import "../style/index.css"
import logo from '../images/ScreenShot.png'
import {IoCartOutline} from 'react-icons/io5'

const Header = () => {
  const navigate = useNavigate();
    return (
      <header className="header">
        <div className="logoContainer">
        <img className="logo" src={logo} alt="logo" onClick={(()=>{navigate("/")})}></img>
        </div>
        <div className="loginBttn">
            <button id="loginBttn" onClick={(()=>{navigate("/Login")})}>Login/Register</button>
        </div>
        <div className="checkoutBttn">
            <button id="checkoutBttn" onClick={(()=>{navigate("/Cart")})}><IoCartOutline/>Cart</button>
        </div>
        <div className="shopBttn">
            <button id="shopBttn" onClick={(()=>{navigate("/Products")})}>Shop All</button>
        </div>
      </header>
    );
  };
  
  export default Header;