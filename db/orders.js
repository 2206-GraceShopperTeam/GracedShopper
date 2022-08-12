const client = require("./client");
const { attachCartToCheckout } = require("./carts_products");

async function createOrder({cart_id, ordered_date}) {
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
        `, [cart_id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

// async function getCheckoutById(id) {
//   try {
//     const { rows } = await client.query(
//       `
//           SELECT checkout.*
//           FROM checkout
//           WHERE id = $1
//         `, [id]
//     );

//     return rows;
//   } catch (error) {
//     throw error;
//   }
// }

// async function getCheckoutWithoutProducts() {
//   try {
//     const { rows } = await client.query(
//       `
//         SELECT *
//         FROM checkout;
//     `
//     );
//     if (!rows) {
//       return null;
//     }
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// }

// async function destroyCheckout(id) {
//   try {
//     await client.query(
//       `
//         DELETE FROM checkout
//         WHERE id=$1
//       `,
//       [id]
//     );
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  createOrder,
  getOrderByCart,
  // getCheckoutById,
  // getCheckoutWithoutProducts,
  // destroyCheckout,
};
