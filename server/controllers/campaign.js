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

function log(msg) {
  console.log(msg);
}
export { newCampaignController };
