const express = require("express");
const {
  createCompany,
  deleteCompany,
  getCompany,
  updateCompany,
} = require("../controller/companyController");

const router = express.Router();

// Company routes
router.get("/", getCompany);
router.post("/", createCompany);
router.put("/", updateCompany);
router.delete("/", deleteCompany);

module.exports = router;
