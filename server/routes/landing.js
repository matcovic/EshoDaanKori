import express from "express";
import {
  landingPageController,
  newsletterSubscribeController,
} from "../controllers/landingPage.js";

const router = express.Router();

router.get("/landing", landingPageController);
router.post("/newsletter/subscribe", newsletterSubscribeController);

export default router;
