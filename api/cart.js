const express = require("express");
const router = express.Router();
const {
  createCart,
  getCartById,
  getCartByUser,
} = require("../db/carts");
const { getCartProductById } = require("../db/cart_products");
const { emptyCart } = require("../src/axios-services");
const { requireUser } = require("./util");

//POST /api/cart
router.get("/", async (req, res, next) => {
  const user_id = req.user.id;

  try {
    const cart = await getCartByUser(user_id);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.post("/createCart", async (req, res, next) => {
  const cart = await createCart({ user_id: req.user.id });
  try {
    if (cart) {
      res.send(cart);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/:cartId
router.delete("/emptyCart/:cartId", async (req, res, next) => {
  const cart_id = req.params.cartId
  const cartProducts = await getCartProductById(cart_id)
  try {
    if(cart){
      await emptyCart(cart_id)
      res.send(cartProducts)
    }
  } catch (error){
    next(error)
  }
})


module.exports = router;
