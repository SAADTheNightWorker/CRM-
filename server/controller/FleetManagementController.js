const { performQuery } = require("../config/db");
const tables = require("../config/tables");
const logger = require("../Utils/logger");
const RESPONSE = require("../GlobalResponse/RESPONSE");
const dotenv = require("dotenv");
const moment = require("moment");
require("moment-timezone");
const { GlobalDelete } = require("../GlobalFunctions/GlobalDelete");
const sendApproval = require("../Utils/sendMailForFleetApproval");

dotenv.config();

const createFleetManagement = async (req, res) => {
  try {
    const created_at = moment.tz("Asia/Karachi").format("YYYY-MM-DD-HH-mm-ss");

    const { client_id, city, manufacture, maker, date, created_by } = req.body;

    const requiredFields = {
      client_id,
      city,
      manufacture,
      maker,
      date,
      created_by,
    };

    for (const [field, value] of Object.entries(requiredFields)) {
      if (!value) {
        logger.warn(`${field} is required`);
        return res
          .status(400)
          .json(RESPONSE(false, `${field} is required`, null));
      }
    }

    const baseUrl = `${req.protocol}://${req.get("host")}/upload/`;
    logger.info(`Base URL: ${baseUrl}`);

    const processFile = (fieldName) =>
      req.files?.[fieldName]?.[0]?.filename
        ? `${baseUrl}${req.files[fieldName][0].filename}`
        : null;

    const doc1 = processFile("previous_quote");
    const doc2 = processFile("passing");
    const doc3 = processFile("transfer_owner_certificate");
    const doc4 = processFile("other_doc");
    const doc5 = processFile("trade_license");
    const doc6 = processFile("list_of_vehicles");
    const doc7 = processFile("existing_quote");

    const query = `
    INSERT INTO ${tables.fleet_management} (
      client_id, city, manufacture, maker, previous_quote,
      passing, transfer_owner_certificate, other_doc,
      trade_license, list_of_vehicles, existing_quote, date, created_at, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      client_id,
      city,
      manufacture,
      maker,
      doc1,
      doc2,
      doc3,
      doc4,
      doc5,
      doc6,
      doc7,
      date,
      created_at,
      created_by,
    ];

    const result = await performQuery(query, values);
    sendApproval(city, manufacture, maker, created_at);

    logger.info("Fleet Management created successfully");
    return res
      .status(201)
      .json(RESPONSE(true, "Fleet Management created successfully", result));
  } catch (error) {
    logger.error(`Error creating Fleet Management: ${error.message}`);
    return res
      .status(500)
      .json(
        RESPONSE(false, "Failed to create Fleet Management", error.message)
      );
  }
};

const getFleetManagement = async (req, res) => {
  try {
    const sql = `SELECT f.*, c.name AS clientName, u.name AS ApprovarName
    FROM ${tables.fleet_management} AS f
    LEFT JOIN ${tables.users} AS u ON f.updated_by = u.id
    LEFT JOIN ${tables.client} AS c ON f.client_id = c.id 
    ORDER BY f.id DESC`;

    logger.info(`Executing Query: ${sql}`);
    const result = await performQuery(sql);

    if (!result || result.length === 0) {
      logger.info("No Fleet Management found");
      return res
        .status(404)
        .json(RESPONSE(false, "No Fleet Management found", null));
    }

    logger.info("Fleet Management fetched successfully");
    return res
      .status(200)
      .json(RESPONSE(true, "Fleet Management fetched successfully", result));
  } catch (error) {
    logger.error(`Error fetching Fleet Management: ${error.message}`);
    return res
      .status(500)
      .json(RESPONSE(false, "Failed to fetch Fleet Management", error.message));
  }
};

const FleetApproving = async (req, res) => {
  try {
    const { status, remarks, updated_by, id } = req.body;

    if (!updated_by || !id) {
      logger.warn("Missing required fields in approval request");
      return res
        .status(400)
        .json(RESPONSE(false, "status, updated_by, and id are required", null));
    }

    const query = `
      UPDATE ${tables.fleet_management} 
      SET status = ?, remarks = ?, updated_by = ?, updated_at = ?
      WHERE id = ?`;

    const updated_at = moment.tz("Asia/Karachi").format("YYYY-MM-DD HH:mm:ss");
    const values = [status, remarks || null, updated_by, updated_at, id];

    const result = await performQuery(query, values);

    if (result.affectedRows === 0) {
      logger.warn("Fleet Management entry not found");
      return res
        .status(404)
        .json(RESPONSE(false, "Fleet Management entry not found", null));
    }

    logger.info(`Fleet Management entry with ID ${id} updated successfully`);

    return res
      .status(200)
      .json(
        RESPONSE(true, "Fleet Management entry approved successfully", result)
      );
  } catch (error) {
    logger.error(`Error approving Fleet Management: ${error.message}`);
    return res
      .status(500)
      .json(
        RESPONSE(false, "Failed to approve Fleet Management", error.message)
      );
  }
};

module.exports = {
  createFleetManagement,
  getFleetManagement,
  FleetApproving,
};
