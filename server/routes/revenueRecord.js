const express = require("express");
const upload = require("../middleware/upload");
const {
  createRevenueRecords,
  deleteRevenueRecords,
  getRevenueRecord,
  updateRevenueRecords,
} = require("../controller/revenueRecordController");

const router = express.Router();

// Revenue Record Routes
router.get("/", getRevenueRecord);

router.post(
  "/",
  upload.fields([{ name: "policyPaymentDoc", maxCount: 1 }]),
  createRevenueRecords
);

router.put(
  "/",
  upload.fields([{ name: "policyPaymentDoc", maxCount: 1 }]),
  updateRevenueRecords
);

router.delete("/", deleteRevenueRecords);

module.exports = router;
