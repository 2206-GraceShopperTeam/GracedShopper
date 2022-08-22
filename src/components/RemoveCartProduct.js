import React, {useState} from "react";
import { removeCartProduct } from "../axios-services";

const RemoveCartProduct = ({ setThisProduct, cartProductId, cart, setCartEmpty,cartEmpty,setCartInfo, cartInfo,thisProduct,loggedIn }) => {
  
  
  const handleDelete = async (event) => {
    event.preventDefault();
    console.log(loggedIn, "i am the not result")
    if(loggedIn){const result = await removeCartProduct(thisProduct.cart_id,thisProduct.id);
    console.log(result, "i am the result")}

    if (cart) {
      setThisProduct(null);
      cart.pop();
      setCartInfo(!cartInfo)
      alert("Product has been removed!");
    } else {
      alert("There was an error removing your product!");
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Remove Product</button>
    </div>
  );
};

export default RemoveCartProduct;
