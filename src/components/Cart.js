import React, { useState, useEffect } from "react";
import { getCartProducts } from "../axios-services";
import { SingleCartProduct } from "./";
import { useNavigate, useLocation } from "react-router-dom";

const Cart = ({ cart }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(false);

  const navigate = useNavigate();

  const handleClick = (cart) => {
    console.log(cart, 'this is cart')
    navigate('/Checkout')
    // navigate("../Checkout", {state:{cart}})
    // <button class="nav-item nav-link-edit" [routerLink]="['Home']">Home</button >
  };

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
