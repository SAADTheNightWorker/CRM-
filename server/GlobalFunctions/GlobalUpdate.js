const { performQuery } = require("../config/db"); // Import performQuery function
const response = require("../GlobalResponse/RESPONSE");
const logger = require("../Utils/logger");

const GlobalUpdate = async (payload, res) => {
  try {
    const keys = Object.keys(payload.databaseFields);
    const values = Object.values(payload.databaseFields);

    // Construct the SET part of the query dynamically
    const setClause = keys.map((key) => `${key} = ?`).join(", ");

    const sql = `UPDATE ${payload.tableName} SET ${setClause} WHERE id = ?`;

    logger.info(`Executing Query: ${sql} with values: ${[...values, payload.id]}`);

    const result = await performQuery(sql, [...values, payload.id]);

    logger.info(`Data successfully updated in ${payload.tableName}`);

    return res
      .status(200)
      .send(
        response(
          true,
          `Data Has Been Successfully Updated In ${payload.tableName}`,
          result
        )
      );
  } catch (error) {
    logger.error(`Error updating data in ${payload.tableName}: ${error.message}`);

    return res
      .status(500)
      .send(
        response(
          false,
          `Error While Updating Data In ${payload.tableName}`,
          {}
        )
      );
  }
};

module.exports = { GlobalUpdate };
