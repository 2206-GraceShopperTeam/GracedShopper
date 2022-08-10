const { client } = require(".");

async function createProduct({name, description, price, category}) {
    try {
        const {rows:[product]} = await client.query (`
        INSERT INTO products (name, description, price, category)
        VALUES ($1, $2,$3,$4)
        RETURNING *;
        `, [name, description, price, category])
        return product
    } catch (error) {
        console.log("Trouble creating activity", error)
    }
}

module.exports = {
    createProduct,
  };