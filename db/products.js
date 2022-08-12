const { client } = require(".");

async function createProduct({ name, description, price, category }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products (name, description, price, category)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [name, description, price, category]
    );
    return product;
  } catch (error) {
    console.log("Trouble creating activity", error);
  }
}

async function getAllProducts() {
  try {
    const { rows: product } = await client.query(`
        SELECT *
        FROM products
        `);

    return product;
  } catch (error) {
    console.error("Trouble Getting All Products...");
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT *
        FROM products
        WHERE id=$1
        `,
      [id]
    );
    if (!product) {
      return null;
    }
    return product;
  } catch (error) {
    console.error("Trouble getting product by ID", error);
  }
}

async function getProductByName(name) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT *
        FROM products
        WHERE name = $1
        `,
      [name]
    );
    return product;
  } catch (error) {
    console.error("Trouble getting product by name...", error);
  }
}

async function attachProductsToCartProducts({
  cart_id,
  product_id,
  quantity,
}) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        INSERT INTO carts (cart_id, product_id, quantity)
        VALUES ($1, $2, $3)
        JOIN products ON cart_products.product_id = products.id
        RETURNING *
        `,
      [cart_id, product_id, quantity]
    );
    console.log(cart, "cart");
    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateProducts({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
            `,
      Object.values(fields)
    );
    return product;
  } catch (error) {
    console.error("Trouble Updating Products...");
  }
}

async function deleteProduct(id) {
  try {
    await client.query(`
            DELETE FROM products
            WHERE id=${id};
            `);
  } catch (error) {
    console.error("Trouble deleting products", error);
  }
}
//Check the DELETE FROM line, it may not be products

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductByName,
  attachProductsToCartProducts,
  updateProducts,
  deleteProduct,
};
