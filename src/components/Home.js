import React, { useEffect, useState } from "react";
import {getCart, createCart,} from "../axios-services"

const Home = ({user,setCart,cart,loggedIn}) => {

    // useEffect(()=>{
    //   async function fetchCart () {
    //     if(localStorage.getItem("user")){
    //       const user = JSON.parse(localStorage.getItem("user"))
    //       const oldCart = await getCart(user.id)
    //       setCart(oldCart)
    //     }
    //   }
    //   console.log(cart, "im the old cart")
    //   fetchCart()
    // },[])


    useEffect(()=>{
      async function createCart (){
        if(!localStorage.getItem("user") && !localStorage.getItem("cart")){
          setCart([])
        } else {
          const userCart = await getCart(1)
          setCart(userCart)
        }
      }
      createCart()
    },[loggedIn])

  return (
    <div /*Starter Div */>
      <div>
        <img
          className="ad"
          src="https://images.ctfassets.net/dza5l9l73hzx/5VJhDlxPkkFV2dEYl0ftD0/e78039d557adf52896c4e239fdc02312/Story_Banner_EN.gif"
          alt="ad"
        ></img>
      </div>
      <div className="newP">
        <h1 className="nowAvailable">Now selling MacBook Pros!</h1>
        <img
          className="mac"
          src="https://c.tenor.com/oYlPjC2s2qYAAAAC/apple-apple-mac.gif"
          alt="mac"
        />
      </div>
      <div className="signUp">
        <h2 className="catcher">Sign-Up today</h2>
        <p className="pitch">
          When you create an account today
          <br /> you'll qualify for free shipping on all orders.
          <br />
          So sign up while the promo lasts!
        </p>
        <button className="offerBttn">Sign-Up</button>
      </div>
      <div className="stock">
        <h2 className="ourStock">Our Stock</h2>
        <p className="howMany">
          Currently we have over (this many computers) in stock!
          <br /> There's sure to be one that meets your needs!
        </p>
      </div>

      {/* Final Div  */}
    </div>
  );
};

export default Home;
