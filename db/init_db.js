const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

const client = require("./client");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    // drop all tables, in the correct order
    await client.query(`
  DROP TABLE IF EXISTS "routineActivities";
  DROP TABLE IF EXISTS routine_activities;
  DROP TABLE IF EXISTS routines;
  DROP TABLE IF EXISTS activities;
  DROP TABLE IF EXISTS users;
  `);
  } catch (error) {
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
              "firstName" VARCHAR(255) NOT NULL,
              address TEXT,
      
      
              `);
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

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
  } catch (error) {
    console.log("Error during rebuildDB");
    throw error;
  }
}


module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};