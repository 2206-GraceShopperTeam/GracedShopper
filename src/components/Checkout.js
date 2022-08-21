import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartProducts } from "../axios-services";
import "../style/Checkout.css";

const Checkout = ({ cart, setCart }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [check, setCheck] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [guest, setGuest] = useState(false);

  const navigate = useNavigate()
  var myCart = [];

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      setCartProducts(returnCartProducts);
    }
    if (!myCart.length > 0) {
      setCheck(true);
    }
    fetchCartProducts();
  }, [check]);
  if (token) {
    const string = localStorage.getItem('user')
    const user = JSON.parse(string)

    return (
      <div className="checkout">
        <div className={purchased ? "hidden" : "orderInfo"}>
          {cartProducts.map((product, index) => {
            return product && product.cart_id  ? (
              <div key={index} className="cartProduct">
                <h3>{product.name}</h3>
                <p>({product.quantity})</p>
                <h3>${product.price}</h3>
              </div>
            ) : null;
          })}
          <form>
            <h3>{user.email}</h3>
            {/* <h3>{user.address}</h3> */}
          </form>
          <button
            onClick={() => {
              setPurchased(!purchased), setCart([]);
            }}
          >
            Purchase
          </button>
        </div>
        <div className={!purchased ? "hidden" : "purchaseMessage"}>
          Thank You For Your Money!
        </div>
      </div>
    );
  } 
  else if(guest){

    return (
      <div className="checkout">
        <div className={purchased ? "hidden" : "orderInfo"}>
          {cart.map((product, index) => (
            <div key={index} className="cartProduct">
              <h3>{product.name}</h3>
              <p>({product.quantity})</p>
              <h3>${product.price}</h3>
            </div>
          ))}
          <button
            onClick={() => {
              setPurchased(!purchased), setCart([]);
            }}
          >
            Purchase
          </button>
        </div>
        <div className={!purchased ? "hidden" : "purchaseMessage"}>
          Thank You For Your Money!
        </div>
      </div>
    );

  }
    else {
    return (
      <div className="checkoutOptions">
        <button  onClick={() => {localStorage.setItem('redirect', '/Checkout'), navigate("/Login")}}>Login/Register</button>
        <button onClick={() => {setGuest(true)}}>Continue As Guest</button>
      </div>
    );
  }

};

export default Checkout;
