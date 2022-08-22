import React, { useState, useEffect } from "react";
import { getProducts } from "../axios-services";
import { useNavigate } from "react-router";

const Dell = ({ cart, cartInfo, setCartInfo }) => {
  const navigate = useNavigate();
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
          <h1 className="brandName">Dell</h1>
        </div>
      </div>
      {allProducts.length
        ? allProducts.map((product) => {
            return product.category === "DELL" ? (
              <div
                className="blackBox"
                key={`Dell${product.id}`}
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
                    addToCart();
                  }}
                >
                  Add to cart
                </button>

                <div className="pictureDiv">
                  <img src = {product.picture} className="productPicture"/>
                </div>
              </div>
            ) : null;
          })
        : null}
    </div>
  );
};

export default Dell;
