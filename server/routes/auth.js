import express from "express";
import {
  registerController,
  authenticationController,
  verificationController,
  loginSuccessController,
  loginFailureController,
  signOutController,
  resetPasswordController,
  forgotPasswordController,
} from "../controllers/auth.js";
import { passport } from "../config/config.js";
import { respond } from "../util/util.js";

const authRouter = express.Router();

authRouter.post("/register-user", registerController);

authRouter.post("/login-email", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    console.log(user);
    if (err) {
      console.log(err);
      res.json(respond(-1, "Email not verified!"));
    } else {
      // user not found
      if (!user) {
        res.json(
          respond(
            -2,
            "User with the given credentials not found. Did you enter them correctly?"
          )
        );
      } else {
        console.log("logged in success.");
        // user logged in success
        const options = {
          sameSite: "none",
          secure: true,
          maxAge: 172800000,
        };
        res.cookie("session", "active", options);
        res.cookie("sessionID", user._id, options);

        res.json(respond(1, "Logged in!"));
      }
    }
  })(req, res, next);
});

/* authRouter.post(
  "/login-email",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login-failure",
    successRedirect: "/api/auth/login-success",
  })
); */
authRouter.get("/is-authenticated", authenticationController);
authRouter.post("/sign-out", signOutController);
authRouter.get("/login-success", loginSuccessController);
authRouter.get("/login-failure", loginFailureController);
authRouter.post("/reset-password-link", forgotPasswordController);
authRouter.post("/reset-password", resetPasswordController);

/**@path verify/ */
authRouter.get("/:token/:userid", verificationController);

export default authRouter;
