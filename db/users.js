const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

// user functions
async function createUser( {email, password, name, address} ) {
  // tested and working
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(email, password, name,address) 
      VALUES($1, $2, $3, $4) 
      RETURNING id,email,name,address;
      `,
      [email, hashedPassword, name, address]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ email, password }) {
  //tested and working
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
        const safeUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          address: user.address,
        };
        return safeUser;
      } else return false; //login failed
    }
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  //this is specifically so that admin can view all users
  //Tested and working
  try {
    const { rows: user } = await client.query(
      `
      SELECT *
      FROM users
      WHERE email = email
  
      `
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email) {
  //Tested and working
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT *
        FROM users
        WHERE email = $1
      `,
      [email]
    );

    return user;
  } catch (error) {
    throw error;
  }
}
async function getUserById(userId) {
  //Tested and working
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
    return { id: user.id, username: user.name };
  } catch (error) {
    throw error;
  }
}

async function updateUser({ id, ...fields }) {
  //this is so users can update their info
  //tested and working
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");
    if (setString.length > 0) {
      const {
        rows: [user],
      } = await client.query(
        `
           UPDATE users
           SET ${setString}
           WHERE id=${id}
           RETURNING *;
         `,
        Object.values(fields)
      );
      return user;
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  updateUser,
};
