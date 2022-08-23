import React, { useState, useEffect } from "react";
import {
  getProducts,
  getCartById,
  addToCartProducts,
  editCartProduct,
} from "../axios-services";
import { useNavigate } from "react-router";

const HP = ({ cart, cartInfo, setCartInfo, loggedIn }) => {
  const navigate = useNavigate();
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getProducts();
      setAllProducts(returnProducts);
    }
    fetchProducts();
  }, []);

  const productClick = (product) => {
    navigate(`/products/${product.id}`);
  };

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

  const addToUserCart = async () => {
    let cart = await getCartById(user.id);
    const searchCart = cart.find(
      (product) => product.name === selectedProduct.name
    );
    if (!searchCart) {
      selectedProduct.quantity = 1;
     let addedProduct = await addToCartProducts(
        user.id,
        selectedProduct.id,
        selectedProduct.quantity
      );
      setCartInfo(!cartInfo);
      alert("item added to cart");
    } else {
      alert("Quantity increased");
      searchCart.quantity++;
      const result = await editCartProduct(searchCart.id, searchCart.quantity);
      setCartInfo(!cartInfo);
    }
  };

  return (
    <div className="products">
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
          <h1 className="brandName">HP</h1>
        </div>
      </div>
      {allProducts.length
        ? allProducts.map((product) => {
            return product.category === "HP" ? (
              <div
                className="blackBox"
                key={`HP${product.id}`}
                onMouseOver={() => {
                  setSelectedProduct(product);
                }}
              >
                <div
                  className="productName"
                  onClick={() => {
                    productClick(product);
                  }}
                >
                  <p>
                    <b>{product.name}</b>
                  </p>
                </div>
                <p>
                  <b>Description: </b>
                  {product.description}
                </p>
                <p>
                  <b>Price: </b>${product.price}
                </p>
                <p>
                  <b>Brand: </b>
                  {product.category}
                </p>
                <button
                  onClick={() => {
                    loggedIn ? addToUserCart() : addToCart();
                  }}
                >
                  Add to cart
                </button>
                <div className="pictureDiv">
                  <img src={product.picture} className="productPicture" />
                </div>
              </div>
            ) : null;
          })
        : null}
    </div>
  );
};

export default HP;
