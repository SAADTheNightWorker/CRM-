const express = require("express");
const {
  getBroker,
  createBroker,
  updateBroker,
  deleteBroker,
} = require("../controller/brokerController");

const router = express.Router();

// Broker routes
router.get("/", getBroker);
router.post("/", createBroker);
router.put("/", updateBroker);
router.delete("/", deleteBroker);

module.exports = router;
