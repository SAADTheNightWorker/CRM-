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

const getCompany = async (req, res) => {
  try {
    const payload = {
      tableName: tables.insuranceCompany,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error fetching company", error));
  }
};

const createCompany = async (req, res) => {
  try {
    const { company, createdby } = req.body;

    if (!company) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.insuranceCompany,
      databaseFields: {
        company: company,
        createdBy: createdby,
        createdAt: moment.tz("Asia/Karachi").format("YYYY-MM-DD"),
      },
    };

    await GlobalInsert(payload, res);
  } catch (error) {
    logger.error(`Error creating client: ${error.message}`, error);
    return res.status(500).send(RESPONSE(false, "Error creating company", {}));
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id, company } = req.body;

    if (!id || !company) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.insuranceCompany,
      databaseFields: {
        company: company,
      },
    };

    await GlobalUpdate(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error updating company", error));
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.insuranceCompany,
      databaseFields: {
        id: id,
      },
    };

    await GlobalDelete(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error deleting company", error));
  }
};

module.exports = {
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
