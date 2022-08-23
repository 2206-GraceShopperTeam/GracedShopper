import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartProducts, getCartById, emptyCart,createCart, addToCartProducts, } from "../axios-services";
import logo from "../images/stacked-boxes-700x295-1.png";
import "../style/Checkout.css";

const Checkout = ({ cart, setCart, loggedIn }) => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [cartId, setCartId] = useState(0)
  const [purchased, setPurchased] = useState(false);
  const [guest, setGuest] = useState(false);
  const [productCart, setProductCart] = useState([]);
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);

  let total = 0;

  async function getProductCart() {
    if (user) {
      const cart = await getCartById(user.id);
      console.log(cart, "im the c")
      setProductCart(cart);
    }
  }
  async function emptyThyCart (){
    let id = productCart[0].cart_id
    await emptyCart(id)
  }
  async function fillThyCart (){
    if(loggedIn && localStorage.getItem("cart")){
      let convCart = JSON.parse(localStorage.getItem("cart"))
      if(convCart){
        convCart.map(async(product)=>{
           await addToCartProducts(
            user.id,
            product.id,
            product.quantity)
        })
      }
    }
  }


  useEffect(() => {
    fillThyCart ()
    getProductCart();
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      setCartProducts(returnCartProducts);
    }
    fetchCartProducts();
  }, []);
  return (
    <div>
      {loggedIn ? (
        <div className="checkout">
          <div className={purchased ? "hidden" : "orderInfo"}>
            <h1>Order Details</h1>
            {productCart.map((product, index) => {
              if (product) {
                localStorage.setItem("cartId", product.cart_id)
                {
                  total += product.price * product.quantity;
                }
                return (
                  <div key={index} className="cartProduct">
                    <h3>{product.name}</h3>
                    <p>({product.quantity})</p>
                    <h3 className="price">
                      ${product.price * product.quantity}
                    </h3>
                  </div>
                );
              }
            })}
            <div>
              <h3 className="total">Total: ${total}</h3>
            </div>
            <div>
              <h3>Email Address: {user.email}</h3>
              <h3>Shipping Address: {user.address ? user.address : "No Address on File"}</h3>
            </div>
            <button
              onClick={() => {
                setPurchased(!purchased); setCart([]); emptyThyCart();
              }}
            >
              Confirm Order
            </button>
          </div>
          <div className={!purchased ? "hidden" : "purchaseMessage"}>
            Thank You For Your Order!
          </div>
          <img
          className={!purchased ? "hidden" : "boxes"}
          src={logo}
          alt="logo"
        ></img>
        </div>
      ) : (
        <div>
          {!guest ? (
            <div className="checkoutOptions">
              {" "}
              <button
                onClick={() => {
                  localStorage.setItem("redirect", "/Checkout"),
                    navigate("/Login");
                }}
              >
                Login/Register
              </button>
              <button
                onClick={() => {
                  setGuest(true);
                }}
              >
                Continue As Guest
              </button>
            </div>
          ) : (
            <div className="checkout">
              <div className={purchased ? "hidden" : "orderInfo"}>
            <h1>Order Details</h1>
                {cart.map((product, index) => {
                  {
                    total += product.price * product.quantity;
                    console.log(total, "this is total");
                  }
                  return (
                    <div key={index} className="cartProduct">
                      <h3>{product.name}</h3>
                      <p>({product.quantity})</p>
                      <h3>${product.price * product.quantity}</h3>
                    </div>
                  );
                })}
                <div className="total">
                  <h3>Total: ${total}</h3>
                </div>
                <button
                  onClick={() => {
                    setPurchased(!purchased), setCart([]);
                  }}
                >
                  Confirm Order
                </button>
              </div>
              <div className={!purchased ? "hidden" : "purchaseMessage"}>
                Thank You For Your Order!
              </div>
              <img
          className={!purchased ? "hidden" : "boxes"}
          src={logo}
          alt="logo"
        ></img>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Checkout;

