import React, {useState,useEffect} from "react";
import { getProducts } from "../axios-services";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getProducts();
      console.log(returnProducts,"i am the stuff")
      setAllProducts(returnProducts);
    }
    console.log( "is anyone home")
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
            return (
              <div
                className="allProducts"
                key={`Products${product.id}`}
               //  onClick={() => {
               //    setSelectedProducts(product);
               //  }}
              >
                <p>Name: {product.name}</p>
                <p>description: {product.description}</p>
                <p>price: ${product.price}.{randomCents()}</p>
                <p>Maker: {product.category}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Products;
