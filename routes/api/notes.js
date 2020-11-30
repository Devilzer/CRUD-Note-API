const express = require("express");
const notesAPI = require("../../controllers/api/notes_api");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.use(express.json());

//Sign-up route send username and password in json data
router.post("/signup", notesAPI.signUp);
router.post("/signin", notesAPI.signIn);
//router to update the accessToken using refreshToken
router.post("/token", notesAPI.token);

//CRUD (create read update delete routes)
router.post("/create", authenticateToken, notesAPI.createNote);
router.get("/", authenticateToken, notesAPI.showPosts);
router.put("/update/:id", authenticateToken, notesAPI.update);
router.delete("/delete/:id", authenticateToken, notesAPI.delete);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json({
      message: "Invalid request",
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json(err);
    }
    next();
  });
}
module.exports = router;
