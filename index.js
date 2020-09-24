const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.get("/home", (req, res) => {
  return res.json(200, {
    message: "first api request",
  });
});

app.listen(port, () => {
  console.log("we are live on port " + port);
});
