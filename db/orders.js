const client = require("./client");

async function createOrder({ cart_id, ordered_date }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
          INSERT INTO orders(cart_id, ordered_date) 
          VALUES($1, $2)
          RETURNING *;
        `,
      [cart_id, ordered_date]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrderByCart(cart_id) {
  try {
    const { rows } = await client.query(
      `
          SELECT orders.*
          FROM orders
          WHERE cart_id = $1
        `,
      [cart_id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getOrderByCart,
};
