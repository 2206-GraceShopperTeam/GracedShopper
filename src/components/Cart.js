import React, { useState, useEffect } from "react";
import { getCartProducts, getCartById } from "../axios-services";
import { SingleCartProduct } from "./";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, cartInfo, setCartInfo, loggedIn, setCart }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(false);
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Checkout");
  };

  async function createCart() {
    if (!localStorage.getItem("user") && !localStorage.getItem("cart")) {
      setCart([]);
    } else if (loggedIn) {
      const userCart = await getCartById(user.id);
      setCart(userCart);
    }
  }

  useEffect(() => {
    createCart();
  }, [cartInfo]);

  useEffect(() => {
    createCart();
  }, [loggedIn]);

  useEffect(() => {
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      setCartProducts(returnCartProducts);
    }
    fetchCartProducts();
  }, [cartInfo]);

  return (
    <div className="cartParent">
      <p className="cartTitle">Cart</p>
      {cart && cart.length ? (
        cart.map((product) => {
          return (
            <div>
              <SingleCartProduct
                key={`singleCartProduct${product.id}`}
                product={product}
                cart2={cart}
                setCartEmpty={setCartEmpty}
                setCartInfo={setCartInfo}
                cartInfo={cartInfo}
                loggedIn={loggedIn}
              />
            </div>
          );
        })
      ) : (
        <p className="cartSubTitle">Your Cart is Empty</p>
      )}
      <div className="checkoutButtonParent">
        <button className="checkoutButton" onClick={handleClick}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
