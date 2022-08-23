import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartProducts, getCartById } from "../axios-services";
import "../style/Checkout.css";

const Checkout = ({ cart, setCart, loggedIn }) => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [purchased, setPurchased] = useState(false);
  const [guest, setGuest] = useState(false);
  const [total, setTotal] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);

  async function getProductCart() {
    if (user) {
      const cart = await getCartById(user.id);
      setProductCart(cart);
    }
  }

  useEffect(() => {
    getProductCart();
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      setCartProducts(returnCartProducts);
    }
    fetchCartProducts();
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div className="checkout">
          <div className={purchased ? "hidden" : "orderInfo"}>
            {productCart.map((product, index) => {
              if (true) {
                {
                  total.push(product.price * product.quantity);
                }
                return (
                  <div key={index} className="cartProduct">
                    <h3>{product.name}</h3>
                    <p>({product.quantity})</p>
                    <h3>${product.price}</h3>
                  </div>
                );
              }
            })}
            <form>
              <h3>
                Total: ${total.reduce((partialSum, a) => partialSum + a, 0)}
              </h3>
              <h3>{user.email}</h3>
              <h3>{user.address}</h3>
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
      ) : (
        <div>
          {!guest ? (
            <div className="checkoutOptions">
              {" "}
              <button
                onClick={() => {
                  localStorage.setItem("redirect", "/Checkout"),
                    navigate("/Login");
                }}
              >
                Login/Register
              </button>
              <button
                onClick={() => {
                  setGuest(true);
                }}
              >
                Continue As Guest
              </button>
            </div>
          ) : (
            <div className="checkout">
              <div className={purchased ? "hidden" : "orderInfo"}>
                {cart.map((product, index) => {
                  {
                    total.push(product.price * product.quantity);
                  }
                  return (
                    <div key={index} className="cartProduct">
                      <h3>{product.name}</h3>
                      <p>({product.quantity})</p>
                      <h3>${product.price}</h3>
                    </div>
                  );
                })}
                <h3>
                  Total: ${total.reduce((partialSum, a) => partialSum + a, 0)}
                </h3>
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
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;
