import React, { useEffect, useState } from "react";

const Login = () => {
     const [signUp,setSignUp] = useState(false)


     useEffect(()=>{

     },[signUp])


  return <div>
     <div className="loginContainer">
          <h1 className="loginTitle">
               Login to Your Account
          </h1>
          <form className="loginForm">
               <input
                type="text"
                name="Email"
                placeholder="Email*"
                required={true}
                minLength="1"/>

               <input 
               type="password"
               name="password"
               placeholder="Password*"
               required={true}
               minLength="8"/>


          </form>
          <button type="submit" className="signInBttn">Sign In</button>
     </div>

     <div className={signUp ? "hidden" : "signUpContainer"}>
          <h1>
               New Here?
          </h1>
          <h4>
               Sign up and enjoy a wide range of benefits!
          </h4>
          <button onClick={(()=>{setSignUp(true)})}>Sign up</button>
     </div>

     <div className={!signUp ? "hidden" : "registerContainer"}>
          <h1 className="registerTitle">
               Register Your New Account
          </h1>
          <form className="registerForm">
               <input
                type="text"
                name="Email"
                placeholder="Email*"
                required={true}
                minLength="1"/>
               
               <input
                type="text"
                name="confirmEmail"
                placeholder="Confirm Email*"
                required={true}
                minLength="1"/>

               <input 
               type="password"
               name="password"
               placeholder="Password*"
               required={true}
               minLength="8"/>
               
               <input 
               type="password"
               name="confirmPassword"
               placeholder="Confirm Password*"
               required={true}
               minLength="8"/>

               <input 
               type="text"
               name="name"
               placeholder="Name*"
               required={true}/>
               
               <input 
               type="text"
               name="address"
               placeholder="Address"/>


          </form>
          <button type="submit" onClick={(()=>{setSignUp(false)})}>Sign Up</button>
     </div>

  </div>;
};

export default Login;
