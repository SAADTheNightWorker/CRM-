const tables = require("../config/tables");
const dotenv = require("dotenv");
const { GlobalSelect } = require("../GlobalFunctions/GlobalSelect");
const { GlobalInsert } = require("../GlobalFunctions/GlobalCreate");
const { GlobalUpdate } = require("../GlobalFunctions/GlobalUpdate");
const { GlobalDelete } = require("../GlobalFunctions/GlobalDelete");
const RESPONSE = require("../GlobalResponse/RESPONSE");
const moment = require("moment");
require("moment-timezone");
const logger = require("../Utils/logger");

dotenv.config();

const getPayment = async (req, res) => {
  try {
    const payload = {
      tableName: tables.paymentMethod,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error fetching Payment", error));
  }
};

const createPayment = async (req, res) => {
  try {
    const { payment, createdby } = req.body;

    if (!payment) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.paymentMethod,
      databaseFields: {
        payment: payment,
        createdBy: createdby,
        createdAt: moment.tz("Asia/Karachi").format("YYYY-MM-DD"),
      },
    };

    await GlobalInsert(payload, res);
  } catch (error) {
    logger.error(`Error creating client: ${error.message}`, error);
    return res.status(500).send(RESPONSE(false, "Error creating Payment", {}));
  }
};

const updatePayment = async (req, res) => {
  try {
    const { id, payment } = req.body;

    if (!id || !payment) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.paymentMethod,
      databaseFields: {
        payment: payment,
      },
    };

    await GlobalUpdate(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error updating Payment", error));
  }
};

const deletePayment = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.paymentMethod,
      databaseFields: {
        id: id,
      },
    };

    await GlobalDelete(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error deleting Payment", error));
  }
};

module.exports = {
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
};
