const config = require("../config/index");
const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

const signup = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.username) {
      return res
        .status(400)
        .send({ message: "Please enter Username, Email and Password!!!!" });
    }

    const doesUserAlreadyExists = await User.findOne({
      email: req.body.email,
    });
    if (doesUserAlreadyExists) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const user = new User(req.body);
    const data = {};
    const savedUser = await user.save();
    if (!savedUser) {
      return res.status(400).json({ message: "User not saved!" });
    } else {
      data.status = 201;
      data.userId = savedUser._id;
      data.username = savedUser.username;
      data.emailId = savedUser.email;
      data.message = "User Created Successfully";
      const token = newToken(user);
      data.token = token;
    }
    return res.status(data.status).send(data);
  } catch (e) {
    return res.status(500).end();
  }
};

const signin = async (req, res) => {
  console.log("herer", req.body);
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: "need email and password." });
  }

  const invalid = {
    status: 401,
    message: "Invalid email and password combination.",
  };

  try {
    const user = await User.findOne({ email: req.body.email })
      .select("email password username")
      .exec();
    console.log(",.,.,", user);
    if (!user) {
      return res.send(invalid);
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.send(invalid);
    }

    const token = newToken(user);
    return res.status(201).send({
      token,
      userId: user._id,
      username: user.username,
      emailId: user.email,
    });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).end();
  }
  const token = bearer.split("Bearer ")[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }
  const user = await User.findById(payload.id)
    .select("-password")
    .lean()
    .exec();
  if (!user) {
    return res.status(401).end();
  }
  req.user = user;
  next();
};

const signout = async (req, res, next) => {
  console.log("signout ->>>");
};
module.exports = { signup, signin, protect, signout };
