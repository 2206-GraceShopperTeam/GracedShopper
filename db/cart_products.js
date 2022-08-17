const client = require("./client");

async function getAllCartProducts() {
  try {
    const { rows } = await client.query(
      `
      SELECT cart_products.*, products.*
      FROM cart_products
      JOIN products ON cart_products.product_id=products.id
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createCartProducts({ cart_id, product_id, quantity }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
    INSERT INTO cart_products (cart_id, product_id, quantity)
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
      INSERT INTO cart_products (cart_id, product_id, quantity)
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

async function getCartProductById(cart_id) {
  try {
    const { rows } = await client.query(
      `
        SELECT *
        FROM cart_products
        WHERE cart_id=$1
      `,
      [cart_id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateCartProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
    
    if (setString.length === 0) {
      return;
    }
    
    try {
      const {
        rows: [cart_product],
    } = await client.query(
      `
        UPDATE cart_products
        SET ${setString}
        WHERE product_id=${id}
        RETURNING *;
      `,
      Object.values(fields)
    );

    return cart_product;
  } catch (error) {
    throw error;
  }
}

async function destroyCartProduct(id) {
  try {
    const {
      rows: [cart_product],
    } = await client.query(
      `
        DELETE FROM cart_products
        WHERE id=$1
      `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllCartProducts,
  createCartProducts,
  addProductToCart,
  getCartProductById,
  updateCartProduct,
  destroyCartProduct,
};
