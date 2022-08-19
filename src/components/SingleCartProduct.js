import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../axios-services";
import { useNavigate } from "react-router";
import { EditQuantity, RemoveCartProduct } from "./";

const SingleCartProduct = ({ product, cart2, cart, setCart, cartInfo, setCartInfo }) => {
  const navigate = useNavigate();
  const [thisProduct, setThisProduct] = useState(product);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(false);
  let { productId } = useParams();

  useEffect(() => {
    async function fetchSingleProduct() {
      const returnSingleProduct = await getProductById(productId);
      setThisProduct(returnSingleProduct);
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

  const addToCart = () => {
    const searchCart = cart.find(
      (product) => product.name === selectedProduct.name
    );
    setCartInfo(!cartInfo);
    if (!searchCart) {
      selectedProduct.quantity = 1;
      cart.push(selectedProduct);
      alert("item added to cart");
    } else {
      searchCart.quantity++;
      alert("Quantity increased");
    }
  };

  return (
    <div className="products">
      {!cart2 ? (
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
          <div
            className="singleBlackBox"
            onMouseOver={() => {
              setSelectedProduct(thisProduct);
            }}
          >
            <div className="productName">
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
            {location.href === "http://localhost:3000/Cart" ? (
              <p>
                <b>Quantity: </b>
                {thisProduct.quantity}
              </p>
            ) : null}
            {location.href !== "http://localhost:3000/Cart" ? (
              <button
              onClick={() => {
                addToCart();
              }}
              >
                Add to cart
              </button>
            ) : null}
            {location.href === "http://localhost:3000/Cart" ? (
              <>
                <EditQuantity
                  thisProduct={thisProduct}
                  setThisProduct={setThisProduct}
                  cartProductId={thisProduct.id}
                  setCartEmpty={setCartEmpty}
                  cart={cart2}
                  setCart={setCart}
                />
                <RemoveCartProduct
                  setThisProduct={setThisProduct}
                  cartProductId={thisProduct.id}
                  cart={cart2}
                  setCartEmpty={setCartEmpty}
                  cartEmpty={cartEmpty}
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
