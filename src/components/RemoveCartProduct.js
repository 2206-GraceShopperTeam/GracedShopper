import React from "react";
import { removeCartProduct } from "../axios-services";

const RemoveCartProduct = ({
  setThisProduct,
  cart,
  setCartInfo,
  cartInfo,
  thisProduct,
  loggedIn,
}) => {
  const handleDelete = async (event) => {
    event.preventDefault();
    if (loggedIn) {
      await removeCartProduct(thisProduct.cart_id, thisProduct.id);
    }

    if (localStorage.getItem("cart")) {
      setThisProduct(null);
      cart.pop();
      setCartInfo(!cartInfo);
      alert("Product has been removed!");
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Remove Product</button>
    </div>
  );
};

export default RemoveCartProduct;
