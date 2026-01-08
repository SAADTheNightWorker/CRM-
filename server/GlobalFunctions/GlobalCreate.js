const { performQuery } = require("../config/db"); // Import performQuery function
const response = require("../GlobalResponse/RESPONSE");
const logger = require("../Utils/logger"); // Import the logger

const GlobalInsert = async (payload, res) => {
  try {
    const sql = `INSERT INTO ${payload.tableName} SET ?`;

    logger.info(
      `Executing Query: ${sql} with data: ${JSON.stringify(payload.databaseFields)}`
    );

    const result = await performQuery(sql, payload.databaseFields);

    logger.info(`Data inserted successfully into ${payload.tableName}`);

    return res
      .status(200)
      .send(response(true, `Data Has Been Successfully Created in ${payload.tableName}`, result));
  } catch (error) {
    logger.error(`Error inserting data into ${payload.tableName}: ${error.message}`);

    return res
      .status(500)
      .send(response(false, `Error While Inserting Data In ${payload.tableName}`, {}));
  }
};

module.exports = { GlobalInsert };
