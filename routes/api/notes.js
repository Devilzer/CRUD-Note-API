const express = require("express");
const notesAPI = require("../../controllers/api/notes_api");
const router = express.Router();

router.post("/signup", notesAPI.signUp);
router.post("/signin", notesAPI.signIn);

//CRUD (create read update delete routes)
router.post("/create", notesAPI.createNote);
router.get("/", notesAPI.showPosts);
router.put("/update/:id", notesAPI.update);
router.delete("/delete/:id", notesAPI.delete);
module.exports = router;
