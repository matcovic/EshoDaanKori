import {
  isUserAvailable,
  createNewUser,
  updateUserInfo,
  verifyUser,
} from "../util/dao.js";
import randomstring from "randomstring";
import { respond, sendVerificationEmail } from "../util/util.js";

async function registerController(req, res, next) {
  log("req received: ");
  log(req.body);
  const a = await isUserAvailable(req.body.username);
  if (!a) {
    log("creating new user");
    const user = await createNewUser(req.body);
    res.cookie("userId", user._id.toString());
    res.cookie("userEmail", user.username);

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
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.isAuthenticated()) {
    log("user logged in! Authenticated");
    res.json(respond(1, "User is logged in already"));
  } else {
    log("user not logged in! NOT Authenticated");
    res.json(respond(-1, "User not logged in"));
  }
}

async function registerInfoController(req, res) {
  log(req.cookies);
  const userId = req.cookies.userId;
  const userEmail = req.cookies.userEmail;

  var verification_token = randomstring.generate({
    length: 64,
  });

  const status = await updateUserInfo(req.body, userId, verification_token);
  if (status.status) {
    // send a verification email
    const result = await sendVerificationEmail(
      userEmail,
      userId,
      verification_token
    );
    res.json(
      respond(1, "A verification email has been sent. Please check your email.")
    );
  } else {
    res.json(
      respond(-1, "Information couldn't be updated at the moment. Try again!")
    );
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
  res.json(respond(-1, "Login failed. Incorrect credentials."));
}

function signOutController(req, res) {
  req.logout();
  res.json(respond(1, "Successfully logged out. Redirecting..."));
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
};
