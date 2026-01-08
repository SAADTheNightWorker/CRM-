const mysql = require("mysql2");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("./settings");

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  // connectionLimit: 10,
  // connectTimeout: 60000,
});

function getConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(connection);
    });
  });
}

async function performQuery(sql, params) {
  let connection;
  try {
    connection = await getConnection();

    return new Promise((resolve, reject) => {
      connection.query(sql, params, (error, results) => {
        if (error) {
          console.error("Query error:", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  } catch (error) {
    console.error("Connection error:", error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
      console.log("Connection released");
    }
  }
}

module.exports = { pool, getConnection, performQuery };
