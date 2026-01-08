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

const getClient = async (req, res) => {
  try {
    const payload = {
      tableName: tables.client,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error fetching clients", error));
  }
};

const createClient = async (req, res) => {
  try {
    const { name, createdby } = req.body;

    if (!name) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.client,
      databaseFields: {
        name: name,
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

const updateClient = async (req, res) => {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.client,
      databaseFields: {
        name: name,
      },
    };

    await GlobalUpdate(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error updating client", error));
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("id==>", req.body);

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.client,
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
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
