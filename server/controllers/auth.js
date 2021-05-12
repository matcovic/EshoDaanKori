import {
  isUserAvailable,
  createNewUser,
  verifyUser,
  setUserToken,
  findUserByEmail,
  changeUserPassword,
  getUserById,
} from "../util/dao.js";
import randomstring from "randomstring";
import {
  respond,
  sendVerificationEmail,
  generateHashPassword,
  clearCookies,
} from "../util/util.js";
import e from "express";
import mongoose from "mongoose";

/**
 * Registers a new user and sends a verification token to the user's email
 * @param {*} req contains the user crendentials and sign up form info
 */
async function registerController(req, res, next) {
  log("req received: ");
  log(req.body);
  const a = await isUserAvailable(req.body.username);
  if (!a) {
    log("creating new user...");
    var verification_token = randomstring.generate({
      length: 20,
    });

    const user = await createNewUser(req.body, verification_token);
    log(user);

    // send a verification email
    log("sending verification email...");

    const result = await sendVerificationEmail(
      user.username,
      `Verify your account`,
      `Please click on the link to verify yourself: ${process.env.SERVER_HOST}/verify/${verification_token}/${user._id}/`,
      "verification"
    );

    res.json(result);
  } else {
    log("not creating new user");
    res.json(
      respond(
        -1,
        "An account with the given credentials already exist. Please log in."
      )
    );
  }
}

function authenticationController(req, res) {
  // console.log(req);
  var result;
  // checking authentication status
  if (req.cookies.session == "active") {
    log("user logged in! Authenticated");
    result = { status: 1, message: "User is logged in already" };
  } else {
    log("user not logged in! NOT Authenticated");
    result = { status: 0, message: "User is not logged in" };
  }

  res.json(result);
}

/**
 *
 * @GET
 * After user clicks on the verify link from their email,
 * this is triggered.
 * Verifies the user
 */
async function verificationController(req, res) {
  const userId = req.params.userid;
  const token = req.params.token;
  // check if token matches the user
  const result = await verifyUser(userId, token);
  res.redirect(`${process.env.CLIENT_HOST}/sign-in`);
}

function loginSuccessController(req, res) {
  if (!req.cookies.session) {
    res.json(
      respond(
        -2,
        "User with the given credentials not found. Did you enter them correctly?"
      )
    );
  } else {
    const user = await getUserById(req.cookies.sessionID);
    if (user.verified) {
      log("logged in success.");
      res.json(respond(1, "Logged in!"));
    } else {
      log("Email not verified");
      res.json(respond(-1, "Email not verified!"));
    }
  }
}

function loginFailureController(req, res) {
  log("login failed");
  res.json(
    respond(
      -1,
      "Login failed. Incorrect credentials entered or your email has not been verified yet"
    )
  );
}

function signOutController(req, res) {
  console.log(req.cookies);
  clearCookies(res);
  req.logout();
  res.json(respond(1, "Successfully logged out. Redirecting..."));
}

/**
 *
 * @POST
 * Sends a password reset link to the email address provided
 */
async function forgotPasswordController(req, res) {
  const email = req.body.email;
  const userId = await findUserByEmail(email);
  if (userId !== null) {
    // generate a token and send an email to the user
    var verification_token = randomstring.generate({
      length: 64,
    });

    const status = await setUserToken(userId, verification_token);
    if (status.status === 1) {
      // send a verification email
      const result = await sendVerificationEmail(
        email,
        `Reset your Password`,
        `Please click on the link to reset your password: ${process.env.CLIENT_HOST}/reset-password/${verification_token}/${userId}`,
        "resetPassword"
      );
      res.json(result);
    } else {
      res.json(status);
    }
  } else {
    res.json({
      status: -1,
      message:
        "A user with the given email does not exist in our database. Are you sure you are providing the correct email?",
    });
  }
}

async function resetPasswordController(req, res) {
  const path = req.body.location.split("/");
  const token = path[2];
  const uid = path[3];

  // checks if the uid is a valid objectID
  if (!mongoose.isValidObjectId(uid)) {
    res.json({
      status: -2,
      message: "The link is invalid. Please request a new link.",
    });
    return;
  }
  // check if token matches the user.
  // if it does, then redirect the user to reset password page
  const result = await verifyUser(uid, token);
  if (result.status === 1) {
    if (req.body.password === req.body.confirmPassword) {
      log("new pass: " + req.body.password);
      const pass = generateHashPassword(req.body.password);
      log(`uid: ${uid}`);
      const result = await changeUserPassword(uid, pass.salt, pass.hash);
      if (result.status === 1) {
        result.redirectUrl = "/sign-in";
      }
      res.json(result);
    } else {
      console.log("Passwords do not match");
    }
  } else {
    res.json(result);
  }
}

function log(msg) {
  console.log(msg);
}

export {
  registerController,
  authenticationController,
  verificationController,
  loginSuccessController,
  loginFailureController,
  signOutController,
  forgotPasswordController,
  resetPasswordController,
};
