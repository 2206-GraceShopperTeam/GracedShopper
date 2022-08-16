const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {JWT_SECRET} = process.env;
const { getUserById } = require("../db");

router.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

router.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

router.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if (!auth) {
    // nothing to see here`
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    
    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
      else{
        next({name: "Authorization ID Error", message: "Contact your administrator"})
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// place your routers here

// ROUTER: /api/users
const usersRouter = require("./users");
router.use("/users", usersRouter);
const cart_product_router =  require("./cart_products")
router.use("/cartProducts", cart_product_router);

const cartRouter = require("./cart");
router.use("/cart", cartRouter);

// // ROUTER: /api/activities
// const activitiesRouter = require("./products");
// router.use("/activities", activitiesRouter);

// // ROUTER: /api/cart
// const cartRouter = require("./cart");
// router.use("/cart", cartRouter);

// // ROUTER: /api/checkout
// const checkoutRouter = require("./checkout");
// router.use("/checkout", checkoutRouter);

module.exports = router;
