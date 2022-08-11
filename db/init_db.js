const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');
const { createProduct, getAllProducts, getProductById, getProductByName, updateProducts, deleteProduct } = require('./products');


async function dropTables() {
  client.connect();
  try {
    console.log("Dropping All Tables...");
    // drop all tables, in the correct order
    await client.query(`
  DROP TABLE IF EXISTS cart_products;
  DROP TABLE IF EXISTS cart;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS users;
  `);
  } catch (error) {
    console.error("Error dropping tables...");
    throw error;
  }
}


//In CREATE TABLE products, we may or may not need to make name VARCHAR(255) not UNIQUE
async function createTables() {
  console.log("Starting to build tables...");
  try {
    await client.query(
      `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              "firstName" VARCHAR(255) NOT NULL,
              address TEXT);

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description VARCHAR(255) NOT NULL,
          price INTEGER NOT NULL,
          category VARCHAR(255) NOT NULL
      );`

      // CREATE TABLE cart (
      //   id SERIAL PRIMARY KEY,
      //     user_id INTEGER REFERENCES users (id)
      // );

      // CREATE TABLE cart_products (
      //   id SERIAL PRIMARY KEY,
      //     product_id INTEGER REFERENCES product (id),
      //     cart_id INTEGER REFERENCES cart (id),
      //     quantity INTEGER NOT NULL
      // );
      
      
              );
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { email: "graces@hopper.com", password: "momofall", firstName: grace },
      { email: "hoppers@hopper.com", password: "trappedinrussia",firstName: hopper },
      { email: "eleven@ontherun.com", password: "hasallthepower",firstName: eleven },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    throw error;
  }
}

async function createInitialProducts() {
  console.log("Starting to create products...")
  try {
    const productsToCreate = [
      { name: "XPS13", description: "11th Gen I-51135G7, Intel Iris Xe Graphics, 512 GB M.2, 13.4 Inch Display, 60Hz, OLED, Touchscreen, 8GB Memory 4237 mHz DDR4X", price: 1300, category: "DELL"},
      { name: "Inspiron 16", description: "12th Gen i5-1235U, Intel Iris Xe Graphics, 512 GB M.2, 16 Inch Display, 60Hz, 16GB Memory 3200 mHz DDR4", price: 700, category: "DELL"},
      { name: "XPS14", description: "6900HX, NVIDIA RTX 3070Ti, 1 TB M.2, 17.3 Inch Display, 165Hz, NVIDIA G-SYNC, 16GB 4800 Mhz DDR5", price: 2350, category: "DELL"},

      { name: "ZenBook 13", description: "Intel Core i7-1165G7, Intel Iris Xe Graphics, 512GB SSD, 13.3 Inch Display, 16GB RAM", price: 1370, category: "Asus"},
      { name: "Vivobook", description: "Intel i5-1135G7 CPU, Intel Iris Xe Graphics, 15.6 Inch Display, 512GB SSD, 12GB RAM", price: 800, category: "Asus"},
      { name: "Chromebook", description: "Intel Core M3-8100Y Processor, 14 InchDisplay, 64GB eMMC Storage, 4GB RAM" , price: 400, category: "Asus"},

      {name: "HP ENVY Laptop", description: "11th Gen Intel Core i7 processor; Intel Iris Xe Graphics, 1 TB PCIe NVMe M.2 SSD, 17.3 diagonal 4K UHD, IPS, WLED-backlit, 3840 x 2160, 32 GB DDR4-3200 SDRAM", price: 845, category: 'HP'},
      {name: "Elite Dragonfly G3 - Wolf Pro Security Edition", description: "Intel Core i7-1255U, Intel Iris X Graphics, 256 GB PCIe NVMe TLC SSD, 13.5 diagonal, 16 GB", price: 2369, category: "HP"},
      {name: "Pavilion Areo Laptop 13-be1097nr", description: "AMD Ryzen 5, AMD Radeon, 512 GB SSD, 13.3 Inch WUXGA", price: 670, category: "HP"},

      
      { name: "MacBook Air", description: "Apple M2 chip,256GB SSD,13.6 inch Display, 8GB Memory", price: 1199, category:"Apple"},
      { name: "MacBook Pro", description: "Apple M1 Pro chip,512GB SSD,14 inch Display, 16GB Memory", price: 1999, category:"Apple"},
      { name: "MacBook Air (M1)", description: "Apple M1 chip,256GB SSD,13.3 inch Display, 8GB Memory", price: 900, category:"Apple"},



    ];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!")
  } catch (error) {console.error("Error creating products!");
    throw error;
}
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    console.log("Error during rebuildDB");
    throw error;
  } catch (error) {
    throw (error);
  }
}

rebuildDB();
module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};