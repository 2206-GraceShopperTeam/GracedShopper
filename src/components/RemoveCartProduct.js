import React from "react";
import { removeCartProduct } from "../axios-services";

const RemoveCartProduct = ({setThisProduct, cartProductId}) => {
    const handleDelete = async (event) => {
        event.preventDefault();
        const result = await removeCartProduct(cartProductId);
    
        if (result) {
          setThisProduct(null);
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
