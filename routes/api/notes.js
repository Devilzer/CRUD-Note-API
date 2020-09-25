const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  return res.json(200, {
    message: "notes API !!!!",
  });
});

module.exports = router;
