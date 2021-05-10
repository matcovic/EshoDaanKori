import express from "express";
import {
  newCampaignController,
  getAllFundraiserController,
  getMyFundraiserController,
  editCampaignController,
  getCampaignByIdController,
  deleteCampaignController,
  updatePaymentOptionsController,
  updateDonationController,
} from "../controllers/campaign.js";
import { testController } from "../controllers/test.js";

const campaignRouter = express.Router();

// -todo: change it to post
campaignRouter.post("/new-campaign", newCampaignController);
campaignRouter.post("/get-campaigns", getAllFundraiserController);
campaignRouter.post("/get-my-campaigns", getMyFundraiserController);
campaignRouter.post("/edit-campaign", editCampaignController);
campaignRouter.post("/get-campaign-by-id", getCampaignByIdController);
campaignRouter.post("/delete-campaign", deleteCampaignController);
campaignRouter.post("/update-payment-options", updatePaymentOptionsController);
campaignRouter.post("/update-donation-received", updateDonationController);

export { campaignRouter };
