const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  resetUserPassword,
} = require("../controller/userController");

const router = express.Router();

// User routes
router.get("/", getUser);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.put("/reset", resetUserPassword);

module.exports = router;
