const express = require("express");
const {
  getUserByEmail,
  getUser,
  createUser,
  getAllUsers,
  updateUser,
} = require("../db");
const { requireUser } = require("./util");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  try {
    const { email, password, name, address, admin } = req.body;
    if (password.length < 8) {
      next({ name: "passwordLengthError", message: `Password Too Short!` });
    }
    const _user = await getUserByEmail(email);
    if (_user) {
      next({
        name: "userExistsError",
        message: `User email ${email} is already taken.`,
      });
    }
    const user = await createUser({ email, password, name, address, admin });
    const token = jwt.sign({ id: user.id, email }, JWT_SECRET);

    res.send({
      message: "thank you for signing up",
      token,
      user,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both an email and password",
    });
  }
  try {
    const user = await getUser({ email, password });
    if (user) {
      const { id, email } = user;
      const token = jwt.sign({ id, email }, JWT_SECRET);

      res.send({ user, message: "you're logged in!", token: `${token}` });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Email or password is incorrect",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch ({ name, message }) {
    next({
      name,
      message,
    });
  }
});

router.get("/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

router.patch("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  const { email, name, address } = req.body;
  try {
    const updatedUser = await updateUser(userId, { email, name, address });
    res.send(updatedUser);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = router;
