const client = require("./client");

async function createCart({user_id, is_ordered}) {
  try {
    const {
      rows: [cart]
    } = await client.query(
      `
      INSERT INTO carts (user_id, is_ordered)
      VALUES ($1, $2)
      RETURNING *;
      `, [user_id, is_ordered]
      )
    return cart;
  } catch (error) {
    throw error;
  }
}

async function getAllCarts() {
  try {
    const { rows: cart } = await client.query(`
        SELECT *
        FROM carts
        `);

    return cart;
  } catch (error) {
    throw error;
  }
}

async function getCartByUser(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      SELECT * 
      FROM carts
      WHERE user_id = $1
      `,
      [userId]
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
        FROM carts
        WHERE id=$1
      `,
      [id]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateCart({ id, ...fields }) {
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
        UPDATE carts
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
        DELETE FROM carts
        WHERE id=$1
      `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart,
  getAllCarts,
  getCartByUser,
  getCartById,
  updateCart,
  destroyCart,
};
