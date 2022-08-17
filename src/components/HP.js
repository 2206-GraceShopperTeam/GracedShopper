import React, {useState, useEffect} from "react";
import { getProducts } from "../axios-services";

const HP = () => {
    const [allProducts, setAllProducts] = useState([]);
  const token = localStorage.getItem("token")

  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getProducts();
      setAllProducts(returnProducts);
      
    }
    fetchProducts();
  }, []);
  function randomCents(){
     let change = Math.random() * 100;
     change = Math.floor(change);
     return change;
   }
  return (
    <div className="products">
      {allProducts.length
        ? allProducts.map((product) => {
          return (product.category === "HP") ? 
          <div
                className="greenBox"
                key={`Products${product.id}`}
              >
                <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}.{}</p>
                <p>Brand: {product.category}</p>
                <button>Add to Cart</button>
              </div>
        : null})
        :null}
    </div>
  );
};

export default HP;
