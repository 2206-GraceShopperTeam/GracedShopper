import React, { useState, useEffect } from "react";
import { getProducts } from "../axios-services";
import { useNavigate } from "react-router";

const HP = () => {
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

  function randomCents() {
    let change = Math.random() * 100;
    change = Math.floor(change);
    return change;
  }

  return (
    <div className="products">
      <h1>HP</h1>
      <button onClick={dellHandleClick}>Dell</button>
      <button onClick={hpHandleClick}>HP</button>
      <button onClick={asusHandleClick}>ASUS</button>
      <button onClick={appleHandleClick}>Apple</button>
      {allProducts.length
        ? allProducts.map((product) => {
            return product.category === "HP" ? (
              <div className="greenBox" key={`Products${product.id}`}>
                <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
                <p>
                  Price: ${product.price}.{randomCents()}
                </p>
                <p>Brand: {product.category}</p>
                <button>Add to Cart</button>
              </div>
            ) : null;
          })
        : null}
    </div>
  );
};

export default HP;
