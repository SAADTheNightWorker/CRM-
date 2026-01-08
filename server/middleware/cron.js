const cron = require("node-cron");
const dotenv = require("dotenv");
const tables = require("../config/tables");
const { performQuery } = require("../config/db");
const logger = require("../Utils/logger");
const sendUserCredentials = require("../Utils/sendmail");
const moment = require("moment-timezone");

dotenv.config();

// Cron Job - Runs every day at midnight
// cron.schedule("0 0 * * *", async () => {
//   console.log("Checking for expiring policies...");

//   const today = moment.tz("Asia/Karachi").format("YYYY-MM-DD");

//   const query = `
//     SELECT u.email, u.name, p.expiryDate
//     FROM ${table.policyRecord} AS p
//     JOIN ${table.users} AS u ON p.CreatedBy = u.id
//     WHERE DATEDIFF(DATE(p.expiryDate),?) = 30`;

//   try {
//     const results = await performQuery(query, [today]);

//     if (results.length === 0) {
//       logger.info("No expiring policies found.");
//       return;
//     }

//     logger.info(`${results.length} expiring policies found. Sending emails...`);

//     for (const { name, email, expiryDate } of results) {
//       try {
//         sendUserCredentials(email, name, expiryDate, "Policy Expiry Reminder");
//         logger.info(`Email sent to ${email}`);
//       } catch (emailError) {
//         logger.error(`Email error for ${email}: ${emailError.message}`);
//       }
//     }
//   } catch (queryError) {
//     logger.error(`Error fetching expiring policies: ${queryError.message}`);
//   }
// });

// console.log("Cron job scheduled.");

// Runs daily at midnight

cron.schedule("0 0 * * *", async () => {
  console.log("Checking for expiring policies...");

  // const today = "2026-12-03T00:00:00.000Z";
  const today = moment.tz("Asia/Karachi").format("YYYY-MM-DD");
  const selectQuery = `
    SELECT 
      p.id AS policy_id,
      p.expiryDate,
      u.email,
      u.name AS userName,
      client.name AS clientName,
      broker.broker AS brokerName
    FROM ${tables.policyRecord} AS p
    JOIN ${tables.users} AS u 
      ON p.CreatedBy = u.id
    LEFT JOIN ${tables.client} AS client 
      ON p.clientId = client.id
    LEFT JOIN ${tables.brokerName} AS broker 
      ON p.scbrokerNameId = broker.id
    WHERE p.isDeleted = 0
      AND DATEDIFF(DATE(p.expiryDate), ?) = 30
  `;

  const insertNotificationQuery = `
    INSERT INTO notifications 
      (expire_on, title, description, team_name, name, is_deleted, is_read, policy_id)
    VALUES 
      (?, ?, ?, ?, ?, 0, 0, ?)
  `;

  const checkExistingQuery = `
    SELECT id 
    FROM notifications
    WHERE policy_id = ? AND expire_on = ? AND is_deleted = 0
    LIMIT 1
  `;

  try {
    const results = await performQuery(selectQuery, [today]);

    if (!results || results.length === 0) {
      logger.info("No expiring policies found.");
      return;
    }

    logger.info(`${results.length} expiring policies found.`);

    for (const row of results) {
      const { policy_id, expiryDate, email, userName, clientName, brokerName } =
        row;

      const expireOn = expiryDate;
      const title = brokerName || "Policy Expiry Reminder";
      const description = `Policy for client ${
        clientName || "N/A"
      } is going to expire on ${moment(expiryDate).format(
        "YYYY-MM-DD"
      )}. Please take necessary action.`;
      const teamName = "Claim Wolf Admin Team";
      const name = userName || "User";

      const already = await performQuery(checkExistingQuery, [
        policy_id,
        expireOn,
      ]);
      if (already && already.length > 0) {
        logger.info(`Notification already exists for policy_id=${policy_id}`);
        continue;
      }

      await performQuery(insertNotificationQuery, [
        expireOn,
        title,
        description,
        teamName,
        name,
        policy_id,
      ]);

      logger.info(`Notification inserted for policy_id=${policy_id}`);

      try {
        sendUserCredentials(email, name, expiryDate, "Policy Expiry Reminder");
        logger.info(`Email sent to ${email}`);
      } catch (emailError) {
        logger.error(`Email error for ${email}: ${emailError.message}`);
      }
    }
  } catch (error) {
    logger.error(`Cron job error: ${error.message}`);
  }
});

console.log("Cron job scheduled.");
