const fs = require("fs");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile("./logs/application.log", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Unable to read log file");
      return;
    }
    res.send(`<pre>${data}</pre>`);
  });
});

module.exports = router;
