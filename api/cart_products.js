const express = require("express");
const cart_product_router = express.Router();
const {
  getAllCartProducts,
  getCartProductById,
  updateCartProduct,
  destroyCartProduct,
  addProductToCart,
} = require("../db/cart_products");

cart_product_router.get("/", async (req, res, next) => {
  try {
    const allCartProducts = await getAllCartProducts();
    res.send(allCartProducts);
  } catch (error) {
    next(error);
  }
});

cart_product_router.post("/:cartId", async (req, res, next) => {
  const cart_id = req.params
  const { product_id, quantity } = req.body;

  try {
    const added = await addProductToCart( cart_id, {product_id, quantity} );

    res.send(added);
  } catch (error) {
    next(error);
  }
});
cart_product_router.get("/:cartId", async (req, res, next) => {
  const cart_id = req.params
  try {
    const userCart = await getCartProductById( cart_id );

    res.send(userCart);
  } catch (error) {
    next(error);
  }
});

cart_product_router.patch("/:cartProductId", async (req, res, next) => {
  const { quantity } = req.body;
  const id = req.params.cartProductId;
  try {
    const updatedCartProduct = await updateCartProduct({ id, quantity });

    res.send(updatedCartProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cart_product_router.delete("/:cartProductId", async (req, res, next) => {
  const id = req.params.cartProductId;
  const cartProduct = await getCartProductById(id);
  try {
    await destroyCartProduct(id);
    res.send({ cartProduct });
  } catch (error) {
    next(error);
  }
});

module.exports = cart_product_router;
