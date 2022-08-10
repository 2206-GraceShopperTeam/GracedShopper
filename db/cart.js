const client = require("./client");

async function addProductToCart({ cartId, productId }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      INSERT INTO
    `,
      [cartId, productId]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateCart({}) {
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
      `,
      []
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
      `,
      []
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
    addProductToCart,
    updateCart,
    getCartById,
  };