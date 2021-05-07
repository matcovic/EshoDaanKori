import User from "../models/user.js";
import { genPassword } from "../util/util.js";

async function createNewUser(form, token) {
  const saltHash = genPassword(form.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;
  const newUser = new User({
    username: form.username,
    hash: hash,
    salt: salt,
    fullName: form.fullName,
    phoneNumber: form.phoneNumber,
    dob: form.dob,
    nid: form.nid,
    token: token,
  });

  const user = await newUser.save();
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
  var query = { _id: id };
  try {
    const doc = await User.findOneAndUpdate(query, form);
    log(doc);
    if (doc !== null) {
      log("success. Updated values");
      return { status: 1, message: "user info added" };
    } else {
      return {
        status: -1,
        message: "No user found in database. Try signing up again.",
      };
    }
  } catch (err) {
    log(err);
    return { status: -1, message: err.message };
  }
}

/**
 *
 * If token matches, then sets verified = true
 * @param {*} id user id
 * @param {*} token the random token string sent to user's email
 *
 */
async function verifyUser(id, token) {
  const user = await User.findOne({ _id: id });
  if (user) {
    log("user found. Checking token now");
    if (user.token === token) {
      log("token matched!!");
      try {
        var query = { _id: id };
        const doc = await User.findOneAndUpdate(query, {
          verified: true,
          token: "null",
        });
        return { status: 1, message: "token matched. Verifying user." };
      } catch (err) {
        return { status: -1, message: err.message };
      }
    } else {
      log("token didnt match!!");
      return {
        status: -1,
        message: "Unauthorized access. Token didn't match!",
      };
    }
  } else {
    log("no user found!");
    return {
      status: -2,
      message: "no user found! The user was deleted or something",
    };
  }
}

async function findUserByEmail(email) {
  const user = await User.findOne({ username: email });
  if (user) {
    log(`user found: ${user._id}`);
    return user._id;
  } else {
    return null;
  }
}

async function setUserToken(id, token) {
  try {
    var query = { _id: id };
    const doc = await User.findOneAndUpdate(query, { token });
    log("success. Inserted token");
    return { status: 1, message: "Token saved successfully" };
  } catch (err) {
    return { status: -1, message: err.message };
  }
}

async function changeUserPassword(uid, salt, hash) {
  try {
    var query = { _id: uid };
    const doc = await User.findOneAndUpdate(query, { salt: salt, hash: hash });
    log("password changed successfully.");
    return {
      status: 1,
      message: "Password changed successfully. Redirecting...",
    };
  } catch (error) {
    return { status: -1, message: error.message };
  }
}

// cbcdd6fd94ece431e645dd8fe05013d7d0a9bd2055a8ce19591d1da9e02cc6b8
// cbcdd6fd94ece431e645dd8fe05013d7d0a9bd2055a8ce19591d1da9e02cc6b8
function log(msg) {
  console.log(msg);
}
export {
  isUserAvailable,
  createNewUser,
  updateUserInfo,
  verifyUser,
  findUserByEmail,
  setUserToken,
  changeUserPassword,
};
