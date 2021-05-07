import { cloudinary } from "../config/config.js";
import { respond } from "../util/util.js";

async function newCampaignController(req, res) {
  console.log("req received");
 // console.log(req.body.photos);
  console.log(req.file);
  console.log(req.files[0]);

  //console.log(req.user);
  if (!req.isAuthenticated()) {
    res.json({ status: -1, message: "You are unauthorized. Redirecting" });
    return;
  }
  // save campaign post in database
  const options = {
    folder: `user/${req.user._id}/fundraisers/`,
    public_id: req.user._id,
  };
  try {
  

    const result = await cloudinary.v2.uploader.upload(
      req.body.photos,
      options
    );

    console.log(result);
  } catch (error) {
    console.log("file upload error: " + error.message);
  }
}

function log(msg) {
  console.log(msg);
}
export { newCampaignController };
