import {
  isUserAvailable,
  createNewUser,
  updateUserInfo,
  verifyUser,
  setUserToken,
} from "../util/dao.js";
import randomstring from "randomstring";
import { respond, sendVerificationEmail, clearCookies } from "../util/util.js";
import e from "express";

async function registerController(req, res, next) {
  log("req received: ");
  log(req.body);
  const a = await isUserAvailable(req.body.username);
  if (!a) {
    log("creating new user");
    const user = await createNewUser(req.body);
    res.cookie("userId", user._id.toString());
    res.cookie("userEmail", user.username);
    res.cookie("registrationStatus", false.toString());

    res.json(respond(1, "User created!"));
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
  var result;
  // checking authentication status
  if (req.isAuthenticated()) {
    log("user logged in! Authenticated");
    result = { status: 1, message: "User is logged in already" };
  } else {
    log("user not logged in! NOT Authenticated");
    result = { status: 0, message: "User is not logged in" };
  }

  // checking registration status
  // registrationStatus = true means user can access the signup page
  if (req.cookies.registrationStatus === "false") {
    result.registrationStatus = 0;
  } else if (req.cookies.registrationStatus === "true") {
    result.registrationStatus = 1;
  } else {
    result.registrationStatus = 1;
  }

  res.json(result);
}

async function registerInfoController(req, res) {
  log(req.cookies);
  const userId = req.cookies.userId;
  const userEmail = req.cookies.userEmail;

  var verification_token = randomstring.generate({
    length: 15,
  });

  const status = await updateUserInfo(req.body, userId, verification_token);
  if (status.status) {
    // send a verification email
    const result = await sendVerificationEmail(
      userEmail,
      `Verify your account`,
      `Please click on the link to verify yourself: ${process.env.SERVER_HOST}/verify/${verification_token}/${userId}`
    );
    if (result.status === 1) {
      clearCookies(res);
    }
    res.json(result);
  } else {
    res.json(status);
  }
}

async function verificationController(req, res) {
  const userId = req.params.userid;
  const token = req.params.token;
  // check if token matches the user
  const result = await verifyUser(userId, token);
  res.redirect(`${process.env.CLIENT_HOST}/sign-in`);
}

function loginSuccessController(req, res) {
  if (!req.user) {
    res.json(
      respond(
        -2,
        "User with the given credentials not found. Did you enter them correctly?"
      )
    );
  } else {
    if (req.user.verified) {
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
  req.logout();
  res.json(respond(1, "Successfully logged out. Redirecting..."));
}

function registrationStatusController(req, res) {
  const cookies = req.cookies;
  log(cookies);
  if (cookies.registrationStatus === "false") {
    res.json(respond("false", "Complete where you left of..."));
  } else {
    res.json(respond("true", "Something is wrong."));
  }
}

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
        `Please click on the link to reset your password: ${process.env.SERVER_HOST}/verify/reset-password/${verification_token}/${userId}`
      );
      res.json(result);
    } else {
      res.json(status);
    }
  }
}

async function resetPasswordController(req, res) {
  const userId = req.params.userid;
  const token = req.params.token;

  // check if token matches the user.
  // if it does, then redirect the user to reset password page
  const result = await verifyUser(userId, token);
  res.setHeader("resetPasswordStatus", "true");
  res.redirect(`${process.env.CLIENT_HOST}/reset-password`);
}

function log(msg) {
  console.log(msg);
}

export {
  registerController,
  authenticationController,
  registerInfoController,
  verificationController,
  loginSuccessController,
  loginFailureController,
  signOutController,
  registrationStatusController,
  resetPasswordController,
  forgotPasswordController,
};
