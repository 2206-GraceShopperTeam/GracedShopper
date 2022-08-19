import React, { useState, useEffect } from "react";
import { getProducts, addToCartProducts } from "../axios-services";
import { useNavigate } from "react-router";

const Products = ({ loggedIn, user, cart }) => {
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
          <h1 className="brandName">All Laptops</h1>
        </div>
      </div>
      {allProducts.length
        ? allProducts.map((product) => {
            return (
              <div
                className="blackBox"
                key={`Products${product.id}`}
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
                    cart.push(selectedProduct);
                    alert("Product added to Cart!");
                  }}
                >
                  Add to cart
                </button>
                <div
                  className={
                    loggedIn && user.admin === true ? "adminOpt" : "hidden"
                  }
                >
                  <button>delete</button>
                  <button>add</button>
                  <button>update</button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Products;
