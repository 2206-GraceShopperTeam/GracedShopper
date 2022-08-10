const client = require("./client");

async function addProductToCart({ cart_id, product_id }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      INSERT INTO cart(cartId, product_id)
      VALUES($1, $2)
      ON CONFLICT (cart_id, product_id) DO NOTHING
      RETURNING *
    `,
      [cart_id, product_id]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function getCartById(id) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      SELECT *
      FROM cart
      WHERE id=$1
    `,
      [id]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateCart(id, ...fields) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      UPDATE cart
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function destroyCart(id) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      DELETE FROM cart
        WHERE id=$1
    `,
      [id]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addProductToCart,
  getCartById,
  updateCart,
  destroyCart,
};
