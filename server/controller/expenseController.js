const { performQuery } = require("../config/db");
const tables = require("../config/tables");
const logger = require("../Utils/logger");
const RESPONSE = require("../GlobalResponse/RESPONSE");
const dotenv = require("dotenv");
const moment = require("moment");
require("moment-timezone");
const sendApproval = require("../Utils/sendMailForApprovel");
const sendUserCredentials = require("../Utils/sendmail");

dotenv.config();

const createExpenseRecords = async (req, res) => {
  console.log("<<.body);===>>", req.body);

  try {
    const createdAt = moment.tz("Asia/Karachi").format("YYYY-MM-DD-HH-mm-ss");

    const {
      vendorNameId,
      serviceOwnerId,
      serviceDec,
      categoryId,
      amount,
      currency,
      dueDate,
      dateOfPayment,
      duration,
      vat,
      createdBy,
    } = req.body;

    const requiredFields = {
      vendorNameId,
      serviceOwnerId,
      categoryId,
      amount,
      currency,
      dueDate,
      vat,
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

    const doc1 = processFile("paymentDoc");

    const query = `
    INSERT INTO ${tables.expenceRecord} (
      vendorNameId, serviceOwnerId, serviceDec, categoryId, amount,
      currency, dueDate, dateOfPayment,
      duration, vat, paymentDoc, createdAt, createdBy
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      vendorNameId,
      serviceOwnerId,
      serviceDec,
      categoryId,
      amount,
      currency,
      dueDate,
      dateOfPayment,
      duration,
      vat,
      doc1,
      createdAt,
      createdBy,
    ];

    const result = await performQuery(query, values);

    logger.info("Expense Records created successfully");
    sendApproval(
      serviceDec,
      amount,
      currency,
      dueDate,
      dateOfPayment,
      duration,
      vat,
      createdAt
    );
    return res
      .status(201)
      .json(RESPONSE(true, "Expense Records created successfully", result));
  } catch (error) {
    logger.error(`Error creating Expense Records: ${error.message}`);
    return res
      .status(500)
      .json(RESPONSE(false, "Failed to create Expense Records", error.message));
  }
};

const getExpenseRecords = async (req, res) => {
  try {
    const sql = `SELECT e.*, vendor.vendor AS vendorName, agent.agent AS serviceOwnerName, category.category AS categoryName 
                 FROM ${tables.expenceRecord} AS e
                 LEFT JOIN ${tables.vendorsName} AS vendor ON e.vendorNameId = vendor.id
                 LEFT JOIN ${tables.category} AS category ON e.categoryId = category.id
                 LEFT JOIN ${tables.claimWolfAgentName} AS agent ON e.serviceOwnerId = agent.id order BY e.id DESC`;

    logger.info(`Executing Query: ${sql}`);
    const result = await performQuery(sql);

    if (!result || result.length === 0) {
      logger.info("No expense records found");
      return res
        .status(404)
        .json(RESPONSE(false, "No expense records found", null));
    }

    for (let expense of result) {
      if (expense.approvedBy) {
        let approvedIds = expense.approvedBy.split(",").map((id) => id.trim());
        if (approvedIds.length > 0) {
          const userQuery = `SELECT id, name, email FROM ${tables.users} WHERE id IN (?)`;
          const approvedUsers = await performQuery(userQuery, [approvedIds]);
          expense.approvedByDetails = approvedUsers;
        } else {
          expense.approvedByDetails = [];
        }
      } else {
        expense.approvedByDetails = [];
      }
    }

    logger.info("Expense Records fetched successfully with approvedBy details");
    return res
      .status(200)
      .json(RESPONSE(true, "Expense Records fetched successfully", result));
  } catch (error) {
    logger.error(`Error fetching Expense Records: ${error.message}`);
    return res
      .status(500)
      .json(RESPONSE(false, "Failed to fetch Expense Records", error.message));
  }
};

const updateExpenseRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const createdAt = moment.tz("Asia/Karachi").format("YYYY-MM-DD-HH-mm-ss");

    const {
      vendorNameId,
      serviceOwnerId,
      serviceDec,
      categoryId,
      amount,
      currency,
      dueDate,
      dateOfPayment,
      duration,
      vat,
      createdBy,
    } = req.body;

    if (!id) {
      logger.warn("Expense record ID is required");
      return res
        .status(400)
        .json(RESPONSE(false, "Expense record ID is required", null));
    }

    const baseUrl = `${req.protocol}://${req.get("host")}/upload/`;

    const processFile = (fieldName) =>
      req.files?.[fieldName]?.[0]?.filename
        ? `${baseUrl}${req.files[fieldName][0].filename}`
        : null;

    const doc1 = processFile("paymentDoc");

    const query = `
      UPDATE ${tables.expenceRecord} 
      SET vendorNameId = ?, serviceOwnerId = ?, serviceDec = ?, categoryId = ?, amount = ?, 
          currency = ?, dueDate = ?, dateOfPayment = ?, duration = ?, vat = ?, 
          paymentDoc = ?, createdAt = ?, createdBy = ?
      WHERE id = ?`;

    const values = [
      vendorNameId,
      serviceOwnerId,
      serviceDec,
      categoryId,
      amount,
      currency,
      dueDate,
      dateOfPayment,
      duration,
      vat,
      doc1,
      createdAt,
      createdBy,
      id,
    ];

    const result = await performQuery(query, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(RESPONSE(false, "Expense Record not found", null));
    }

    logger.info("Expense Record updated successfully");
    return res
      .status(200)
      .json(RESPONSE(true, "Expense Record updated successfully", result));
  } catch (error) {
    logger.error(`Error updating Expense Record: ${error.message}`);
    return res
      .status(500)
      .json(RESPONSE(false, "Failed to update Expense Record", error.message));
  }
};

const deleteExpenseRecord = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      logger.warn("Expense record ID is required");
      return res
        .status(400)
        .json(RESPONSE(false, "Expense record ID is required", null));
    }

    const query = `DELETE FROM ${tables.expenceRecord} WHERE id = ?`;
    const result = await performQuery(query, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(RESPONSE(false, "Expense Record not found", null));
    }

    logger.info("Expense Record deleted successfully");
    return res
      .status(200)
      .json(RESPONSE(true, "Expense Record deleted successfully", result));
  } catch (error) {
    logger.error(`Error deleting Expense Record: ${error.message}`);
    return res
      .status(500)
      .json(RESPONSE(false, "Failed to delete Expense Record", error.message));
  }
};

