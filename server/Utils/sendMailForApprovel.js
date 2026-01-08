const RESPONSE = require("../GlobalResponse/RESPONSE");
const logger = require("../Utils/logger");
const dotenv = require("dotenv");
const { performQuery } = require("../config/db");
const tables = require("../config/tables");
const sendUserCredentials = require("./sendmail");

dotenv.config();

async function sendApproval(
  serviceDec,
  amount,
  currency,
  dueDate,
  dateOfPayment,
  duration,
  vat,
  createdAt
) {
  try {
    const query = `SELECT * FROM ${tables.users} WHERE role=2`;
    const result = await performQuery(query);

    if (!result || result.length === 0) {
      logger.info("No User For Approval Found");
      return { success: false, message: "No User For Approval Found" };
    }

    // Send email to all users with role=2
    await Promise.all(
      result.map((item) =>
        sendUserCredentials(
          item.email,
          item.name,
          {
            serviceDec,
            amount,
            currency,
            dueDate,
            dateOfPayment,
            duration,
            vat,
            createdAt,
          },
          "approval"
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

module.exports = sendApproval;
