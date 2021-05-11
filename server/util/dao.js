import { cloudinary } from "../config/config.js";
import Fundraiser from "../models/fundraiser.js";
import User from "../models/user.js";
import { genPassword } from "../util/util.js";

/**
 *
 * @param {*} form
 * @param {*} token
 * @returns A User instance after saving it in the database
 */
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

/**
 * creates a schema with all the form data except the images
 * @param {*} form
 * @param {*} uid
 * @returns the schema created
 */
function createFundraiserSchema(form, uid) {
  const fundraiser = new Fundraiser({
    uid: uid,
    title: form.title,
    story: form.story,
    location: form.location,
    fundraisingGoal: form.fundraisingGoal,
    fundraisingFor: form.fundraisingFor,
    category: form.category,
    paymentOptions: form.paymentOptions,
  });

  return fundraiser;
}

/**
 *
 * @param {*} schema
 * @returns {status:n, message:str}  where n = 1 or -1
 */
async function saveFundraiser(schema) {
  try {
    await schema.save();
    return {
      status: 1,
      message: "Created a fundraiser successfully. Redirecting...",
    };
  } catch (error) {
    return {
      status: -1,
      message: `Coudn't create a fundraiser. ${error.message}`,
    };
  }
}

/**
 *
 * @param {*} coverPhoto
 * @param {*} optionalPhotos
 * @param {*} uid
 * @param {*} fundraiserId
 */
async function saveImages(coverPhoto, optionalPhotos, uid, fundraiserId) {
  var coverPhotoUrl;
  var optionalPhotoUrls = [];

  try {
    const result = await cloudinary.v2.uploader.upload(coverPhoto, {
      folder: `user/${uid}/fundraisers/${fundraiserId}/coverPhoto`,
    });
    coverPhotoUrl = result.secure_url;
    optionalPhotoUrls = await saveMultipleImages(optionalPhotos);
    return {
      status: 1,
      coverPhotoUrl,
      optionalPhotoUrls,
      message: "Image upload successful",
    };
  } catch (error) {
    console.log("file upload error: " + error.message);
    return {
      status: -3,
      undefined,
      undefined,
      message: `Failed to upload images: ${error.message}`,
    };
  }
}

/**
 * Saves multple images in cloudinary
 * @param {*} images
 * @param {*} uid
 * @param {*} fundraiserId
 * @returns a list containing all the links of the images. Can return undefined or []
 */
async function saveMultipleImages(images, uid, fundraiserId) {
  const list = [];
  if (images === null || images === undefined) {
    return undefined;
  }

  let res_promises = images.map(
    (file) =>
      new Promise(async (resolve, reject) => {
        cloudinary.v2.uploader
          .upload(file, {
            folder: `user/${uid}/fundraisers/${fundraiserId}/optionalPhotos`,
          })
          .then((result) => {
            resolve(result);
            list.push(result.secure_url);
          })
          .catch((err) => {
            reject(err);
            console.log("file upload error: " + err.message);
          });
      })
  );

  try {
    await Promise.all(res_promises);
    return list;
  } catch (error) {
    return null;
  }
}


/**
 *
 * @param {*} email
 * @returns
 */
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

/**
 *
 * @param {*} form
 * @param {*} id
 * @param {*} token
 * @returns
 */
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

/**
 *
 * @param {*} email
 * @returns
 */
async function findUserByEmail(email) {
  const user = await User.findOne({ username: email });
  if (user) {
    log(`user found: ${user._id}`);
    return user._id;
  } else {
    return null;
  }
}

/**
 *
 * @param {*} id
 * @param {*} token
 * @returns
 */
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

/**
 *
 * @param {*} uid
 * @param {*} salt
 * @param {*} hash
 * @returns
 */
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
  saveFundraiser,
  createFundraiserSchema,
  saveImages,
  saveMultipleImages,
};
