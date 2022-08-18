import React, {useState,useEffect} from "react";
import { getProducts,addToCart, deleteProduct } from "../axios-services";
import { useNavigate } from "react-router";



const Products = ({cart,setCart,user,loggedIn}) => {
  let navigate = useNavigate();

  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const token = localStorage.getItem("token")

  useEffect(() => {
    async function fetchProducts() {
      const returnProducts = await getProducts();
      setAllProducts(returnProducts);

    }
    fetchProducts();
  }, []);


  const dellHandleClick = (event) => {
    event.preventDefault()
    navigate("/Products/Dell")
  }
  const hpHandleClick = (event) => {
    event.preventDefault()
    navigate("/Products/HP")
  }
  const asusHandleClick = (event) => {
    event.preventDefault()
    navigate("/Products/ASUS")
  }
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



 

  return (
    <div className="products">
      <button onClick={dellHandleClick}>
        Dell
      </button>
      <button onClick={hpHandleClick}>
        HP
      </button>
      <button onClick={asusHandleClick}>
        ASUS
      </button>
      <button onClick={appleHandleClick}>
        Apple
      </button>
      {allProducts.length
        ? allProducts.map((product) => {
            return (
              <div
                className="greenBox"
                key={`Products${product.id}`}
                onMouseOver={(()=>{setSelectedProduct(product)})}
              >
                <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Brand: {product.category}</p>
                <button onClick={(()=>{ cart.push(selectedProduct)})}>Add to cart</button>
                <div className={loggedIn && user.admin === true ? "adminOpt" : "hidden"}>
                <button onClick={()=>{handleDelete()}}>delete</button>
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
