import React, { useState, useEffect } from "react";
import {
  getProducts,
  getCartById,
  deleteProduct,
  addToCartProducts,
  editCartProduct,
} from "../axios-services";
import { useNavigate } from "react-router";
import EditProduct from "./EditProduct";

const Products = ({
  loggedIn,
  cart,
  setCartInfo,
  cartInfo,
  setCart,
  updated,
}) => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [product, setProduct] = useState([]);
  const [removedProduct, setRemovedProduct] = useState(false);
  const [alterProduct, setAlterProduct] = useState(false);
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);

  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getProducts();
      setAllProducts(returnProducts);
    }
    fetchProducts();
  }, [removedProduct]);

  useEffect(() => {
    if (cart === null) {
      setCart([]);
    }
  }, []);

  useEffect(() => {}, [selectedProduct]);

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
    alert("Product Deleted.");
    await deleteProduct(productId);
  };

  const addToCart = async () => {
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
                    loggedIn ? addToUserCart() : addToCart();
                  }}
                >
                  Add to cart
                </button>
                <div className="pictureDiv">
                  <img src={product.picture} className="productPicture" />
                </div>
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
                  <button
                    onClick={() => {
                      setAlterProduct(true);
                      setProduct(selectedProduct);
                    }}
                  >
                    update
                  </button>
                </div>
              </div>
            );
          })
        : null}
      {alterProduct ? (
        <EditProduct
          setAlterProduct={setAlterProduct}
          product={product}
          setProduct={product}
          updated={updated}
        />
      ) : null}
    </div>
  );
};

export default Products;
