import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services";
import { EditQuantity, RemoveCartProduct } from "./";

const SingleCartProduct = ({ product, cart }) => {
  const [thisProduct, setThisProduct] = useState(product);
  let { productId } = useParams();

  useEffect(() => {
    async function fetchSingleProduct() {
      const returnSingleProduct = await getProductById(productId);
      setThisProduct(returnSingleProduct);
    }
    if (productId) {
      fetchSingleProduct();
    }
  }, []);

  return (
    <>
      {thisProduct ? (
        <div className="singleGreenBox">
          <p>Name: {thisProduct.name}</p>
          <p>Description: {thisProduct.description}</p>
          <p>Price: ${thisProduct.price}</p>
          <p>Brand: {thisProduct.category}</p>
          <p>Quantity: {thisProduct.quantity}</p>
          {cart ? (
            <>
              <EditQuantity
                thisProduct={thisProduct}
                setThisProduct={setThisProduct}
                cartProductId={thisProduct.id}
              />
              <RemoveCartProduct
                setThisProduct={setThisProduct}
                cartProductId={thisProduct.id}
                cart={cart}
              />
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default SingleCartProduct;
