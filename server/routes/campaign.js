import express from "express";
import { newCampaignController } from "../controllers/campaign.js";
import { testController } from "../controllers/test.js";

const campaignRouter = express.Router();

// -todo: change it to post
campaignRouter.post("/new-campaign", newCampaignController);

export { campaignRouter };
