import React, { useState, useEffect } from "react";
import { getProducts } from "../axios-services";
import { useNavigate } from "react-router";

const ASUS = () => {
  let navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getProducts();
      setAllProducts(returnProducts);
    }
    fetchProducts();
  }, []);

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
          <h1 className="brandName">ASUS</h1>
        </div>
      </div>
      {allProducts.length
        ? allProducts.map((product) => {
            return product.category === "Asus" ? (
              <div className="greenBox" key={`Products${product.id}`}>
                <div className="productName">
                  <p>
                    <b>{product.name}</b>
                  </p>
                </div>
                <p><b>Description: </b>{product.description}</p>
                <p><b>Price: </b>
                  ${product.price}
                </p>
                <p><b>Brand: </b>{product.category}</p>
                <button>Add to Cart</button>
              </div>
            ) : null;
          })
        : null}
    </div>
  );
};

export default ASUS;
