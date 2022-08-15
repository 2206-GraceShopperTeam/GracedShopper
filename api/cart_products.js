const express = require("express");
const cart_product_router = express.Router();
const { requireUser } = require("./util");
// const { getCartProductById, updateCartProduct, destroyCartProduct } = require("../db"); need to update db
const {
  getAllCartProducts,
  getCartProductById,
  updateCartProduct,
  destroyCartProduct,
} = require("../db/cart_products");
const { getProductById } = require("../db/products");

cart_product_router.get("/", async (req, res, next) => {
  try {
    const allCartProducts = await getAllCartProducts();
    res.send(allCartProducts);
  } catch (error) {
    next(error);
  }
})

cart_product_router.patch("/:cartProductId", async (req, res, next) => {
  const { quantity } = req.body;
  const id = req.params.cartProductId;
  console.log(req.body, "abcdef")
  const cartProduct = await getCartProductById(id);
  console.log(cartProduct)
  try {
    if (cartProduct.creatorId != req.user.id) {
      res.status(403);
      next({
        name: "UserNotFound",
        message: `User ${req.user.id} is not allowed to update ${cartProduct.name}`,
      });
    }
    const updatedCartProduct = await updateCartProduct({quantity});
    res.send(updatedCartProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cart_product_router.delete("/:cartProductId", requireUser, async (req, res, next) => {
  const id = req.params.cartProductId;
  const cartProduct = await getCartProductById(id);
  const product = await getProductById(cartProduct.id);
  try {
    if (product.creatorId != req.user.id) {
      res.status(403);
      next({
        name: "UserDoesNotMatch",
        message: `User ${req.user.username} is not allowed to delete ${product.name}`,
      });
    }
    await destroyCartProduct(id);
    res.send({cartProduct, "message": "abcdefg"});
  } catch (error) {
    next(error);
  }
});

module.exports = cart_product_router;
