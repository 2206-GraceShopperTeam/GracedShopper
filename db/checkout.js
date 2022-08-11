const client = require("./client");
const { attachCartToCheckout } = require("./cart");

async function createCheckout({ user_id }) {
  try {
    const {
      rows: [checkout],
    } = await client.query(
      `
          INSERT INTO checkout(user_id) 
          VALUES($1)
          ON CONFLICT (user_id) DO NOTHING
          RETURNING *;
        `,
      [user_id]
    );

    return checkout;
  } catch (error) {
    throw error;
  }
}

async function getCheckoutById(id) {
  try {
    const { rows } = await client.query(
      `
          SELECT checkout.*
          FROM checkout
          WHERE id = $1
        `
    );

    return attachCartToCheckout(rows);
  } catch (error) {
    throw error;
  }
}

async function getCheckoutByUser(user_id) {
  try {
    const { rows } = await client.query(
      `
          SELECT checkout.*
          FROM checkout
          WHERE user_id = $1
        `
    );

    return attachCartToCheckout(rows);
  } catch (error) {
    throw error;
  }
}

async function getCheckoutWithoutProducts() {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM checkout;
    `
    );
    if (!rows) {
      return null;
    }
    return rows;
  } catch (error) {
    throw error;
  }
}

async function destroyCheckout(id) {
  try {
    await client.query(
      `
        DELETE FROM checkout
        WHERE id=$1
      `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCheckout,
  getCheckoutById,
  getCheckoutWithoutProducts,
  getCheckoutByUser,
  destroyCheckout,
};
