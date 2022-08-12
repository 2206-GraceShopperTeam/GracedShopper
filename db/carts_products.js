const client = require("./client");
const { attachProductsToCart } = require("./products");

async function createCart({cart_id, product_id, quantity}){
  try {
    const {rows: [cart]} = await client.query(`
    INSERT INTO carts(cart_id, product_id, quantity)
    VALUES($1, $2, $3)
    RETURNING *;
    `, [cart_id, product_id, quantity])

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
      INSERT INTO carts(cart_id, product_id, quantity)
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
  attachProductstoCart
};
