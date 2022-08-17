import React, { useState, useEffect } from "react";
import { getCartProducts } from "../axios-services";
import { SingleCartProduct } from "./";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      setCartProducts(returnCartProducts);
    }
    fetchCartProducts();
  }, []);

  return (
    <div className="loading">
      <h1>Cart</h1>
      {cartProducts.length ? (
        cartProducts.map((product) => {
          return <SingleCartProduct key={`routine${product.id}`} product={product} />;
        })
      ) : (
        <h3>Your Cart is Empty</h3>
      )}
    </div>

    // <div className="cart">
    //      {/* <img className="loading" src="https://i0.wp.com/cdnb.artstation.com/p/assets/images/images/021/890/251/original/alexander-streng-ezgif-com-optimize.gif?1573327466" alt="loading"/> */}
    // </div>
  );
};

export default Cart;
