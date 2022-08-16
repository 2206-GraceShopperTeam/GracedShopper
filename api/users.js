const express = require("express");
const {
  getUserByEmail,
  getUser,
  createUser,
  getAllUsers,
  updateUser,
} = require("../db");
const { requireUser } = require("./util");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {JWT_SECRET} = process.env;
// POST /api/users/register
router.post("/register", async (req, res, next) => {
    //tested and working
    //curl http://localhost:4000/api/users/register -H "Content-Type: application/json" -X POST -d '{"email": "enterAnEmail@here.com", "password": "superstars", "name": "josiah", "address": "quebec"}'
    try {
      const { email, password, name, address } = req.body;
      if (password.length < 8) {
        next({ name: "passwordLengthError", message: `Password Too Short!` });
      }
      const _user = await getUserByEmail(email);
      if (_user) {
        next({
          name: "userExistsError",
          message: `User email ${email} is already taken.`,
        });
      }
  
      const user = await createUser({ email, password, name, address });
  
      const token = jwt.sign(
          user.id,
          email
        ,
        JWT_SECRET
      );
  
      res.send({
        message: "thank you for signing up",
        token,
        user,
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  // POST /api/users/login
router.post("/login", async (req, res, next) => {
    //tested working
    //curl http://localhost:4000/api/users/login -H "Content-Type: application/json" -X POST -d '{"email": "graces@hopper.com", "password": "momofall"}'
    const { email, password } = req.body;
    if (!email || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both an email and password",
      });
    }
    try {
      const user = await getUser({ email, password });
  
      if (user) {
        const { id, email } = user;
        const token = jwt.sign({id, email} , JWT_SECRET);
        
        res.send({ user, message: "you're logged in!", token: `${token}` });
      }
      else {
        next({ name: "IncorrectCredentialsError","message": "Email or password is incorrect"})
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  // GET /api/users/cart/:cartId
router.get("/cart/:cartId", async (req, res, next) => {
    const email = req.params.email;
    try {
      if (req.user && req.user.email === email) {
        const cart = await getCartByUserEmail({ email });
        res.send(cart);
      } 
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
  
  module.exports = router;