import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartProducts } from "../axios-services";
import "../style/Checkout.css";

const Checkout = ({cart}) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [check, setCheck] = useState(false);
  const [purchased, setPurchased] = useState(false)
  var myCart = [];

  const token  = localstorage.getItem('token')

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
  if(token){
  return (
    <div className="checkout">
        <div className={purchased ? "hidden" : 'orderInfo'}>
      {cartProducts.map((product, index) => {
        return product.cart_id === req.user.id ? (
          <div key={index} className='cartProduct'>
            <h3>{product.name}</h3>
            <p>({product.quantity})</p>
            <h3>${product.price}</h3>
          </div>
        ) : null;
      })}
      <form>
        <h3>{email}</h3>
        <h3>{address}</h3>
      </form>
      <button onClick={()=>{setPurchased(!purchased)}}>Purchase</button>
      </div>
      <div className={!purchased ? 'hidden' : 'purchaseMessage'}>Thank You For Your Money!</div>
    </div>
  );
    }
    else{
      return(
        <div className='checkout'>
          <div className={purchased ? "hidden" : 'orderInfo'}>
          {cart.map((product, index) => 
          <div key={index} className='cartProduct'>
            <h3>{product.name}</h3>
            <p>({product.quantity})</p>
            <h3>${product.price}</h3>
          </div>
        )}
        <button onClick={()=>{setPurchased(!purchased)}}>Purchase</button>
        </div>
        <div className={!purchased ? 'hidden' : 'purchaseMessage'}>Thank You For Your Money!</div>
        </div>
      )
    }
};

export default Checkout;
