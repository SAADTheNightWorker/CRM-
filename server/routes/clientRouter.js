const express = require("express");
const {
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require("../controller/clientController");

const router = express.Router();

// Client routes
router.get("/", getClient);
router.post("/", createClient);
router.put("/", updateClient);
router.delete("/", deleteClient);

module.exports = router;
