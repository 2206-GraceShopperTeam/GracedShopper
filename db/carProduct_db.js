
const client = require('./client');

async function createCart_products({}){
    try{
        const {rows: [products]} = await client.query('')

        return createCart_products
    }catch (error) {
        throw error;
    }
}

async function 