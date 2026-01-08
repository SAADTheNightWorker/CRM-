const { performQuery } = require("../config/db");
const tables = require("../config/tables");
const logger = require("../Utils/logger");
const RESPONSE = require("../GlobalResponse/RESPONSE");
const dotenv = require("dotenv");
const moment = require("moment");
require("moment-timezone");
const { GlobalDelete } = require("../GlobalFunctions/GlobalDelete");
const { GlobalUpdate } = require("../GlobalFunctions/GlobalUpdate");

dotenv.config();

const createRevenueRecords = async (req, res) => {
  try {
    const createdAt = moment.tz("Asia/Karachi").format("YYYY-MM-DD HH:mm:ss");

    const {
      scBrockerNameId,
      incCompanyId,
      policyPaymentMethod,
      dateofPolicyIssue,
      taxInvoiceNum,
      creditNoteAmount,
      policyNum,
      claimWolfNetCommission,
      policyPayOutstandingAmount,
      createdBy,
    } = req.body;

    const requiredFields = {
      scBrockerNameId,
      incCompanyId,
      policyPaymentMethod,
      dateofPolicyIssue,
      taxInvoiceNum,
      creditNoteAmount,
      policyNum,
      claimWolfNetCommission,
      policyPayOutstandingAmount,
      createdBy,
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

    const doc1 = processFile("policyPaymentDoc");

    const query = `
      INSERT INTO ${tables.revneueRecord} (
        scBrockerNameId, incCompanyId, policyPaymentMethod, dateofPolicyIssue, taxInvoiceNum, 
        creditNoteAmount, policyNum, claimWolfNetCommission, policyPayOutstandingAmount, 
        policyPaymentDoc, createdAt, createdBy)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

    const values = [
      scBrockerNameId,
      incCompanyId,
      policyPaymentMethod,
      dateofPolicyIssue,
      taxInvoiceNum,
      creditNoteAmount - (5 * creditNoteAmount) / 100,
      policyNum,
      (claimWolfNetCommission * creditNoteAmount) / 100,
      policyPayOutstandingAmount,
      doc1,
      createdAt,
      createdBy,
    ];

    const result = await performQuery(query, values);

    logger.info("Revenue Records created successfully");
    return res
      .status(201)
      .json(RESPONSE(true, "Revenue Records created successfully", result));
  } catch (error) {
    logger.error(`Error creating Revenue Records: ${error.message}`);
    return res
      .status(500)
      .json(RESPONSE(false, "Failed to create Revenue Records", error.message));
  }
};

const getRevenueRecord = async (req, res) => {
  try {
    const sql = `
      SELECT r.*, broker.broker AS brokerName, company.company AS companyName, payment.payment AS PaymentMethod 
      FROM ${tables.revneueRecord} AS r
      LEFT JOIN ${tables.brokerName} AS broker ON r.scBrockerNameId = broker.id
      LEFT JOIN ${tables.insuranceCompany} AS company ON r.incCompanyId = company.id
      LEFT JOIN ${tables.paymentMethod} AS payment ON r.policyPaymentMethod = payment.id
    `;

    logger.info(`Executing Query: ${sql}`);
    const result = await performQuery(sql);

    if (!result || result.length === 0) {
      logger.info("No Revenue records found");
      return res
        .status(404)
        .json(RESPONSE(false, "No Revenue records found", null));
    }

    logger.info("Revenue Records fetched successfully");
    return res
      .status(200)
      .json(RESPONSE(true, "Revenue Records fetched successfully", result));
  } catch (error) {
    logger.error(`Error fetching Revenue Records: ${error.message}`);
    return res
      .status(500)
      .json(RESPONSE(false, "Failed to fetch Revenue Records", error.message));
  }
};

const updateRevenueRecords = async (req, res) => {
  try {
    const createdAt = moment.tz("Asia/Karachi").format("YYYY-MM-DD HH:mm:ss");

    const {
      id,
      scBrockerNameId,
      incCompanyId,
      policyPaymentMethod,
      dateofPolicyIssue,
      taxInvoiceNum,
      creditNoteAmount,
      policyNum,
      claimWolfNetCommission,
      policyPayOutstandingAmount,
      createdBy,
    } = req.body;

    const requiredFields = {
      id,
      scBrockerNameId,
      incCompanyId,
      policyPaymentMethod,
      dateofPolicyIssue,
      taxInvoiceNum,
      creditNoteAmount,
      policyNum,
      claimWolfNetCommission,
      policyPayOutstandingAmount,
      createdBy,
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

    const processFile = (fieldName) =>
      req.files?.[fieldName]?.[0]?.filename
        ? `${baseUrl}${req.files[fieldName][0].filename}`
        : null;

    const doc1 = processFile("policyPaymentDoc");

    const query = `
      UPDATE ${tables.revneueRecord} 
      SET 
        scBrockerNameId = ?, 
        incCompanyId = ?, 
        policyPaymentMethod = ?, 
        dateofPolicyIssue = ?, 
        taxInvoiceNum = ?, 
        creditNoteAmount = ?, 
        policyNum = ?, 
        claimWolfNetCommission = ?, 
        policyPayOutstandingAmount = ?, 
        createdBy = ?, 
        policyPaymentDoc = ?
      WHERE id = ?`;

    const values = [
      scBrockerNameId,
      incCompanyId,
      policyPaymentMethod,
      dateofPolicyIssue,
      taxInvoiceNum,
      creditNoteAmount - (5 * creditNoteAmount) / 100,
      policyNum,
      (claimWolfNetCommission * creditNoteAmount) / 100,
      policyPayOutstandingAmount,
      createdBy,
      doc1,
      id,
    ];

    const result = await performQuery(query, values);

    if (result.affectedRows > 0) {
      logger.info("Revenue Records Updated Successfully");
      return res
        .status(200)
        .json(RESPONSE(true, "Revenue Records updated successfully", result));
    } else {
      return res
        .status(404)
        .json(
          RESPONSE(false, "No revenue record found with the given ID", null)
        );
    }
  } catch (error) {
    logger.error(`Error updating revenue records: ${error.message}`);
    return res.status(500).json(
      RESPONSE(
        false,
        `Failed to update revenue records: ${
          error.sqlMessage || error.message
        }`,
        error
      )
    );
  }
};

const deleteRevenueRecords = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.revneueRecord,
      databaseFields: {
        id: id,
      },
    };

    await GlobalDelete(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error deleting Revenue Record", error));
  }
};

module.exports = {
  createRevenueRecords,
  getRevenueRecord,
  updateRevenueRecords,
  deleteRevenueRecords,
};
