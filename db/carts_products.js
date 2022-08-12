const client = require("./client");

async function createCart({ cart_id, product_id, quantity }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
    INSERT INTO carts(cart_id, product_id, quantity)
    VALUES($1, $2, $3)
    RETURNING *;
    `,
      [cart_id, product_id, quantity]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function addProductToCart({ cart_id, product_id, quantity }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      INSERT INTO carts(cart_id, product_id, quantity)
      VALUES($1, $2, $3)
      RETURNING *;
    `,
      [cart_id, product_id, quantity]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart,
  addProductToCart,
};
