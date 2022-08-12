const { client } = require("./");
const { createUser, getAllUsers } = require("./users");
const {
  createProduct,
  getAllProducts,
  attachProductsToCarts,
} = require("./products");
const { getAllCarts, createCart, getCartById } = require("./carts");
const { createCartProducts } = require("./cart_products");

async function dropTables() {
  client.connect();
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS cart_products;
    DROP TABLE IF EXISTS carts_products;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS carts;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS users;
  `);
    console.log("Finished Dropping Tables...");
  } catch (error) {
    console.error("Error dropping tables...");
    throw error;
  }
}

async function createTables() {
  console.log("Starting to build tables...");
  try {
    await client.query(
      `CREATE TABLE users (
        id SERIAL PRIMARY KEY,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              name VARCHAR(255) NOT NULL,
              address TEXT
      );

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description VARCHAR(255) NOT NULL,
          price INTEGER NOT NULL,
          category VARCHAR(255) NOT NULL
      );

      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          is_ordered BOOLEAN DEFAULT false
      );
      
      CREATE TABLE cart_products (
        id SERIAL PRIMARY KEY,
          cart_id INTEGER REFERENCES carts(id),
          product_id INTEGER REFERENCES products(id),
          quantity INTEGER NOT NULL,
          UNIQUE (product_id, cart_id)
      );

      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
          cart_id INTEGER REFERENCES carts(id),
          ordered_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
      );
    `
    );
    console.log("Finished Building Tables...");
  } catch (error) {
    console.error("Error building tables...");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      { email: "graces@hopper.com", password: "momofall", name: "grace" },
      {
        email: "hoppers@hopper.com",
        password: "trappedinrussia",
        name: "hopper",
      },
      {
        email: "eleven@ontherun.com",
        password: "hasallthepower",
        name: "eleven",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users...");
    throw error;
  }
}

async function createInitialProducts() {
  console.log("Starting to create products...");
  try {
    const productsToCreate = [
      {
        name: "XPS13",
        description:
          "11th Gen I-51135G7, Intel Iris Xe Graphics, 512 GB M.2, 13.4 Inch Display, 60Hz, OLED, Touchscreen, 8GB Memory 4237 mHz DDR4X",
        price: 1300,
        category: "DELL",
      },
      {
        name: "Inspiron 16",
        description:
          "12th Gen i5-1235U, Intel Iris Xe Graphics, 512 GB M.2, 16 Inch Display, 60Hz, 16GB Memory 3200 mHz DDR4",
        price: 700,
        category: "DELL",
      },
      {
        name: "XPS14",
        description:
          "6900HX, NVIDIA RTX 3070Ti, 1 TB M.2, 17.3 Inch Display, 165Hz, NVIDIA G-SYNC, 16GB 4800 Mhz DDR5",
        price: 2350,
        category: "DELL",
      },

      {
        name: "ZenBook 13",
        description:
          "Intel Core i7-1165G7, Intel Iris Xe Graphics, 512GB SSD, 13.3 Inch Display, 16GB RAM",
        price: 1370,
        category: "Asus",
      },
      {
        name: "Vivobook",
        description:
          "Intel i5-1135G7 CPU, Intel Iris Xe Graphics, 15.6 Inch Display, 512GB SSD, 12GB RAM",
        price: 800,
        category: "Asus",
      },
      {
        name: "Chromebook",
        description:
          "Intel Core M3-8100Y Processor, 14 InchDisplay, 64GB eMMC Storage, 4GB RAM",
        price: 400,
        category: "Asus",
      },

      {
        name: "HP ENVY Laptop",
        description:
          "11th Gen Intel Core i7 processor; Intel Iris Xe Graphics, 1 TB PCIe NVMe M.2 SSD, 17.3 diagonal 4K UHD, IPS, WLED-backlit, 3840 x 2160, 32 GB DDR4-3200 SDRAM",
        price: 845,
        category: "HP",
      },
      {
        name: "Elite Dragonfly G3 - Wolf Pro Security Edition",
        description:
          "Intel Core i7-1255U, Intel Iris X Graphics, 256 GB PCIe NVMe TLC SSD, 13.5 diagonal, 16 GB",
        price: 2369,
        category: "HP",
      },
      {
        name: "Pavilion Areo Laptop 13-be1097nr",
        description: "AMD Ryzen 5, AMD Radeon, 512 GB SSD, 13.3 Inch WUXGA",
        price: 670,
        category: "HP",
      },

      {
        name: "MacBook Air",
        description: "Apple M2 chip,256GB SSD,13.6 inch Display, 8GB Memory",
        price: 1199,
        category: "Apple",
      },
      {
        name: "MacBook Pro",
        description: "Apple M1 Pro chip,512GB SSD,14 inch Display, 16GB Memory",
        price: 1999,
        category: "Apple",
      },
      {
        name: "MacBook Air (M1)",
        description: "Apple M1 chip,256GB SSD,13.3 inch Display, 8GB Memory",
        price: 900,
        category: "Apple",
      },
    ];
    const products = await Promise.all(productsToCreate.map(createProduct));

    console.log("Products created:");
    console.log(products);
    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products...");
    throw error;
  }
}

async function createInitialCart() {
  const users = await getAllUsers();

  try {
    const cartToCreate = [
      {
        user_id: users[0].id,
        is_ordered: false,
      },
    ];

    const cart = await Promise.all(cartToCreate.map(createCart));

    console.log("Cart created:");
    console.log(cart);
    console.log("Finished creating cart!");
  } catch (error) {
    console.error("Error creating cart...");
    throw error;
  }
}

async function createInitialCartProducts() {
  console.log("Starting to create carts...");
  const carts = await getAllCarts();
  const products = await getAllProducts();

  try {
    const cartProductsToCreate = [
      {
        cart_id: carts[0].id,
        product_id: products[0].id,
        quantity: 2,
      },
      // {
      //   cart_id: carts[1].id,
      //   product_id: products[1].id,
      //   quantity: 2,
      // },
      // {
      //   cart_id: carts[2].id,
      //   product_id: products[2].id,
      //   quantity: 2,
      // },
    ];

    const cart = await Promise.all(
      cartProductsToCreate.map(createCartProducts)
    );

    console.log("Cart_products created!");
    console.log(cart);
    console.log("Finished creating cart_products!");
  } catch (error) {
    console.error("Error creating cart_products...");
    throw error;
  }
}

// async function createInitialCheckout() {
//   console.log("Starting to create checkout...");
//   const carts = await getCartById(1);
//   console.log(carts, "message2");
//   try {
//     const checkoutToCreate = [{ user_id: 2, cart_id: 1 }];

//     const checkout = await Promise.all(checkoutToCreate.map(createCheckout));

//     console.log("Checkout created:");
//     console.log(checkout);
//     console.log("Finished creating checkout!");
//   } catch (error) {
//     console.error("Error creating checkout...");
//     throw error;
//   }
// }

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
    await createInitialUsers();
    await createInitialProducts();
    await createInitialCart();
    await createInitialCartProducts();
    // await createInitialCheckout();
    console.log(await getCartById(4), "this is before");
    // await attachProductsToCarts({
    //   user_id: 1,
    //   product_id: 9,
    //   quantity: 2,
    //   name: "MacBook Pro",
    // });
    // await attachProductsToCarts({
    //   user_id: 1,
    //   product_id: 8,
    //   quantity: 2,
    //   name: "XPS14",
    // });
    console.log(await getCartById(4), "this is after");
    console.log(await getCartById(5), "this is after");
    client.end();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}

rebuildDB();
module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
