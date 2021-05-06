import express from "express";
import {
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
} from "../controllers/auth.js";
import { passport } from "../config/config.js";

const authRouter = express.Router();

authRouter.post("/register-email", registerController);
authRouter.post(
  "/login-email",
  passport.authenticate("local", {
    failureRedirect: "/api/auth/login-failure",
    successRedirect: "/api/auth/login-success",
  })
);
authRouter.get("/is-authenticated", authenticationController);
authRouter.post("/register-info", registerInfoController);
authRouter.post("/sign-out", signOutController);
authRouter.get("/login-success", loginSuccessController);
authRouter.get("/login-failure", loginFailureController);
authRouter.get("/registration-status", registrationStatusController);
authRouter.post("/reset-password", forgotPasswordController);

/**@path verify/ */
authRouter.get("/:token/:userid", verificationController);
authRouter.get("/reset-password/:token/:userid", resetPasswordController);

export default authRouter;
