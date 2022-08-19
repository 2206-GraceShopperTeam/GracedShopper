import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services";
import { useNavigate } from "react-router";
import { EditQuantity, RemoveCartProduct } from "./";

const SingleCartProduct = ({ product, cart, setCartEmpty }) => {
  const navigate = useNavigate();
  const [thisProduct, setThisProduct] = useState(product);
  const [selectedProduct, setSelectedProduct] = useState([]);
  let { productId } = useParams();

  useEffect(() => {
    async function fetchSingleProduct() {
      const returnSingleProduct = await getProductById(productId);
      setThisProduct(returnSingleProduct);
      console.log(thisProduct, "apple")
    }
    if (productId) {
      fetchSingleProduct();
    }
  }, [selectedProduct]);

  const dellHandleClick = (event) => {
    event.preventDefault();
    navigate("/Products/Dell");
  };
  const hpHandleClick = (event) => {
    event.preventDefault();
    navigate("/Products/HP");
  };
  const asusHandleClick = (event) => {
    event.preventDefault();
    navigate("/Products/ASUS");
  };
  const appleHandleClick = (event) => {
    event.preventDefault();
    navigate("/Products/Apple");
  };

  return (
    <div className="products">
      {!cart ? (
        <div className="brandAndButtonsCenter">
          <div className="brandAndButtonsColumn">
            <div className="brandButtons">
              <p className="hoverButton" onClick={dellHandleClick}>
                Dell
              </p>
              <p className="hoverButton" onClick={hpHandleClick}>
                HP
              </p>
              <p className="hoverButton" onClick={asusHandleClick}>
                ASUS
              </p>
              <p className="hoverButton" onClick={appleHandleClick}>
                Apple
              </p>
            </div>
          </div>
        </div>
      ) : null}
      {thisProduct ? (
        <div>
          <div className="singleBlackBox" >
            <div className="productName" onMouseOver={() => {
                  setSelectedProduct(thisProduct);
                }}>
              <p>
                <b>{thisProduct.name}</b>
              </p>
            </div>
            <p>
              <b>Description: </b>
              {thisProduct.description}
            </p>
            <p>
              <b>Price: </b>${thisProduct.price}
            </p>
            <p>
              <b>Brand: </b>
              {thisProduct.category}
            </p>
            {cart ? (
              <p>
                <b>Quantity: </b>
                {thisProduct.quantity}
              </p>
            ) : null}
            {!cart ? (<button
                  onClick={() => {
                    cart.push(selectedProduct);
                    alert("Product added to Cart!");
                  }}
                >
                  Add to cart
                </button>) : null}
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
                  setCartEmpty={setCartEmpty}
                />
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SingleCartProduct;
