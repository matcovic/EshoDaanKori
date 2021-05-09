import Fundraiser from "../models/fundraiser.js";
import {
  createFundraiserSchema,
  saveFundraiser,
  saveImages,
} from "../util/dao.js";
import { respond } from "../util/util.js";

async function newCampaignController(req, res) {
  console.log("req received");
  //console.log(req.body);
  //console.log(req.user);
  if (!req.isAuthenticated()) {
    res.json({ status: -2, message: "You are unauthorized. Redirecting" });
    return;
  }

  const schema = createFundraiserSchema(req.body, req.user._id);
  console.log(schema._id);

  const result = await saveImages(
    req.body.coverPhoto,
    req.body.optionalPhotos,
    req.user._id.toString(),
    schema._id.toString()
  );

  schema.coverPhoto = result.coverPhotoUrl;
  schema.optionalPhotos = result.optionalPhotoUrls;

  if (result.status === 1) {
    console.log(schema);
    const result = await saveFundraiser(schema);
    res.json(result);
  } else {
    res.json(result);
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
    log(`${result.length} results found`);
    res.json({ status: 1, message: "results found", result });
  } catch (error) {
    res.json({ status: -1, message: error.message, result });
  }
}

function log(msg) {
  console.log(msg);
}
export { newCampaignController, getAllFundraiserController };
