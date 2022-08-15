const express = require('express');
const router = express.Router();
const { createCart, 
    getCartById, 
    updateCart } = require('../db/carts');
    const { addProductToCart } = require('../db/cart_products');
const { requireUser } = require('./util');

//POST /api/cart
router.post('/', requireUser, async (req, res, next) => {
    const cart = await createCart({ user_id:req.user.id })

    try {
        if(cart){
      res.send(cart)
        }
    } catch (error) {
        next(error)
        
    }
})

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

  // POST /api/cart/:cartId/products
router.post('/:cartId/products', requireUser, async (req, res, next) => {
    const {cartId} = req.params;
    const  {productId, quantity} = req.body;
    
    try {
        const ogcart = await getcartProductById(productId)
        if (ogcart) {
            next({
                name: 'DuplicatecartproductError',
                message: `product ID ${productId} already exists in cart ID ${cartId}`
              });
        } else {
            const added = await addProductToCart({ productId, quantity })
            res.send(added)
            
        }
    } catch (error){
        next(error)
    }
    
    })
    module.exports = router;