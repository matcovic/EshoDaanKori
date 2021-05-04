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

async function updateUserInfo(form, id) {
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

function log(msg) {
  console.log(msg);
}
export { isUserAvailable, createNewUser, updateUserInfo };
