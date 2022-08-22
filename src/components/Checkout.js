import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartProducts, getCartById } from "../axios-services";
import "../style/Checkout.css";

const Checkout = ({ cart, setCart, loggedIn }) => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [purchased, setPurchased] = useState(false);
  const [guest, setGuest] = useState(false);
  // const [total, setTotal] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const string = localStorage.getItem("user");
  const user = JSON.parse(string);
  
  var total = 0

  
  async function getProductCart() {
    if(user){ const cart = await getCartById(user.id);
      console.log(cart, 'this is users cart', user.id, 'this is the userid')
    setProductCart(cart);}
   
  }
  useEffect(() => {
    getProductCart();
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      setCartProducts(returnCartProducts);
    }
    fetchCartProducts();
  }, []);
console.log(productCart, 'this is the users cart later')
  return (
    <div>
      {loggedIn ? (
        <div className="checkout">
          <div className={purchased ? "hidden" : "orderInfo"}>
            {productCart.map((product, index) => {
              if (user.id === product.user_id) {
                // {
                //   total.push(product.price * product.quantity);
                // }
                {
                  total += (product.price * product.quantity)
                  console.log(total, 'this is total')
                }
                return (
                  <div key={index} className="cartProduct">
                    <h3>{product.name}</h3>
                    <p>({product.quantity})</p>
                    <h3>${product.price}</h3>
                  </div>
                );
              }
            })}
            <form>
              {/* <h3>
                Total: ${total.reduce((partialSum, a) => partialSum + a, 0)}
              </h3> */}
              <h3>total: ${total}</h3>
              <h3>{user.email}</h3>
              <h3>{user.address}</h3>
            </form>
            <button
              onClick={() => {
                setPurchased(!purchased), setCart([]);
              }}
            >
              Purchase
            </button>
          </div>
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
                    total.push(product.price * product.quantity);
                  }
                  return (
                    <div key={index} className="cartProduct">
                      <h3>{product.name}</h3>
                      <p>({product.quantity})</p>
                      <h3>${product.price}</h3>
                    </div>
                  );
                })}
                <h3>
                  Total: ${total.reduce((partialSum, a) => partialSum + a, 0)}
                </h3>
                <button
                  onClick={() => {
                    setPurchased(!purchased), setCart([]);
                  }}
                >
                  Purchase
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

