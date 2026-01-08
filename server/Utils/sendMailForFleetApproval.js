const RESPONSE = require("../GlobalResponse/RESPONSE");
const logger = require("../Utils/logger");
const dotenv = require("dotenv");
const { performQuery } = require("../config/db");
const tables = require("../config/tables");
const sendUserCredentials = require("./sendmail");

dotenv.config();

async function sendMailForFleetApproval(
  city,
  manufacture,
  maker,
  created_by,
  created_at
) {
  try {
    const query = `SELECT * FROM ${tables.users} WHERE role=1`;
    const result = await performQuery(query);

    if (!result || result.length === 0) {
      logger.info("No User For Approval Found");
      return { success: false, message: "No User For Approval Found" };
    }

    await Promise.all(
      result.map((item) =>
        sendUserCredentials(
          item.email,
          item.name,
          {
            city,
            manufacture,
            maker,
            created_at,
          },
          "fleetApproval"
        )
      )
    );

    return { success: true, message: "Approval emails sent successfully" };
  } catch (error) {
    logger.error(
      `Error Fetching Record From Users In Sending Email: ${error.message}`
    );
    return {
      success: false,
      message: "Failed Fetching Record From Users In Sending Email",
      error: error.message,
    };
  }
}

module.exports = sendMailForFleetApproval;
