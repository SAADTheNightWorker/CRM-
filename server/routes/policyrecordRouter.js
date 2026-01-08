const express = require("express");
const {
  getPolicyRecords,
  createPolicyRecords,
  updatePolicyRecords,
  deletePolicyRecords,
} = require("../controller/policyrecordController");
const upload = require("../middleware/upload");

const router = express.Router();

// Policy Record Routes
router.get("/", getPolicyRecords);

router.post(
  "/",
  upload.fields([
    { name: "texInvoiceDoc", maxCount: 1 },
    { name: "policySecheduleDoc", maxCount: 1 },
    { name: "creditNoteDoc", maxCount: 1 },
  ]),
  createPolicyRecords
);

router.put(
  "/:id",
  upload.fields([
    { name: "texInvoiceDoc", maxCount: 1 },
    { name: "policySecheduleDoc", maxCount: 1 },
    { name: "creditNoteDoc", maxCount: 1 },
  ]),
  updatePolicyRecords
);

router.delete("/", deletePolicyRecords);

module.exports = router;

// import express from "express";
// import {
//   getPolicyRecords,
//   createPolicyRecords,
//   updatePolicyRecords,
//   deletePolicyRecords,
// } from "../controller/policyrecordController.js";
// import upload from "../middleware/upload.js";

// const router = express.Router();

// // Log incoming requests for debugging
// router.use((req, res, next) => {
//   console.log(`📩 Received Request: ${req.method} ${req.url}`);
//   next();
// });

// // Get all policy records
// router.get("/", getPolicyRecords);

// // Create a new policy record with file uploads
// router.post(
//   "/",
//   (req, res, next) => {
//     console.log("🛠 Preparing to upload files...");
//     next();
//   },
//   upload.fields([
//     { name: "texInvoiceDoc", maxCount: 1 },
//     { name: "policySecheduleDoc", maxCount: 1 },
//     { name: "creditNoteDoc", maxCount: 1 },
//   ]),
//   (req, res, next) => {
//     console.log("✅ Files uploaded:", req.files);
//     next();
//   },
//   createPolicyRecords
// );

// // Update a policy record
// router.put(
//   "/:id",
//   upload.fields([
//     { name: "texInvoiceDoc", maxCount: 1 },
//     { name: "policySecheduleDoc", maxCount: 1 },
//     { name: "creditNoteDoc", maxCount: 1 },
//   ]),
//   updatePolicyRecords
// );

// // Delete a policy record
// router.delete("/:id", deletePolicyRecords);

// export default router;
