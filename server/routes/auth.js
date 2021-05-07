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

const authRouter = express.Router();

authRouter.post("/register-user", registerController);

authRouter.post(
  "/login-email",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login-failure",
    successRedirect: "/api/auth/login-success",
  })
);
authRouter.get("/is-authenticated", authenticationController);
authRouter.post("/sign-out", signOutController);
authRouter.get("/login-success", loginSuccessController);
authRouter.get("/login-failure", loginFailureController);
authRouter.post("/reset-password-link", forgotPasswordController);
authRouter.post("/reset-password", resetPasswordController);

/**@path verify/ */
authRouter.get("/:token/:userid", verificationController);

export default authRouter;
