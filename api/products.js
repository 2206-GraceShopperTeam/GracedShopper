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
  const { productId } = req.params;
  const obj = { id: productId };

  try {
    const product = await getProductById(obj);
    if (!product.length) {
      next({
        name: "Product Error",
        message: `Product ${productId} not found`,
      });
    } else {
      res.send(product);
    }
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
    const { name } = req.body;
    const product = await getProductByName(name);
    console.log(product, "$$$$$$$$$")
    if (product.name === name) {
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
      console.log(postData, "!!!!!!!!!")

      const newProduct = await createProduct(postData);

      res.send(newProduct);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.patch("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;
  const obj = { id: productId };
  const { name, description, price, category } = req.body;
  const fields = {};

  if (name) {
    fields.name = name;
  }
  if (description) {
    fields.description = description;
  }
  if (price) {
    fields.price = price;
  }
  if (category) {
    fields.category = category;
  }
  try {
    const productName = await getProductByName(name);

    if (!productName) {
      next({
        name: "doesnotexisterror",
        message: `Product ${name} not found`,
      });
    } else {
      const updatedProduct = updateProducts(obj, fields);
      res.send(updatedProduct);
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});



router.delete('/:productId', requireUser, async(req,res,next) => {
    const {productId} = req.params
    // const obj = {id:productId}
    try {
        const product = await getProductById(productId)
        if (product) {
            deleteProduct(productId)
            res.send(product)
        } else {
            res.status(403);
            next({
                name: "Missing User Error",
                message: `User ${req.user.username} is not allowed to delete`
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = router;
