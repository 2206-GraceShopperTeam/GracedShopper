import React, {useState} from "react";
import { removeCartProduct } from "../axios-services";

const RemoveCartProduct = ({ setThisProduct, cartProductId, cart, setCartEmpty,cartEmpty,setCartInfo, cartInfo }) => {
  const handleDelete = async (event) => {
    event.preventDefault();
    const result = await removeCartProduct(cartProductId);

    if (result) {
      setThisProduct(null);
      cart.pop();
      setCartEmpty(!cartEmpty);
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
