const express = require("express");
const notesAPI = require("../../controllers/api/notes_api");
const router = express.Router();

//CRUD (create read update delete routes)
router.post("/create", notesAPI.createNote);
router.get("/", notesAPI.showPosts);
router.put("/update/:id", notesAPI.update);

module.exports = router;
