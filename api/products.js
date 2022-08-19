const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByName,
  updateProducts,
  deleteProduct,
} = require("../db/products");
const router = express.Router();
const { requireUser } = require("./util");

router.get("/:productId", async (req, res, next) => {
  const productId= req.params.productId;
  try {
    const product = await getProductById(productId);
      res.send(product);
  } catch ({ name, message }) {
    next({
      name,
      message,
    });
  }
});

router.get("/", async (req, res, next) => {
  const products = await getAllProducts();
  res.send(products);
});

router.post("/", requireUser, async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await getProductByName(name);
    if (product) {
      next({
        name: "Name already exists",
        message: `A product with name ${name} already exists`,
      });
    } else {
      const postData = {
        name,
        description,
        price,
        category,
      };
      const newProduct = await createProduct(postData);
      res.send(newProduct);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.patch("/:productId", requireUser, async (req, res, next) => {
  const productId = req.params.productId;
  
  const { name, description, price, category } = req.body;
  try {
   
      const updatedProduct = await updateProducts(productId, {name, description, price, category});
      res.send(updatedProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.delete('/:productId', async(req,res,next) => {
    const productId = req.params.productId
    try {
        const product = await getProductById(productId)
            await deleteProduct(productId)
            const deleted = await getProductById(productId)
            if(!deleted){
              res.send({ success: true, ..._routine })
            }
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = router;
