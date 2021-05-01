import express from "express";
import { landingPageController } from "../controllers/landingPage.js";

const router = express.Router();

router.get("/landing", landingPageController);

export default router;
