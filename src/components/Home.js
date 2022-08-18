import React, { useEffect, useState } from "react";
import {getCart, createCart} from "../axios-services"

const Home = ({user,setCartInfo}) => {

    useEffect(()=>{
        if("id" in user){async function fetchCart(){
          const oldCart = await getCart(user.id)
          console.log("you already have a cart")
          setCartInfo(oldCart)
          localStorage.setItem("cartInfo", JSON.stringify(oldCart))
        }
        async function makeCart(){
          if(!fetchCart){
            console.log("lets make you a new cart")
            const newCart = await createCart(user.id)
            setCartInfo(newCart)}
            localStorage.setItem("cartInfo", JSON.stringify(newCart))
          
          } 
            
          fetchCart()
          makeCart()}
        
       },[])


    return (
<div /*Starter Div */>
<div>
<img className="ad" src="https://images.ctfassets.net/dza5l9l73hzx/5VJhDlxPkkFV2dEYl0ftD0/e78039d557adf52896c4e239fdc02312/Story_Banner_EN.gif" alt="ad"></img>
</div>
<div className="newP">
    <h1 className="nowAvailable">Now selling MacBook Pros!</h1>
    <img className="mac" src="https://c.tenor.com/oYlPjC2s2qYAAAAC/apple-apple-mac.gif" alt="mac"/>
</div>
<div className="signUp">
    <h2 className="catcher">Sign-Up today</h2> 
    <p className="pitch">When you create an account today<br/> you'll qualify for free shipping on all orders.<br/>
    So sign up while the promo lasts!
    </p>
    <button className="offerBttn">Sign-Up</button>
</div>
<div className="stock">
    <h2 className="ourStock">Our Stock</h2> 
    <p className="howMany">Currently we have over (this many computers) in stock!<br/> There's sure to be one that meets your needs!
    </p>
</div>





{/* Final Div  */}
</div >
)
}

export default Home