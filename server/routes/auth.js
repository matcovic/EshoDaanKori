import express from "express";
import { registerController, authenticationController } from "../controllers/auth.js";
import passport from "../config/passport-config.js";

const router = express.Router();

router.post("/register-email", registerController);
router.post(
  "/login-email",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);

router.get("/is-authenticated", authenticationController);

export default router;