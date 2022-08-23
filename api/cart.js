const express = require("express");
const router = express.Router();
const { createCart, getCartByUser, destroyCart } = require("../db/carts");

//POST /api/cart/userId
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cart = await getCartByUser(userId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.post("/createCart", async (req, res, next) => {
  const user_id = req.body;
  const cart = await createCart(user_id);
  try {
    if (cart) {
      res.send(cart);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:cartId", async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const cart = await destroyCart(cartId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
