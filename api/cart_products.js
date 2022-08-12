const express = require("express");
const router = express.Router();

router.post("/cart", async (req, res, next) => {
  try {
    
    res.send(checkout)
  } catch (error) {
    next(error);
  }
});
