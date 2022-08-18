import React, {useState,useEffect} from "react";
import { getProducts,addToCart } from "../axios-services";

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [cart,setCart] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getProducts();
      setAllProducts(returnProducts);
    }
    fetchProducts();
  }, [cart]);
useEffect(()=>{
  (!token ? localStorage.setItem("guest","cart") : null)
},[])

  function randomCents(){
     let change = Math.random() * 100;
     change = Math.floor(change);
     return change;
   }

const guestCart = localStorage.getItem('guest')

function stringy(){
  localStorage.setItem("guest", JSON.stringify(cart))
}

  return (
    <div className="products">
      {allProducts.length
        ? allProducts.map((product) => {
            return (
              <div
                className="allProducts"
                key={`Products${product.id}`}
              >
                <p>Name: {product.name}</p>
                <p>description: {product.description}</p>
                <p>price: ${product.price}.{randomCents()}</p>
                <p>Maker: {product.category}</p>
                <button onClick={() => {
                  setSelectedProduct(product);
                  cart.push(selectedProduct)
                  stringy()
                }}>Add to cart</button>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Products;
