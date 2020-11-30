const Notes = require("../../models/notes");
const Users = require("../../models/users");
const jwt = require("jsonwebtoken");

require("dotenv").config();
let refreshTokens = [];

// user signup method
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

// user signin method
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
      const payload = {
        username: user.username,
        password: user.password,
      };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
        expiresIn: "10m",
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);
      refreshTokens.push(refreshToken);
      return res.json(200, {
        message: `SignIn Successful Wellcome ${user.username}`,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  );
};

//meathod to access token generation using refresh token 
module.exports.token = (req, res) => {
  const token = req.body.token;
  if (token == null) {
    return res.status(401).json({
      message: "Invalid request",
    });
  }
  if (!refreshTokens.includes(token)) {
    return res.status(403).json({
      message: "Invalid request",
    });
  }
  jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: `error in token verification ${err}`,
      });
    }
    const accessToken = jwt.sign(
      { username: user.username, password: user.password },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10m" }
    );
    return res.status(200).json({
      newAccessToken: accessToken,
    });
  });
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
