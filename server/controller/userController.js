const { GlobalDelete } = require("../GlobalFunctions/GlobalDelete");
const { GlobalSelect } = require("../GlobalFunctions/GlobalSelect");
const RESPONSE = require("../GlobalResponse/RESPONSE");
const logger = require("../Utils/logger");
const sendUserCredentials = require("../Utils/sendmail");
const { performQuery } = require("../config/db");
const tables = require("../config/tables");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const moment = require("moment");
require("moment-timezone");

dotenv.config();

const getUser = async (req, res) => {
  try {
    const payload = {
      tableName: tables.users,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res.status(500).send(RESPONSE(false, "Error fetching users", error));
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 14);

    const payload = {
      tableName: tables.users,
      databaseFields: {
        email: email,
        name: name,
        password: hashedPassword,
        role: role,
        isDeleted: 0,
        createdAt: moment.tz("Asia/Karachi").format("YYYY-MM-DD-HH-MMM-SSS"),
      },
    };

    const sql = `INSERT INTO ${payload.tableName} SET ?`;

    try {
      const result = await performQuery(sql, payload.databaseFields);
      logger.info("User Created In DB Successfully");

      await sendUserCredentials(email, name, password, "create", req, res);

      return res.json(RESPONSE(true, "User Successfully Created", result));
    } catch (dbError) {
      console.error("Database Error:", dbError);

      if (dbError.code === "ENOTFOUND") {
        return res
          .status(404)
          .json(RESPONSE(false, "Internet Connection Failed", dbError));
      } else if (dbError.code === "ER_DUP_ENTRY") {
        return res
          .status(409)
          .json(RESPONSE(false, "Duplicate username. User already exists.", dbError));
      } else {
        return res
          .status(500)
          .json(RESPONSE(false, "User creation failed", dbError));
      }
    }
  } catch (err) {
    console.error("Error in registration:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.users,
      databaseFields: {
        id: id,
      },
    };

    await GlobalDelete(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error deleting client", error));
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, name, email, role, profileImg, isActive } = req.body;

    if (!id || !email || !role || !profileImg || !isActive || !name) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.users,
      databaseFields: {
        name: name,
        email: email,
        role: role,
        profileImg: profileImg,
        isActive: isActive,
      },
    };

    await GlobalDelete(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error deleting client", error));
  }
};

const resetUserPassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).send(
      RESPONSE(false, "Email, current password, and new password are required", {})
    );
  }

  try {
    const selectQuery = `SELECT id, name, password FROM ${tables.users} WHERE email=?`;
    const users = await performQuery(selectQuery, [email]);

    if (!users.length) {
      return res
        .status(404)
        .send(RESPONSE(false, "No user found with this email", {}));
    }

    const { id, name, password } = users[0];

    const isMatch = await bcrypt.compare(currentPassword, password);
    if (!isMatch) {
      logger.info(`Error: Password mismatch. Provided: ${currentPassword}, Stored: ${password}`);
      return res
        .status(400)
        .send(RESPONSE(false, "Current password is incorrect", {}));
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 14);
    const updateQuery = `UPDATE ${tables.users} SET password=? WHERE id=?`;
    await performQuery(updateQuery, [newHashedPassword, id]);

    return res
      .status(200)
      .send(RESPONSE(true, "Password updated successfully.", {}));
  } catch (err) {
    return res.status(500).send(RESPONSE(false, "Internal server error", err));
  }
};

module.exports = {
  getUser,
  createUser,
  deleteUser,
  updateUser,
  resetUserPassword,
};
