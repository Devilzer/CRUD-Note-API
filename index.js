const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/mongoose");

const app = express();
const port = 8000;

//routing to express router
app.use("/", require("./routes"));

app.get("/home", (req, res) => {
  return res.json(200, {
    message: "first api request",
  });
});

app.listen(port, () => {
  console.log("we are live on port " + port);
});
