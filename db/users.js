const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function createUser({ email, password, name, address, admin }) {
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(email, password, name,address,admin) 
        VALUES($1, $2, $3, $4,$5)  
        RETURNING id,email,name,address,admin;
      `,
      [email, hashedPassword, name, address, admin]
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
        const safeUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          address: user.address,
          admin: user.admin,
        };

        return safeUser;
      } else return false; //login failed
    }
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows: user } = await client.query(
      `
        SELECT *
        FROM users
      `
    );

    return user;
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

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
    };
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, { ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return "not enough info";
  }
  try {
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
