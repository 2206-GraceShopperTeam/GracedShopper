import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error } from "./";
import { login, register, createCart } from "../axios-services";

const Login = ({ setLoggedIn, loggedIn, setUser }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {}, [loggedIn]);

  const handleReg = async () => {
    try {
      if (regPassword !== confirmPassword) {
        alert("Passwords don't match!");
        setRegPassword("");
        setConfirmPassword("");
      } else if (regEmail !== confirmEmail) {
        alert("Emails don't match!");
        setConfirmEmail("");
      }
      const newUser = await register(regEmail, regPassword, name, address);
      if (newUser) {
        setRegEmail("");
        setRegPassword("");
        setConfirmPassword("");
        setConfirmEmail("");
        setName("");
        setAddress("");
        alert("Registration successful please Login");
        setSignUp(false);
        await createCart(newUser.user.id);
      }
    } catch (error) {
      alert("register failed");
    }
  };

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      if (result) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setLoggedIn(true);
        setUser(result.user);
        if (localStorage.getItem("redirect")) {
          const redirect = localStorage.getItem("redirect");
          localStorage.removeItem("redirect");
          navigate(redirect);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setError(true);
    }
  };

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const regEmailChange = (event) => {
    setRegEmail(event.target.value);
  };

  const confirmEmailChange = (event) => {
    setConfirmEmail(event.target.value);
  };

  const regPasswordChange = (event) => {
    setRegPassword(event.target.value);
  };

  const confirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const nameChange = (event) => {
    setName(event.target.value);
  };

  const confirmAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div>
      <div className="loginContainer">
        <div className={error ? "error" : "hidden"}>
          {<Error setError={setError} />}
        </div>
        <h1 className="loginTitle">Login to Your Account</h1>
        <form className="loginForm" onSubmit={handleLogin}>
          <input
            type="text"
            name="Email"
            placeholder="Email*"
            required={true}
            minLength="1"
            onChange={emailChange}
            value={email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password*"
            required={true}
            minLength="8"
            onChange={passwordChange}
            value={password}
          />
        </form>
        <button
          type="submit"
          className="signInBttn"
          onClick={(event) => {
            handleLogin(event);
          }}
        >
          Sign In
        </button>
      </div>
      <div className={signUp ? "hidden" : "signUpContainer"}>
        <h1>New Here?</h1>
        <h4>Sign up and enjoy a wide range of benefits!</h4>
        <button
          onClick={() => {
            setSignUp(true);
          }}
        >
          Sign up
        </button>
      </div>
      <div className={!signUp ? "hidden" : "registerContainer"}>
        <h1 className="registerTitle">Register Your New Account</h1>
        <form className="registerForm" onSubmit={handleReg}>
          <input
            type="text"
            name="Email"
            placeholder="Email*"
            required={true}
            minLength="1"
            onChange={regEmailChange}
            value={regEmail}
          />
          <input
            type="text"
            name="confirmEmail"
            placeholder="Confirm Email*"
            required={true}
            minLength="1"
            onChange={confirmEmailChange}
            value={confirmEmail}
          />
          <input
            type="password"
            name="password"
            placeholder="Password*"
            required={true}
            minLength="8"
            onChange={regPasswordChange}
            value={regPassword}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password*"
            required={true}
            minLength="8"
            onChange={confirmPasswordChange}
            value={confirmPassword}
          />
          <input
            type="text"
            name="name"
            placeholder="Name*"
            required={true}
            onChange={nameChange}
            value={name}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={confirmAddressChange}
            value={address}
          />
        </form>
        <button
          type="submit"
          onClick={() => {
            handleReg();
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
