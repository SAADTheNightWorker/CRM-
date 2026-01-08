const { performQuery } = require("../config/db"); // Import performQuery function
const response = require("../GlobalResponse/RESPONSE");
const logger = require("../Utils/logger"); // Import logger

// ✅ Global Select - Fetch All Records
const GlobalSelect = async (payload, res) => {
  try {
    const sql = `SELECT * FROM ${payload.tableName} ORDER BY id DESC`;

    logger.info(`Executing Query: ${sql}`);

    const result = await performQuery(sql);

    logger.info(`Successfully selected data from ${payload.tableName}`);

    return res.send(response(true, `Successfully selected from ${payload.tableName}`, result));
  } catch (error) {
    logger.error(`Error selecting data from ${payload.tableName}: ${error.message}`);

    return res.send(response(false, `Error while selecting from ${payload.tableName}`, {}));
  }
};

// ✅ Global Select - Fetch Records with WHERE Condition (Safe Query)
const GlobalSelectWithWhereClause = async (payload, res) => {
  try {
    const sql = `SELECT ${payload.select} FROM ${payload.tableName} WHERE ${payload.key} = ? ORDER BY id DESC`;

    logger.info(`Executing Query: ${sql} with value: ${payload.value}`);

    const result = await performQuery(sql, [payload.value]);

    logger.info(`Successfully selected data from ${payload.tableName} where ${payload.key} = ${payload.value}`);

    return res.send(response(true, `Successfully selected from ${payload.tableName}`, result));
  } catch (error) {
    logger.error(`Error selecting data from ${payload.tableName}: ${error.message}`);

    return res.send(response(false, `Error while selecting from ${payload.tableName}`, {}));
  }
};

module.exports = {
  GlobalSelect,
  GlobalSelectWithWhereClause,
};
