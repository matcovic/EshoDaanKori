import User from "../models/user.js";
import { genPassword } from "../util/util.js";

async function createNewUser(form) {
  const saltHash = genPassword(form.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new User({
    username: form.username,
    hash: hash,
    salt: salt,
  });

  const user = await newUser.save();
  log(user);
  return user;
}

async function isUserAvailable(email) {
  const user = await User.findOne({ username: email });
  log(user);
  if (user) {
    log("user already exists");
    return true;
  } else {
    log("user does not exist already");
    return false;
  }
}

async function updateUserInfo(form, id, token) {
  form.token = token;
  form.verified = true;
  var query = { _id: id };
  try {
    const doc = await User.findOneAndUpdate(query, form);
    log("success. Updated values");
    return { status: 1 };
  } catch (err) {
    log(err);
    return { status: -1 };
  }
}

async function verifyUser(id, token) {
  const user = await User.findOne({ _id: id });
  if (user) {
    log("user found. Checking token now");
    if (user.token === token) {
      log("token matched!!");
      return { status: 1 };
    } else {
      log("token didnt match!!");
      return { status: -1 };
    }
  }
  log("no user found!");
  return { status: -2 };
}

function log(msg) {
  console.log(msg);
}
export { isUserAvailable, createNewUser, updateUserInfo, verifyUser };
