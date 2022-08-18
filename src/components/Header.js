import React, { useState,useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import "../style/index.css"
import logo from '../images/ScreenShot.png'
import {IoCartOutline} from 'react-icons/io5'

const Header = ({loggedIn,setLoggedIn,user,setUser}) => {
  const navigate = useNavigate();
  useEffect(() => {

  }, [loggedIn]);


  const logout = () => {
    localStorage.clear()
    setLoggedIn(false)
    navigate("/")
  }
    return (
      <header className="header">
        <div className="logoContainer">
        <img className="logo" src={logo} alt="logo" onClick={(()=>{navigate("/")})}></img>
        </div>
        <div className="loginBttn">
            <button id="loginBttn" onClick={(()=>{loggedIn ? logout() : navigate("/Login")})}>{!loggedIn ? "Login/Register" : "LogOut"}</button>
        </div>
        <div className="checkoutBttn">
            <button id="checkoutBttn" onClick={(()=>{navigate("/Cart")})}><IoCartOutline/>Cart</button>
        </div>
        <div className="shopBttn">
            <button id="shopBttn" onClick={(()=>{navigate("/Products")})}>Shop All</button>
        </div>
        {/* {user.admin === true && loggedIn ? */}
          <div className="adminBttn" >
          <div className="allUsersBttn">
            <button  onClick={(()=>{navigate("/AllUsers")})}>All Users</button>
        </div>
        <div className="myInfoBttn">
            <button id="shopBttn" onClick={(()=>{navigate("/UserInfo")})}>My Info</button>
        </div> 
        </div> 
        {/* // : null} */}
       
      </header>
    );
  };
  
  export default Header;