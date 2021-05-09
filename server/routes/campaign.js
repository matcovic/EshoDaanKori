import express from "express";
import {
  newCampaignController,
  getAllFundraiserController,
  getMyFundraiserController,
} from "../controllers/campaign.js";
import { testController } from "../controllers/test.js";

const campaignRouter = express.Router();

// -todo: change it to post
campaignRouter.post("/new-campaign", newCampaignController);
campaignRouter.post("/get-campaigns", getAllFundraiserController);
campaignRouter.post("/get-my-campaigns", getMyFundraiserController);

export { campaignRouter };
