const { performQuery } = require("../config/db");
const tables = require("../config/tables");
const logger = require("../Utils/logger");
const RESPONSE = require("../GlobalResponse/RESPONSE");
const dotenv = require("dotenv");
const moment = require("moment");
require("moment-timezone");
const { GlobalDelete } = require("../GlobalFunctions/GlobalDelete");

dotenv.config();

const createPolicyRecords = async (req, res) => {
  try {
    const createdAt = moment.tz("Asia/Karachi").format("YYYY-MM-DD-HH-mm-ss");

    const {
      clientId,
      scbrokerNameId,
      scIncCompanyId,
      agnentNameId,
      chassisNumber,
      dateOfIssue,
      netPolicyAmount,
      creditNoteAmount,
      created_by,
    } = req.body;

    const requiredFields = {
      clientId,
      scbrokerNameId,
      scIncCompanyId,
      agnentNameId,
      chassisNumber,
      created_by,
      dateOfIssue,
      netPolicyAmount,
      creditNoteAmount,
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

    const doc1 = processFile("texInvoiceDoc");
    const doc2 = processFile("policySecheduleDoc");
    const doc3 = processFile("creditNoteDoc");

    const expiryDate = moment(dateOfIssue, "YYYY-MM-DD")
      .add(1, "year")
      .format("YYYY-MM-DD");

    const query = `
      INSERT INTO ${tables.policyRecord} (
        clientId, scbrokerNameId, scIncCompanyId, agnentNameId, chassisNumber,
        dateOfIssue, netPolicyAmount, creditNoteAmount,
        texInvoiceDoc, policySecheduleDoc, creditNoteDoc, createdAt, createdBy, expiryDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      clientId,
      scbrokerNameId,
      scIncCompanyId,
      agnentNameId,
      chassisNumber,
      dateOfIssue,
      netPolicyAmount,
      creditNoteAmount,
      doc1,
      doc2,
      doc3,
      createdAt,
      created_by,
      expiryDate,
    ];

    const result = await performQuery(query, values);

    logger.info("Policy Records created successfully");
    return res
      .status(201)
      .json(RESPONSE(true, "Policy Records created successfully", result));
  } catch (error) {
    logger.error(`Error creating Policy Records: ${error.message}`);
    return res
      .status(500)
      .json(RESPONSE(false, "Failed to create Policy Records", error.message));
  }
};

const getPolicyRecords = async (req, res) => {
  try {
    const sql = `SELECT p.*, client.name AS clientName, broker.broker AS brokerName, company.company AS companyName, agent.agent AS agentName 
                 FROM ${tables.policyRecord} AS p
                 LEFT JOIN ${tables.client} AS client ON p.clientId = client.id
                 LEFT JOIN ${tables.brokerName} AS broker ON p.scbrokerNameId = broker.id
                 LEFT JOIN ${tables.insuranceCompany} AS company ON p.scIncCompanyId = company.id
                 LEFT JOIN ${tables.claimWolfAgentName} AS agent ON p.agnentNameId = agent.id ORDER BY p.dateOfIssue DESC;`;

    logger.info(`Executing Query: ${sql}`);
    const result = await performQuery(sql);

    if (!result || result.length === 0) {
      logger.info("No policy records found");
      return res
        .status(404)
        .json(RESPONSE(false, "No policy records found", null));
    }

    logger.info("Policy Records fetched successfully");
    return res
      .status(200)
      .json(RESPONSE(true, "Policy Records fetched successfully", result));
  } catch (error) {
    logger.error(`Error fetching Policy Records: ${error.message}`);
    return res
      .status(500)
      .json(RESPONSE(false, "Failed to fetch Policy Records", error.message));
  }
};

// Placeholder for future logic
const updatePolicyRecords = async (req, res) => {
  res
    .status(501)
    .json(RESPONSE(false, "Update functionality not implemented yet", null));
};

const deletePolicyRecords = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.policyRecord,
      databaseFields: {
        id: id,
      },
    };

    await GlobalDelete(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error deleting Policy Record", error));
  }
};

module.exports = {
  createPolicyRecords,
  getPolicyRecords,
  updatePolicyRecords,
  deletePolicyRecords,
};
