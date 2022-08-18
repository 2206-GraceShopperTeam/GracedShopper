import React, { useState, useEffect } from "react";
import { getCartProducts,addToCartProducts,createCart,getCart } from "../axios-services";
import { SingleCartProduct } from "./";

const Cart = ({cart,user,cartInfo}) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [userCart, setUserCart] = useState([]);



  useEffect(() => {
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      setCartProducts(returnCartProducts);
      console.log(cart, "do i have what you selected??")
    }
    fetchCartProducts();
  }, []);
  useEffect(() => {
    const useStateIsBad = JSON.parse(localStorage.getItem("cartInfo"))
    async function fetchAddToCartProducts() {
      const cart_id = useStateIsBad.id
      console.log(cart[0].id, "show me the errors")
      const product_id = cart[0].id
      console.log(product_id, "im meaningless")
      const quantity = 2
      const returnCartProducts = await addToCartProducts({cart_id : cart_id, product_id: product_id, quantity: quantity});
      setCartProducts(returnCartProducts);
      console.log(returnCartProducts, "jimmy johns??")
    }
    fetchAddToCartProducts();
  }, [cart]);

  return (
    <div className="loading">
      <h1>Cart</h1>
      {cartProducts.length ? (
        cart.map((product) => {
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
