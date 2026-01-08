const express = require("express");
const {
  getNotifications,
  updateNotifications,
  deleteNotifications,
} = require("../controller/notifcationController");

const router = express.Router();

router.get("/", getNotifications);
router.put("/", updateNotifications);
router.delete("/", deleteNotifications);

module.exports = router;
