import React, { useState, useEffect } from "react";
import {
  getCartProducts,
  addToCartProducts,
  createCart,
  getCart,
  getCartProductsById,
} from "../axios-services";
import { SingleCartProduct } from "./";

const Cart = ({ cart, user, cartInfo }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(false);
  // const [userCart, setUserCart] = useState([]);
  // const useStateIsBad = JSON.parse(localStorage.getItem("cartInfo"))

  useEffect(() => {
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      setCartProducts(returnCartProducts);
    }
    fetchCartProducts();
  }, [cartEmpty]);

  // useEffect(() => {
  //   const useStateIsBad = JSON.parse(localStorage.getItem("cartInfo"))
  //   async function fetchAddToCartProducts() {
  //     const cart_id = useStateIsBad.id
  //     const quantity = 2
  //     const returnCartProducts = await addToCartProducts(1, 1,2);
  //     setCartProducts(returnCartProducts);
  //     console.log(returnCartProducts, "jimmy johns??")
  //   }
  //   fetchAddToCartProducts();
  // }, [cart]);

  return (
    <div className="cartParent">
      <p className="cartTitle">Cart</p>
      {cart.length ? (
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

    // <div className="cart">
    //      {/* <img className="loading" src="https://i0.wp.com/cdnb.artstation.com/p/assets/images/images/021/890/251/original/alexander-streng-ezgif-com-optimize.gif?1573327466" alt="loading"/> */}
    // </div>
  );
};

export default Cart;
