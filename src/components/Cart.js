import React, { useState, useEffect } from "react";
import { getCart, getCartProducts } from "../axios-services";
import { SingleCartProduct } from "./";
import { useNavigate, useLocation } from "react-router-dom";

const Cart = ({ cart, cartInfo, setCartInfo,loggedIn }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Checkout");
  };

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
