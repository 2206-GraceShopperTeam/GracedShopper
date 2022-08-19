import React, { useState, useEffect } from "react";
import { getCartProducts } from "../axios-services";
import { SingleCartProduct } from "./";
import { useNavigate, useLocation } from "react-router-dom";

const Cart = ({ cart,cartInfo,setCartInfo }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Checkout')
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
      <button className="checkoutButton" onClick={handleClick}>Checkout</button>
      {cart && cart.length ? (
        cart.map((product) => {
          return (
            <SingleCartProduct
              key={`routine${product.id}`}
              product={product}
              cart2={cart}
              setCartEmpty={setCartEmpty}
              setCartInfo={setCartInfo}
              cartInfo={cartInfo}
            />
          );
        })
      ) : (
        <p className="cartSubTitle">Your Cart is Empty</p>
      )}
    </div>
  );
};

export default Cart;
