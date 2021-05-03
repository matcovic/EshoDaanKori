import { config } from "dotenv";
import { genPassword } from "../util/util.js";
import User from "../models/user.js";

if (process.env.NODE_ENV !== "production") {
  config();
}

function registerController(req, res, next) {
  log("req received: ");
  log(req.body);
  const saltHash = genPassword(req.body.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
    fullname: "new user sucker",
  });

  newUser.save().then((user) => {
    console.log(user);
  });

  res.cookie("cookie", "val"), res.redirect("/login");
}

function authenticationController(req, res) {
  res.header("Access-Control-Allow-Credentials", "true");
  log(req.user);

  if (req.isAuthenticated()) {
    res.json({ status: 1 });
  } else {
    res.json({ status: -1 });
  }
}

function log(msg) {
  console.log(msg);
}

export { registerController, authenticationController };
