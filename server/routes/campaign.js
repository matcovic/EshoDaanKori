import express from "express";
import {
  newCampaignController,
  getAllFundraiserController,
  getMyFundraiserController,
  editCampaignController,
} from "../controllers/campaign.js";
import { testController } from "../controllers/test.js";

const campaignRouter = express.Router();

// -todo: change it to post
campaignRouter.post("/new-campaign", newCampaignController);
campaignRouter.post("/get-campaigns", getAllFundraiserController);
campaignRouter.post("/get-my-campaigns", getMyFundraiserController);
campaignRouter.post("/edit-campaign", editCampaignController);

export { campaignRouter };
