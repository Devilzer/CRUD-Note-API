const Notes = require("../../models/notes");

module.exports.createNote = async (req, res) => {
  try {
    const note = new Notes(req.body);
    await note.save();
    return res.json(200, {
      message: "Note Created!",
    });
  } catch (error) {
    return res.json(400, {
      message: `error in creating Note! ${error}`,
    });
  }
};

module.exports.showPosts = async (req, res) => {
  try {
    const notes = await Notes.find(
      {},
      {
        createdAt: false,
        updatedAt: false,
        __v: false,
      }
    ).sort("-createdAt");
    return res.json(200, notes);
  } catch (error) {
    return res.json(400, {
      message: `Error in displaying Notes! ${error}`,
    });
  }
};

module.exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Notes.findById(id);
    await note.update(req.body);

    return res.json(200, {
      message: "Note Updated!",
    });
  } catch (error) {
    return res.json(400, {
      message: `Error in Updating Notes! ${error}`,
    });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    note.remove();
    return res.json(200, {
      message: "Note Deleted",
    });
  } catch (error) {
    return res.json(400, {
      message: `Error in deleting Note! ${error}`,
    });
  }
};