const approving = async (req, res) => {
  try {
    const { id, approvedBy, status } = req.body;

    const query = `SELECT * FROM ${tables.expenceRecord} WHERE id=?`;
    const result = await performQuery(query, [id]);

    if (!result || result.length === 0) {
      logger.info("No expense records found for approval");
      return res
        .status(404)
        .json(RESPONSE(false, "No expense records found for approval", null));
    }

    let approval = result[0].approvedBy ? result[0].approvedBy.split(",") : [];
    if (!approval.includes(approvedBy)) {
      approval.push(approvedBy);
    }
    const updatedApproved = approval.join(",");

    const fetchApprovalUserQuery = `SELECT id, email, name FROM ${tables.users} WHERE role=2`;
    const approvalUserResult = await performQuery(fetchApprovalUserQuery);

    if (!approvalUserResult || approvalUserResult.length === 0) {
      logger.info("No User For Approval Found");
      return res
        .status(404)
        .json(RESPONSE(false, "No User For Approval Found", null));
    }

    if (approvalUserResult.length === approval.length) {
      const updateApprovalQuery = `
        UPDATE ${tables.expenceRecord} 
        SET approvedDone = ?, approvedBy = ?
        WHERE id = ?`;

      const updateApprovalRes = await performQuery(updateApprovalQuery, [
        status,
        updatedApproved,
        id,
      ]);

      logger.info(`Approval Accepted By All For Expense ID ${id}`);

      return res
        .status(200)
        .json(
          RESPONSE(
            true,
            "Approval Accepted By All successfully",
            updateApprovalRes
          )
        );
    }

    if (status === 2) {
      const updateQuery = `UPDATE ${tables.expenceRecord} SET approvedDone = ? WHERE id = ?`;
      const updateRes = await performQuery(updateQuery, [status, id]);

      logger.info(`Approval Declined for Expense ID ${id}`);
      return res
        .status(200)
        .json(
          RESPONSE(true, "Expense Record Declined successfully", updateRes)
        );
    }

    if (approvalUserResult.length !== approval.length) {
      const updateApprovedByQuery = `UPDATE ${tables.expenceRecord} SET approvedBy = ? WHERE id = ?`;
      await performQuery(updateApprovedByQuery, [updatedApproved, id]);

      logger.info(`Approval Updated for Expense ID ${id} by ${approvedBy}`);

      let approvedByName =
        approvalUserResult.find((user) => user.id == approvedBy)?.name ||
        "Unknown";

      for (const user of approvalUserResult) {
        if (approvedBy !== user.id) {
          sendUserCredentials(
            user.email,
            user.name,
            result[0],
            "approval pending",
            approvedByName,
            req,
            res
          );
        }
      }

      return res.status(200).json(
        RESPONSE(true, "Approval updated successfully", {
          approvedBy: updatedApproved,
        })
      );
    }
  } catch (error) {
    logger.error(`Error approving Expense Record: ${error.message}`);
    return res
      .status(500)
      .json(RESPONSE(false, "Failed to Approve Expense Record", error.message));
  }
};

module.exports = {
  createExpenseRecords,
  getExpenseRecords,
  updateExpenseRecord,
  deleteExpenseRecord,
  approving,
};
