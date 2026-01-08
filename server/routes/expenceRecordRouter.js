const express = require("express");
const {
  approving,
  createExpenseRecords,
  deleteExpenseRecord,
  getExpenseRecords,
  updateExpenseRecord,
} = require("../controller/expenseController");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getExpenseRecords);

router.post(
  "/",
  upload.fields([{ name: "paymentDoc", maxCount: 1 }]),
  createExpenseRecords
);

router.put(
  "/",
  upload.fields([{ name: "paymentDocn", maxCount: 1 }]),
  updateExpenseRecord
);

router.delete("/", deleteExpenseRecord);

router.post("/approve", approving);

module.exports = router;
