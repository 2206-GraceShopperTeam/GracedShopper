import React, {useState,useEffect} from "react";
import { getProducts,addToCart } from "../axios-services";
import { useNavigate } from "react-router";

const Products = ({ loggedIn, user, cart }) => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);

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
    event.preventDefault()
    navigate("/Products/Apple")
  }

const handleDelete = async () => {
  console.log("im in a whale")
  const productId = selectedProduct.id
  const removed = await deleteProduct(productId)
  console.log(removed, "hello??")
  if(removed){
    alert("product deleted")
    console.log("where am i")
  }

}



 



 
=======
    event.preventDefault();
    navigate("/Products/Apple");
  };
>>>>>>> productNewFront

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
                onMouseOver={(()=>{setSelectedProduct(product)})}
              >
                <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}.{randomCents()}</p>
                <p>Brand: {product.category}</p>
                <button onClick={(()=>{ cart.push(selectedProduct)})}>Add to cart</button>
                <div className={loggedIn && user.admin === true ? "adminOpt" : "hidden"}>
                <button>delete</button>
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
