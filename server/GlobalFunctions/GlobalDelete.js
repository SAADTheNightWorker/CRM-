const { performQuery } = require("../config/db"); // Import performQuery function
const response = require("../GlobalResponse/RESPONSE");
const logger = require("../Utils/logger"); // Import the logger

const GlobalDelete = async (payload, res) => {
  try {
    const sql = `DELETE FROM ${payload.tableName} WHERE id = ?`;

    logger.info(`Executing Query: ${sql} with ID: ${payload.databaseFields.id}`);

    const result = await performQuery(sql, [payload.databaseFields.id]);

    logger.info(`Data deleted successfully from ${payload.tableName}`);

    return res
      .status(200)
      .send(
        response(
          true,
          `Data Has Been Successfully Deleted From ${payload.tableName}`,
          result
        )
      );
  } catch (error) {
    logger.error(`Error deleting data from ${payload.tableName}: ${error.message}`);

    return res
      .status(500)
      .send(
        response(
          false,
          `Error While Deleting Data In ${payload.tableName}`,
          {}
        )
      );
  }
};

module.exports = { GlobalDelete };
