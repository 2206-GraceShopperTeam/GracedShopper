import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductById,
  getCartById,
  editCartProduct,
  addToCartProducts,
} from "../axios-services";
import { useNavigate } from "react-router";
import { EditQuantity, RemoveCartProduct } from "./";

const SingleCartProduct = ({
  product,
  cart2,
  cart,
  cartInfo,
  setCartInfo,
  loggedIn,
}) => {
  const navigate = useNavigate();
  const [thisProduct, setThisProduct] = useState(product);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);
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

  useEffect(() => {}, [cartInfo]);

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
      alert("Item added to cart!");
    } else {
      searchCart.quantity++;
      alert("Quantity increased!");
    }
  };

  const addToUserCart = async () => {
    let cart = await getCartById(user.id);
    const searchCart = cart.find(
      (product) => product.name === selectedProduct.name
    );
    if (!searchCart) {
      selectedProduct.quantity = 1;
      await addToCartProducts(
        user.id,
        selectedProduct.id,
        selectedProduct.quantity
      );
      setCartInfo(!cartInfo);
      alert("Item added to cart!");
    } else {
      alert("Quantity increased!");
      searchCart.quantity++;
      await editCartProduct(searchCart.id, searchCart.quantity);
      setCartInfo(!cartInfo);
    }
  };

  return (
    <div className="productsInCart">
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
            {location.href ===
            "https://graceshopper-betterbuy.herokuapp.com/Cart" ? (
              <p>
                <b>Quantity: </b>
                {thisProduct.quantity}
              </p>
            ) : null}
            {location.href !==
            "https://graceshopper-betterbuy.herokuapp.com/Cart" ? (
              <button
                onClick={() => {
                  loggedIn ? addToUserCart() : addToCart();
                }}
              >
                Add to cart
              </button>
            ) : null}
            {location.href !==
            "https://graceshopper-betterbuy.herokuapp.com/Cart" ? (
              <div className="pictureDiv">
                <img src={thisProduct.picture} className="productPicture" />
              </div>
            ) : null}
            {location.href ===
            "https://graceshopper-betterbuy.herokuapp.com/Cart" ? (
              <>
                <EditQuantity
                  thisProduct={thisProduct}
                  cart={cart2}
                  setCartInfo={setCartInfo}
                  cartInfo={cartInfo}
                  loggedIn={loggedIn}
                  setThisProduct={setThisProduct}
                />
                <RemoveCartProduct
                  setThisProduct={setThisProduct}
                  thisProduct={thisProduct}
                  cart={cart2}
                  cartInfo={cartInfo}
                  setCartInfo={setCartInfo}
                  loggedIn={loggedIn}
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
