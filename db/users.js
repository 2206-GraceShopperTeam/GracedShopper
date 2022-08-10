const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// user functions
async function createUser({ email, password,firstName,address }) {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    console.log("is this firing")
    try {
      const {
        rows: [user],
      } = await client.query(
        `
      INSERT INTO users(email, password, "firstName",address) 
      VALUES($1, $2, $3, $4) 
      ON CONFLICT (email) DO NOTHING 
      RETURNING id,email,"firstName",address;
      `,
        [email, hashedPassword,firstName,address]
      );
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function getUser({ email, password }) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
      SELECT *
      FROM users
      WHERE email=$1
    `,
        [email]
      );
      if (user) {
        const hash = await bcrypt.compare(password, user.password);
        if (hash) {
          const safeUser = { id: user.id, email: user.email, name: user.name, address: user.address };
          return safeUser;
        } else return false; //login failed
      }
    } catch (error) {
      throw error;
    }
  }


  async function getUserByEmail(email) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
        SELECT *
        FROM users
        WHERE email=$1;
      `,
        [email]
      );
  
      return user;
    } catch (error) {
      throw error;
    }
  }
  async function getUserById(userId) {
    try {
      const {
        rows: [user],
      } = await client.query(
        `
      SELECT *
      FROM users
      WHERE id = $1;
      `,
        [userId]
      );
      return { id: user.id, username: user.username };
    } catch (error) {
      throw error;
    }
  }
  



  module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByEmail,
  };