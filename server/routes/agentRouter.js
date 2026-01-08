const express = require("express");
const {
  getAgent,
  createAgent,
  updateAgent,
  deleteAgent,
} = require("../controller/agentController");

const router = express.Router();

// Agent routes
router.get("/", getAgent);
router.post("/", createAgent);
router.put("/", updateAgent);
router.delete("/", deleteAgent);

module.exports = router;
