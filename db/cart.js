const client = require("./client");
const { attachProductsToCart } = require("./products");

async function createCart(user_id, product_id, cart_id, quantity, price, name){
  try {
    const {rows: [cart]} = await client.query(`
    INSERT INTO carts(user_id, product_id, cart_id, quantity, price, name)
    VALUES($1, $2, $3, $4, $5, $6)
    ON CONFLICT (user_id) DO NOTHING
    RETURNING *
    `, {user_id, product_id, cart_id, quantity, price, name})

    return cart
  } catch (error) {
    throw error
  }
}

async function addProductToCart({ cart_id, product_id, quantity }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      INSERT INTO cart(cartId, product_id, quantity)
      VALUES($1, $2, $3)
      ON CONFLICT (cart_id, product_id, quantity) DO NOTHING
      RETURNING *
    `,
      [cart_id, product_id, quantity]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function getCartByUser(userId) {
  try {
    const { rows: [cart] } = await client.query(`
    SELECT * 
    FROM cart 
    WHERE user_id = $1
    `, [userId])

    return cart
  } catch (error) {
      throw error
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

async function attachProductstoCart(carts) {

  const cartToReturn = [...carts];
  const binds = carts.map((_, index) => `$${index + 1}`).join(', ');
  const cartIds = carts.map(cart => cart.id);
  if (!cartIds?.length) return [];

  try {
    const {rows: [products] } = await client.query(`
    SELECT products.name, products.price,
    FROM products 
    JOIN name ON products.name = cart.name
    JOIN price ON product.price = cart.price
    WHERE 
    ` [cart])

    for(const cart of cartsToReturn) {
      // filter the activities to only include those that have this routineId
      const productsToAdd = products.filter(product => product.cart_id === cart.id);
      // attach the activities to each single routine
      cart.products = productsToAdd;
    }

    return cartsToReturn
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createCart,
  addProductToCart,
  getCartById,
  updateCart,
  updateCart,
  destroyCart,
  getCartByUser,
  attachProductstoCart
};
