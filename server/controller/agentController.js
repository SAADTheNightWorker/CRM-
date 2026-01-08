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

const getAgent = async (req, res) => {
  try {
    const payload = {
      tableName: tables.claimWolfAgentName,
    };
    await GlobalSelect(payload, res);
  } catch (error) {
    return res.status(500).send(RESPONSE(false, "Error fetching agents", error));
  }
};

const createAgent = async (req, res) => {
  try {
    const { agent, createdby } = req.body;

    if (!agent) {
      return res.status(400).send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.claimWolfAgentName,
      databaseFields: {
        agent: agent,
        createdBy: createdby,
        createdAt: moment.tz("Asia/Karachi").format("YYYY-MM-DD"),
      },
    };

    await GlobalInsert(payload, res);
  } catch (error) {
    logger.error(`Error creating agents: ${error.message}`, error);
    return res.status(500).send(RESPONSE(false, "Error creating agents", {}));
  }
};

const updateAgent = async (req, res) => {
  try {
    const { id, agent } = req.body;

    if (!id || !agent) {
      return res.status(400).send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      id: id,
      tableName: tables.claimWolfAgentName,
      databaseFields: {
        agent: agent,
      },
    };

    await GlobalUpdate(payload, res);
  } catch (error) {
    return res.status(500).send(RESPONSE(false, "Error updating agents", error));
  }
};

const deleteAgent = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).send(RESPONSE(false, "Missing required fields", {}));
    }

    const payload = {
      tableName: tables.claimWolfAgentName,
      databaseFields: {
        id: id,
      },
    };

    await GlobalDelete(payload, res);
  } catch (error) {
    return res.status(500).send(RESPONSE(false, "Error deleting agent", error));
  }
};

module.exports = {
  getAgent,
  createAgent,
  updateAgent,
  deleteAgent,
};
