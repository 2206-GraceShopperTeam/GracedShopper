import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartProducts } from "../axios-services";
import "../style/Checkout.css";

const Checkout = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [check, setCheck] = useState(false);
  var myCart = [];

  console.log(productName, " cartproducts");
  useEffect(() => {
    async function fetchCartProducts() {
      const returnCartProducts = await getCartProducts();
      console.log(returnCartProducts, "this is cartProducts");
      setCartProducts(returnCartProducts);
      //   for (var x = 0; x < returnCartProducts.length; x++) {
      //     if (returnCartProducts[x].cart_id === 1) {
      //       myCart.push(cartProducts[x]);
      //       console.log(myCart, 'this is myCart')
      //     }
      //   }
    }
    console.log(myCart.length);
    if (!myCart.length > 0) {
      setCheck(true);
    }
    fetchCartProducts();
  }, [check]);
  console.log(cartProducts, "this is myCaart");
  return (
    <div className="checkout">
      {cartProducts.map((product) => {
        return product.cart_id === 1 ? (
          <div>
            <hello>hello</hello>
            <h3>{product.name}</h3>
            <p>{product.quantity}</p>
            <p>{product.price}</p>
          </div>
        ) : null;
      })}
      <form>
        <h3>{email}</h3>
        <h3>{address}</h3>
      </form>
    </div>
  );
};

export default Checkout;
// {product.id === 1 ? return (
//               <div>
//                 <hello>hello</hello>
//                 <h3>{product.name}</h3>
//                 <p>{product.quantity}</p>
//                 <p>{product.price}</p>
//               </div>
//             ) : null}
//             console.log(product, 'this is product')
//             ;:null
//           })
