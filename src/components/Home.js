import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCartById, getProducts } from "../axios-services";

const Home = ({ setCart, loggedIn }) => {
  const [amount, setAmount] = useState(0);
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getProducts();
      setAmount(returnProducts.length);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    async function createCart() {
      if (!localStorage.getItem("user") && !localStorage.getItem("cart")) {
        setCart([]);
      } else if (loggedIn) {
        const userCart = await getCartById(user.id);
        setCart(userCart);
      }
    }
    createCart();
  }, [loggedIn]);

  return (
    <div>
      <div>
        <img
          className="ad"
          src="https://images.ctfassets.net/dza5l9l73hzx/5VJhDlxPkkFV2dEYl0ftD0/e78039d557adf52896c4e239fdc02312/Story_Banner_EN.gif"
          alt="ad"
        ></img>
      </div>
      <div className="newP">
        <h1 className="nowAvailable">Now selling MacBook Pros!</h1>
        <img
          className="mac"
          src="https://c.tenor.com/oYlPjC2s2qYAAAAC/apple-apple-mac.gif"
          alt="mac"
        />
      </div>
      {!loggedIn ? (
        <div className="signUp">
          <h2 className="catcher">Sign-Up today</h2>
          <p className="pitch">
            When you create an account today
            <br /> you'll qualify for free shipping on all orders.
            <br />
            So sign up while the promo lasts!
          </p>
          <button
            className="offerBttn"
            onClick={() => {
              navigate("/Login");
            }}
          >
            Sign-Up
          </button>
        </div>
      ) : (
        <div className="signUp">
          <h2 className="catcher">{`Welcome to Better Buy, ${user.name}!`}</h2>
        </div>
      )}
      <div className="stock">
        <h2 className="ourStock">Our Stock</h2>
        <p className="howMany">
          {`Currently we have over ${amount} in stock!`}
          <br /> There's sure to be one that meets your needs!
        </p>
      </div>
    </div>
  );
};

export default Home;
