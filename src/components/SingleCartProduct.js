import React, { useState } from "react";
import { EditQuantity, RemoveCartProduct } from "./";

const SingleCartProduct = ({ product, cart }) => {
  const [thisProduct, setThisProduct] = useState(product);

  function randomCents() {
    let change = Math.random() * 100;
    change = Math.floor(change);
    return change;
  }

  return (
    <>
      {thisProduct ? (
        <div className="greenBox">
          <p>Name: {thisProduct.name}</p>
          <p>Description: {thisProduct.description}</p>
          <p>
            Price: ${thisProduct.price}.{randomCents()}
          </p>
          <p>Brand: {thisProduct.category}</p>
          <p>Quantity: {thisProduct.quantity}</p>
          <EditQuantity thisProduct={thisProduct} setThisProduct={setThisProduct} cartProductId={thisProduct.id} />
          <RemoveCartProduct setThisProduct={setThisProduct} cartProductId={thisProduct.id} cart={cart} />
        </div>
      ) : (
        null
      )}
    </>
  );
};

export default SingleCartProduct;
