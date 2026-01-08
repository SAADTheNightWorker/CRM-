const express = require("express");
const {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} = require("../controller/categoryController");

const router = express.Router();

// Category routes
router.get("/", getCategory);
router.post("/", createCategory);
router.put("/", updateCategory);
router.delete("/", deleteCategory);

module.exports = router;
