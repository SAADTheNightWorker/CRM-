const express = require("express");
const {
  updatePolicyRecords,
  deletePolicyRecords,
} = require("../controller/policyrecordController");


const upload = require("../middleware/upload");


const {
  createFleetManagement,
  FleetApproving,
  getFleetManagement,
} = require("../controller/FleetManagementController");

const router = express.Router();

router.get("/", getFleetManagement);

router.post(
  "/",
  upload.fields([
    { name: "previous_quote", maxCount: 1 },
    { name: "passing", maxCount: 1 },
    { name: "transfer_owner_certificate", maxCount: 1 },
    { name: "other_doc", maxCount: 1 },
    { name: "trade_license", maxCount: 1 },
    { name: "list_of_vehicles", maxCount: 1 },
    { name: "existing_quote", maxCount: 1 },
  ]),
  createFleetManagement
);

router.put(
  "/",
  upload.fields([
    { name: "previous_quote", maxCount: 1 },
    { name: "passing", maxCount: 1 },
    { name: "transfer_owner_certificate", maxCount: 1 },
    { name: "other_doc", maxCount: 1 },
    { name: "trade_license", maxCount: 1 },
    { name: "list_of_vehicles", maxCount: 1 },
    { name: "existing_quote", maxCount: 1 },
  ]),
  updatePolicyRecords
);

router.put("/fleetApprove", FleetApproving);

router.delete("/", deletePolicyRecords);

module.exports = router;
