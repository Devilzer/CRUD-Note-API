const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECT_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting to MongoDB"));

db.once("open", () => {
  console.log("*Sucessfully connected to MongoDB");
});
module.exports = db;
