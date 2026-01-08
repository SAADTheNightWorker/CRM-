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

const getBroker = async (req, res) => {
  try {
    const payload = {
      tableName: tables.brokerName,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error fetching brokers", error));
  }
};

const createBroker = async (req, res) => {
  try {
    const { broker, createdby } = req.body;

    if (!broker) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.brokerName,
      databaseFields: {
        broker: broker,
        createdBy: createdby,
        createdAt: moment.tz("Asia/Karachi").format("YYYY-MM-DD"),
      },
    };

    await GlobalInsert(payload, res);
  } catch (error) {
    logger.error(`Error creating broker: ${error.message}`, error);
    return res.status(500).send(RESPONSE(false, "Error creating broker", {}));
  }
};

const updateBroker = async (req, res) => {
  try {
    const { id, broker } = req.body;

    if (!id || !broker) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.brokerName,
      databaseFields: {
        broker: broker,
      },
    };

    await GlobalUpdate(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error updating broker", error));
  }
};

const deleteBroker = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.brokerName,
      databaseFields: {
        id: id,
      },
    };

    await GlobalDelete(payload, res);
  } catch (error) {
    return res
      .status(500)
      .send(RESPONSE(false, "Error deleting broker", error));
  }
};

module.exports = {
  getBroker,
  createBroker,
  updateBroker,
  deleteBroker,
};
