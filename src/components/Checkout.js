import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartProducts, getCartById, emptyCart } from "../axios-services";
import "../style/Checkout.css";

const Checkout = ({ cart, setCart, loggedIn }) => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [purchased, setPurchased] = useState(false);
  const [guest, setGuest] = useState(false);
  const [productCart, setProductCart] = useState([]);
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);

  var total = 0;

  async function getProductCart() {
    if (user) {
      const cart = await getCartById(user.id);
      setProductCart(cart);
    }
  }
  useEffect(() => {
    getProductCart();
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      setCartProducts(returnCartProducts);
    }
    fetchCartProducts();
  }, []);
  console.log(cart)
  return (
    <div>
      {loggedIn ? (
        <div className="checkout">
          <h1>Order Details</h1>
          <div className={purchased ? "hidden" : "orderInfo"}>
            {productCart.map((product, index) => {
              if (user.id === product.user_id) {
                {
                  total += product.price * product.quantity;
                }
                return (
                  <div key={index} className="cartProduct">
                    <h3>{product.name}</h3>
                    <p>({product.quantity})---> </p>
                    <h3 className="price">${product.price * product.quantity}</h3>
                  </div>
                );
              }
            })}
            <div>
              <h3 className="total">Total: ${total}</h3>
            </div>
            <div>
              <h3>Email Address: {user.email}</h3>
              <h3>Shipping Address: {user.address}</h3>
            </div>
          </div>
            <button
              onClick={() => {
                setPurchased(!purchased), setCart([]), emptyCart();
              }}
            >
              Confirm Order
            </button>
          <div className={!purchased ? "hidden" : "purchaseMessage"}>
            Thank You For Your Money!
          </div>
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
                {cart.map((product, index) => {
                  {
                    total += product.price * product.quantity;
                    console.log(total, "this is total");
                  }
                  return (
                    <div key={index} className="cartProduct">
                      <h3>{product.name}</h3>
                      <p>({product.quantity})</p>
                      <h3>---> ${product.price * product.quantity}</h3>
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
                Thank You For Your Money!
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Checkout;

// if (token) {
//     const string = localStorage.getItem("user");
//     const user = JSON.parse(string);
//     console.log(cartProducts, 'this is cartProducts')
//     return (
// <div className="checkout">
//   <div className={purchased ? "hidden" : "orderInfo"}>
//     {productCart.map((product, index) => {
//       // getProductCart(product.cart_id)
//       console.log(productCart, 'this is the cart info')
//       console.log(user.id, 'this is the userid')
//         if(user.id === productCart.user_id){
//       {
//         total.push(product.price * product.quantity);
//       }
//       return (
//         <div key={index} className="cartProduct">
//           <h3>{product.name}</h3>
//           <p>({product.quantity})</p>
//           <h3>${product.price}</h3>
//         </div>
//       )
//     }})}
//     <form>
//       <h3>
//         Total: ${total.reduce((partialSum, a) => partialSum + a, 0) / 2}
//       </h3>
//       <h3>{user.email}</h3>
//       <h3>{user.address}</h3>
//     </form>
//     <button
//       onClick={() => {
//         setPurchased(!purchased), setCart([]);
//       }}
//     >
//       Purchase
//     </button>
//   </div>
//   <div className={!purchased ? "hidden" : "purchaseMessage"}>
//     Thank You For Your Money!
//   </div>
// </div>
//     );
//   } else if (guest) {
//     return (
//     <div className="checkout">
//       <div className={purchased ? "hidden" : "orderInfo"}>
//         {cart.map((product, index) => {
//           {
//             total.push(product.price * product.quantity);
//           }
//           return (
//             <div key={index} className="cartProduct">
//               <h3>{product.name}</h3>
//               <p>({product.quantity})</p>
//               <h3>${product.price}</h3>
//             </div>
//           );
//         })}
//         <h3>
//           Total: ${total.reduce((partialSum, a) => partialSum + a, 0)}
//         </h3>
//         <button
//           onClick={() => {
//             setPurchased(!purchased), setCart([]);
//           }}
//         >
//           Purchase
//         </button>
//       </div>
//       <div className={!purchased ? "hidden" : "purchaseMessage"}>
//         Thank You For Your Money!
//       </div>
//     </div>
//   );
// } else {
//   return (
//     <div className="checkoutOptions">
//       <button
//         onClick={() => {
//           localStorage.setItem("redirect", "/Checkout"), navigate("/Login");
//         }}
//       >
//         Login/Register
//       </button>
//       <button
//         onClick={() => {
//           setGuest(true);
//         }}
//       >
//         Continue As Guest
//       </button>
//     </div>
//     );
//   }
