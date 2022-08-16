const express = require("express");
const cart_product_router = express.Router();
const {
  getAllCartProducts,
  getCartProductById,
  updateCartProduct,
  destroyCartProduct,
} = require("../db/cart_products");

cart_product_router.get("/", async (req, res, next) => {
  try {
    const allCartProducts = await getAllCartProducts();
    res.send(allCartProducts);
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

router.post("/:cartId", async (req, res, next) => {
  const { cart_id } = req.params;
  const { product_id, quantity } = req.body;
  console.log(cart_id, "cartId", product_id, "productId", quantity, "quantity");

  try {
    // if (ogcart) {
    //     next({
    //         name: 'DuplicatecartproductError',
    //         message: `product ID ${productId} already exists in cart ID ${cartId}`
    //       });
    // } else {
    const added = await addProductToCart({ cart_id, product_id, quantity });
    res.send(added);

    // }
  } catch (error) {
    next(error);
  }
});

module.exports = cart_product_router;
