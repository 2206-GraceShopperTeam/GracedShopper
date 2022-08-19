import React, { useState, useEffect } from "react";
import {
  getCartProducts,
} from "../axios-services";
import { SingleCartProduct } from "./";

const Cart = ({ cart}) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      setCartProducts(returnCartProducts);
    }
    fetchCartProducts();
  }, [cartEmpty]);

  return (
    <div className="cartParent">
      <p className="cartTitle">Cart</p>
      {cart && cart.length ? (
        cart.map((product) => {
          return (
            <SingleCartProduct
              key={`routine${product.id}`}
              product={product}
              cart={cart}
              setCartEmpty={setCartEmpty}
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
