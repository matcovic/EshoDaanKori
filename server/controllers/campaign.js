import Fundraiser from "../models/fundraiser.js";
import {
  createFundraiserSchema,
  saveFundraiser,
  saveImages,
  saveMultipleImages,
} from "../util/dao.js";
import { respond } from "../util/util.js";
import date from "date-and-time";

async function newCampaignController(req, res) {
  if (!req.isAuthenticated()) {
    res.json({ status: -2, message: "You are unauthorized. Redirecting" });
    return;
  }
  const schema = createFundraiserSchema(req.body, req.user._id);
  const result = await saveImages(
    req.body.coverPhoto,
    req.body.optionalPhotos,
    req.user._id.toString(),
    schema._id.toString()
  );

  schema.coverPhoto = result.coverPhotoUrl;
  schema.optionalPhotos = result.optionalPhotoUrls;

  if (result.status === 1) {
    //console.log(schema);
    console.log("Saved to database.");
    const result = saveFundraiser(schema);
    res.json({
      status: 1,
      message: "Created a new campaign. Redirecting...",
      result: schema._id.toString(),
    });
  } else {
    res.json({
      status: -1,
      message:
        "Coudn't create a campaign at this moment. Please try again. Redirecting...",
    });
  }
}

/**
 * Returns fundraisers available wrt the category provided
 * @param {*} req
 * @param {*} res
 */
async function getAllFundraiserController(req, res) {
  console.log(req.body.selectedCategory);
  try {
    var result;
    if (req.body.selectedCategory === "All") {
      result = await Fundraiser.find();
    } else {
      result = await Fundraiser.find({
        category: req.body.selectedCategory,
      });
    }
    res.json({ status: 1, message: "results found", result });
  } catch (error) {
    res.json({ status: -1, message: error.message, result });
  }
}

async function getMyFundraiserController(req, res) {
  if (!req.isAuthenticated()) {
    res.json({
      status: -2,
      message: "User is not authenticated. Redirecting...",
    });
    return;
  }
  try {
    const result = await Fundraiser.find({
      uid: req.user._id,
    });
    log(`${result.length} results found`);
    res.json({ status: 1, message: "results found", result });
  } catch (error) {
    res.json({ status: -1, message: error.message, result });
  }
}

async function editCampaignController(req, res) {
  console.log(`fundraiserId: ${req.body._id}`);
  const fundraiserId = req.body._id;
  delete req.body["_id"];
  console.log(typeof req.body.title);

  console.log(fundraiserId);

  if (req.isAuthenticated()) {
    try {
      req.body.optionalPhotos = await saveMultipleImages(
        req.body.optionalPhotos,
        req.user._id,
        req.body._id
      );

      var newList = [];
      if (!req.body.optionalPhotos) {
        console.log("no new optional images selected");
        delete req.body["optionalPhotos"];
        newList = req.body.previousOptionalImages;
      } else {
        newList = [
          ...req.body.previousOptionalImages,
          ...req.body.optionalPhotos,
        ];
      }

      req.body.optionalPhotos = newList.length ? newList : undefined;

      //console.log(req.body.optionalPhotos);
      const filter = { _id: fundraiserId };
      const result = await Fundraiser.findOneAndUpdate(filter, req.body, {
        new: true,
      });
      console.log("result saved. Returning previous: ");
      console.log(result);
      res.json({ status: 1, message: "Updated successfully." });
    } catch (error) {
      res.json({ status: -1, message: error.message });
    }
  } else {
    res.json({ status: -1, message: "Unauthorized access. Redirecting..." });
  }
}

async function getCampaignByIdController(req, res) {
  console.log(req.body.fundraiserId);
  try {
    const result = await Fundraiser.findById({
      _id: req.body.fundraiserId,
    });
    console.log("result found: ");
    console.log(result);
    res.json({ status: 1, message: "results found", result });
  } catch (error) {
    console.log(error.message);
    res.json({ status: -1, message: error.message });
  }
}

async function deleteCampaignController(req, res) {
  try {
    const result = await Fundraiser.findByIdAndDelete({
      _id: req.body.fundraiserId,
    });
    console.log("deleted successfully!");
    res.json({ status: 1, message: "Deleted fundraiser successfully!" });
  } catch (error) {
    res.json({
      status: -1,
      message:
        "Couldn't delete the fundraiser at the moment. Please try again later",
    });
    console.log(error.message);
  }
}

async function updatePaymentOptionsController(req, res) {
  console.log("update payment options: ");
  console.log(req.body);
  try {
    const filter = { _id: req.body._id };
    const result = await Fundraiser.findOneAndUpdate(
      filter,
      { paymentOptions: req.body.paymentOptions },
      { new: true }
    );
    console.log("new result: ");
    console.log(result);
    res.json({ status: 1, message: "Payment options updated successfully." });
  } catch (e) {
    res.json({ status: -1, message: e.message });
  }
}

async function updateDonationController(req, res) {
  try {
    const filter = { _id: req.body._id };
    const result = await Fundraiser.findOneAndUpdate(
      filter,
      { fundraisedTotal: req.body.donation },
      { new: true }
    );
    console.log("new result: ");
    console.log(result);
    res.json({ status: 1, message: "Updated donations successfully." });
  } catch (e) {
    res.json({ status: -1, message: e.message });
  }
}

function log(msg) {
  console.log(msg);
}
export {
  newCampaignController,
  getAllFundraiserController,
  getMyFundraiserController,
  editCampaignController,
  getCampaignByIdController,
  deleteCampaignController,
  updatePaymentOptionsController,
  updateDonationController,
};
