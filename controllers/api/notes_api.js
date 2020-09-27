const Notes = require("../../models/notes");
const Users = require("../../models/users");

module.exports.signUp = async (req, res) => {
  try {
    const user = new Users(req.body);
    await user.save();
    return res.status(200).json({
      message: "User Created !",
    });
  } catch (error) {
    return res.json(400, {
      message: `error in creating User! ${error}`,
    });
  }
};

module.exports.signIn = (req, res) => {
  Users.findOne(
    { username: req.body.username, password: req.body.password },
    (err, user) => {
      if (err) {
        return res.json(400, {
          message: `ERROR in signing In`,
        });
      }
      if (!user) {
        return res.json(400, {
          message: `ERROR Invalid username or password`,
        });
      }
      return res.json(200, {
        message: `SignIn Successful Wellcome ${user.username}`,
      });
    }
  );
};

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
