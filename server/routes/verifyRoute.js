const dotenv = require("dotenv");
const tables = require("../config/tables");
const logger = require("../Utils/logger");
const { performQuery } = require("../config/db");
const jwt = require("jsonwebtoken");

dotenv.config();

const userauth = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "User Not Authenticated" });
    }

    const token = authHeader.split(" ")[1];

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      logger.error(`JWT verification error: ${error.message}`);
      return res.status(401).json({ message: "User Not Authenticated" });
    }

    const query = `SELECT * FROM ${tables.users} WHERE id = ?`;
    const result = await performQuery(query, [decodedToken.id]);

    if (result.length > 0) {
      req.userId = decodedToken.id;
      req.userRole = result[0].role;
      next();
    } else {
      return res.status(401).json({ message: "User Not Authenticated" });
    }
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    return res.status(401).json({ message: "User Not Authenticated" });
  }
};

module.exports = userauth;
