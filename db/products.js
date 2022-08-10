const { client } = require(".");

async function createProduct({name, description, price, category}) {
    try {
        const {rows:[product]} = await client.query (`
        INSERT INTO products (name, description, price, category)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [name, description, price, category])
        return product
    } catch (error) {
        console.log("Trouble creating activity", error)
    }
}

async function getAllProducts() {
    try{
        const {rows: productId} = await client.query(`
        SELECT *
        FROM products
        WHERE id=$1
        `)

        const products = await Promise.all(productId.map(product => getProductById(product.id)))

        return products;
    } catch (error) {
        console.error ("Trouble Getting All Products...")
    }
}

async function getProductById() {
    try {
        const {rows: [products]} = await client.query(`
        SELECT *
        FROM products
        WHERE id=${productID}
        `)
        if(!product) {
            return null
        }
        return product
    } catch (error) {
        console.error("Trouble getting product by ID", error)
    }
}

async function getProductByName(name) {
    try {
        const {rows: [product]} = await client.query(`
        SELECT *
        FROM products
        WHERE name = $1
        `, [name])
        return product
    } catch (error) {
        console.error("Trouble getting product by name...", error)
    }
}


async function attachProductsToCarts(carts) {
    const cartsToReturn = [...carts];
    const binds = carts.map((_, index) => `$${index + 1}`).join(', ');
    const cartIds = carts.map(cart => cart.id);
    if (!cartIds?.length) return [];

    try {
        const {rows: products} = await client.query(`
        SELECT carts.*, cart_products."productId" = products.id
        FROM products
        JOIN cart_products ON cart_products."productID" = products.id
        WHERE cart_products."productId" IN (${binds});
        `, cartIds);

        for (const cart of cartsToReturn) {
            const productsToAdd = products.filter(cart => cart.productId === product.id);
            //^^ this might be wrong, please check
            cart.products = productsToAdd;
        }
        return cartsToReturn;
    } catch (error) {
        console.error("Trouble attaching Products to Carts...", error);
    }
}



module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    attachProductsToCarts,
  };