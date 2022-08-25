import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/index.css";
import logo from "../images/betterbuylogo.png";
import { IoCartOutline } from "react-icons/io5";

const Header = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);

  useEffect(() => {}, [loggedIn]);

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logoContainer">
        <img
          className="logo"
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        ></img>
      </div>
      <div className="loginBttn">
        <button
          id="loginBttn"
          onClick={() => {
            loggedIn ? logout() : navigate("/Login");
          }}
        >
          {!loggedIn ? "Login/Register" : "LogOut"}
        </button>
      </div>
      <div className="checkoutBttn">
        <button
          id="checkoutBttn"
          onClick={() => {
            navigate("/Cart");
          }}
        >
          <IoCartOutline />
          Cart
        </button>
      </div>
      <div className="shopAll">
        <div className="shopBttn">
          <p
            id="shopBttn"
            onClick={() => {
              navigate("/Products");
            }}
          >
            Shop All
          </p>
        </div>
      </div>
      {loggedIn && user && user.admin === true ? (
        <div className="addBttn">
          <p
            id="addBttn"
            onClick={() => {
              navigate("/AddProduct");
            }}
          >
            Add Product
          </p>
        </div>
      ) : null}
      {loggedIn && user && user.admin === true ? (
        <div className="adminBttn">
          <div className="allUsersBttn">
            <p
              onClick={() => {
                navigate("/AllUsers");
              }}
            >
              All Users
            </p>
          </div>
        </div>
      ) : null}
      {loggedIn === true ? (
        <div className="myInfoBttn">
          <p
            id="shopBttn"
            onClick={() => {
              navigate("/UserInfo");
            }}
          >
            Account
          </p>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
