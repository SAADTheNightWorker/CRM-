const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const tables = require("../config/tables");
const RESPONSE = require("../GlobalResponse/RESPONSE");
const logger = require("../Utils/logger");
const sendUserCredentials = require("../Utils/sendmail");
const { performQuery } = require("../config/db");
require("moment-timezone");

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send(RESPONSE(false, "Email and password are required", {}));
  }

  try {
    const query = `SELECT * FROM ${tables.users} WHERE email = ?`;
    const users = await performQuery(query, [email]);

    if (users.length === 0) {
      logger.error("User Not Find");
      return res.status(404).send(RESPONSE(false, "User not found", {}));
    }

    const user = users[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send(RESPONSE(false, "Incorrect password", {}));
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profileImg: user.profileImg,
      },
      process.env.SECRET_KEY,
      { expiresIn: "100h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    });

    logger.info(`User with ${email} logged in successfully`);
    res.status(200).json({ message: "Login Successful", token, user });
  } catch (err) {
    logger.error(`Unexpected error: ${err.message}`);
    return res.status(500).send(RESPONSE(false, "Unexpected error", err));
  }
});

const generateRandomPassword = (length = 12) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

router.post("/reset", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send(RESPONSE(false, "Email is required", {}));
  }

  try {
    const selectQuery = `SELECT id, name FROM ${tables.users} WHERE email=?`;
    const users = await performQuery(selectQuery, [email]);

    if (users.length === 0) {
      return res
        .status(404)
        .send(RESPONSE(false, "No user found with this email", {}));
    }

    const { id: user_id, name } = users[0];

    const newPassword = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(newPassword, 14);

    const updateQuery = `UPDATE ${tables.users} SET password=? WHERE id=?`;
    await performQuery(updateQuery, [hashedPassword, user_id]);

    sendUserCredentials(email, name, newPassword, "reset", req, res);

    return res.status(200).send(
      RESPONSE(
        true,
        "Password reset successfully. Check your email for the new password.",
        {}
      )
    );
  } catch (err) {
    return res.status(500).send(RESPONSE(false, "Internal server error", err));
  }
});

module.exports = router;
