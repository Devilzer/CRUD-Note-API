const express = require("express");
const db = require("./config/mongoose");

const app = express();
const port = 8000;

app.use(express.json());

app.use("/", require("./routes"));

app.get("/home", (req, res) => {
  return res.json(200, {
    message: "first api request",
  });
});

app.listen(port, () => {
  console.log("we are live on port " + port);
});
