const express = require("express");
const { getPolicyChartData } = require("../controller/policyChartController");

const router = express.Router();

// GET /api/policyData
router.get("/", getPolicyChartData);

module.exports = router;
