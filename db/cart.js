const client = require("./client");

async function attachProductsToCarts() {}

async function createCarts({/* help */}) {
    try {
        const {
          rows: [cart],
        } = await client.query(
          `
          INSERT INTO carts(/* help */) 
          VALUES(/* help */)
          ON CONFLICT (name) DO NOTHING
          RETURNING *;
        `,
          [/* help */]
        );
    
        return cart;
      } catch (error) {
        throw error;
      }
}

async function getAllCarts() {}

async function getCartsById() {}

async function getCartsByUser() {}

async function getCartsWithoutProducts() {
    try {
        const { rows } = await client.query(
          `
        SELECT *
        FROM carts;
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

async function updateCarts({ id, ...fields }) {
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

async function destroyCarts(id) {
    await client.query(
        `
        DELETE FROM carts
        WHERE id=$1
      `,
        [id]
      );
}

module.exports = {
  attachProductsToCarts,
  createCarts,
  getCartsById,
  getCartsWithoutProducts,
  getAllCarts,
  getCartsByUser,
  updateCarts,
  destroyCarts,
};
