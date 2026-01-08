const express = require("express");
const {
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controller/paymentController");

const router = express.Router();

// Payment routes
router.get("/", getPayment);
router.post("/", createPayment);
router.put("/", updatePayment);
router.delete("/", deletePayment);

module.exports = router;
