import express from "express";
import {
  registerController,
  authenticationController,
  registerInfoController,
  verificationController,
  loginSuccessController,
  loginFailureController,
  signOutController,
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
authRouter.post("/register-info", registerInfoController);
authRouter.post("/sign-out", signOutController);
authRouter.get("/is-authenticated", authenticationController);
authRouter.get("/verify/:token/:userid", verificationController);
authRouter.get("/login-success", loginSuccessController);
authRouter.get("/login-failure", loginFailureController);

export default authRouter;
