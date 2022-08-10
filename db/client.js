const { Client } = require("pg");

const connectionString =
  process.env.DATABASE_URL || "https://localhost:5432/GraceShopper";

// const client = new Pool({
//   connectionString,
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : undefined,
// });

const client = new Client("https://localhost:5432/GraceShopper")

module.exports = client;