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

const getCategory = async (req, res) => {
  try {
    const payload = {
      tableName: tables.category,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error fetching clients", error));
  }
};

const createCategory = async (req, res) => {
  try {
    const { category, createdby } = req.body;

    if (!category) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.category,
      databaseFields: {
        category: category,
        createdBy: createdby,
        createdAt: moment.tz("Asia/Karachi").format("YYYY-MM-DD"),
      },
    };

    await GlobalInsert(payload, res);
  } catch (error) {
    logger.error(`Error creating client: ${error.message}`, error);
    return res.status(500).send(RESPONSE(false, "Error creating client", {}));
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id, category } = req.body;

    if (!id || !category) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.category,
      databaseFields: {
        category: category,
      },
    };

    await GlobalUpdate(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error updating client", error));
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.category,
      databaseFields: {
        id: id,
      },
    };

    await GlobalDelete(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error deleting client", error));
  }
};

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
