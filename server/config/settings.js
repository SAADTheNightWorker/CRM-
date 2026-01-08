const dotenv = require("dotenv");
dotenv.config();

// Debugging lines
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("SECRET_KEY:", process.env.SECRET_KEY);
console.log("MAIL_HOST:", process.env.MAIL_HOST);
console.log("MAIL_USERNAME:", process.env.MAIL_USERNAME);
console.log("MAIL_PASSWORD:", process.env.MAIL_PASSWORD);

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT || 3000;

module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  PORT,
};
