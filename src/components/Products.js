import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct, addToCartProducts,editCartProduct } from "../axios-services";
import { useNavigate } from "react-router";

const Products = ({ loggedIn, cart,setCartInfo,cartInfo,setCart }) => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [removedProduct, setRemovedProduct] = useState(false);
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);

  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getProducts();
      setAllProducts(returnProducts);
    }
    fetchProducts();
    if (removedProduct) {
      alert("product deleted");
      setRemovedProduct(false);
    }
  }, [removedProduct]);

  useEffect(() => {
    if (cart === null) {
      setCart([]);
    }
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

  const handleDelete = async () => {
    const productId = selectedProduct.id;
    setRemovedProduct(true);
    await deleteProduct(productId);
  };

  const addToCart =  async() => {
    const searchCart = cart.find(
      (product) => product.name === selectedProduct.name
    );
    console.log(searchCart, "the amaw")

    setCartInfo(!cartInfo);
    if (!searchCart) {
      console.log(searchCart, "the bmaw")

      selectedProduct.quantity = 1;
      cart.push(selectedProduct);
      alert("item added to cart");
       }else {searchCart.quantity++;
        console.log(searchCart, "the cmaw")

      alert("Quantity increased");}
    }
  const addToUserCart =  async() => {
    const searchCart = cart.find(
      (product) => product.name === selectedProduct.name
    );
    console.log(searchCart, "the emaw")

    if (!searchCart) {
      selectedProduct.quantity = 1;
      await addToCartProducts(user.id,selectedProduct.id,selectedProduct.quantity)
      console.log(searchCart, "the fmaw")

      alert("item added to cart");
       }else {
      alert("Quantity increased")
      console.log(searchCart, "the gmaw")
      searchCart.quantity++
    const result = await editCartProduct(searchCart.id,searchCart.quantity);
    setCartInfo(!cartInfo);}}

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
                   loggedIn ? addToUserCart() : addToCart()
                  }}
                >
                  Add to cart
                </button>
                <div
                  className={
                    loggedIn && user.admin === true ? "adminOpt" : "hidden"
                  }
                >
                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    delete
                  </button>
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
