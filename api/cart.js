const express = require("express");
const router = express.Router();
const {
  createCart,
  getCartById,
  updateCart,
  getCartByUser,
} = require("../db/carts");
const { addProductToCart } = require("../db/cart_products");
const { requireUser } = require("./util");

//POST /api/cart/userId
router.get("/:userId", async (req, res, next) => {
  const {userId} = req.params
  console.log(userId,"hello")
  
  try {
    const cart = await getCartByUser(userId);
    console.log(cart, "general")
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

router.post("/createCart", async (req, res, next) => {
  const user_id = req.body
  const cart = await createCart( user_id );
  try {
    if (cart) {
      res.send(cart);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cart/:cartId
// router.delete('/:cartId', requireUser, async (req, res, next) => {
//     const cartId = req.params.cartId;
//     const cart = await getCartById(cartId)
//     try {
//           if(cart.userId != req.user.id){
//             res.status(403)
//             next({
//                 name: 'UnauthorizedDeleteError',
//                 message: `User ${req.user.id} is not allowed to delete ${cart.id}`
//               });
//           }else{
//             destroycart(cartId)
//             res.send(cart)
//           }
//     }catch ({ name, message }) {
//         next({ name, message });

//     }
//   });


module.exports = router;
