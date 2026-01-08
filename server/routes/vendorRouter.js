const express = require("express");
const {
  createVendor,
  deleteVendor,
  getVendor,
  updateVendor,
} = require("../controller/vendorController");

const router = express.Router();

// Vendor routes
router.get("/", getVendor);
router.post("/", createVendor);
router.put("/", updateVendor);
router.delete("/", deleteVendor);

module.exports = router;
