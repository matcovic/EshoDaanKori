import passport from "passport";
import User from "../models/user.js";
import LocalStrategy from "passport-local";
import { validPassword } from "../util/util.js";
import { createTransport } from "nodemailer";
import { config } from "dotenv";
import cloudinary from "cloudinary";

if (process.env.NODE_ENV !== "production") {
  config();
}
/**
 * This function is called when the `passport.authenticate()` method is called.
 *
 * If a user is found an validated, a callback is called (`cb(null, user)`) with the user
 * object.  The user object is then serialized with `passport.serializeUser()` and added to the
 * `req.session.passport` object.
 */
passport.use(
  new LocalStrategy(function (username, password, cb) {
    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          log("user not found");
          return cb(null, false);
        }
        const isValid = validPassword(password, user.hash, user.salt);
        log("password validation: " + isValid);
        if (isValid && user.verified) {
          return cb(null, user);
        } else {
          return cb(null, false);
        }
      })
      .catch((err) => {
        log(err);
        cb(err);
      });
  })
);

/**
 * This function is used in conjunction with the `passport.authenticate()` method.  See comments in
 * `passport.use()` above ^^ for explanation
 */
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

/**
 * This function is used in conjunction with the `app.use(passport.session())` middleware defined below.
 * Scroll down and read the comments in the PASSPORT AUTHENTICATION section to learn how this works.
 *
 * In summary, this method is "set" on the passport object and is passed the user ID stored in the `req.session.passport`
 * object later on.
 */
passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    log("user found: " + user);
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

function log(msg) {
  console.log(msg);
}

var transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS,
  },
});

cloudinary.config({
  cloud_name: "pixieum-studios",
  api_key: "785915163718651",
  api_secret: "dc4c8-evSVqEKnev6JsZ1nkAZ74",
});

export { transporter, passport, cloudinary };
