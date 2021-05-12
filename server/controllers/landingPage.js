import Fundraiser from "../models/fundraiser.js";
import LandingPage from "../models/landingPage.js";
import NewsLetter from "../models/newsletter.js";

async function landingPageController(req, res) {
  console.log(req.cookies);
  console.log("preparing to fetch landing page content...");
  try {
    const result = await LandingPage.find();
    // fetch 3 fundraisers from db
    const fundraisers = await Fundraiser.find().limit(3);
    if (req.cookies.newsLetterShown === "shown") {
      console.log("inserting shown");
      res.json({
        status: 1,
        message: "Success.",
        result: { result: result[0], fundraisers: fundraisers },
        newsLetterShown: "shown",
      });
    } else {
      res.cookie("newsLetterShown", "shown", {
        sameSite: "none",
        secure: true,
      });
      res.json({
        status: 1,
        message: "Success.",
        result: { result: result[0], fundraisers: fundraisers },
        newsLetterShown: "notShown",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.json({
      status: -1,
      message: "Failed to retrieved data.",
      result: result[0],
      newsLetterShown: "notShown",
    });
  }
}

const newsletterSubscribeController = async (req, res) => {
  const query = { _id: "41224d776a326fb40f000001" };
  const update = { $push: { emails: req.body.email } };
  const options = {
    upsert: true,
  };

  try {
    await NewsLetter.updateOne(query, update, options);
    res.json({ status: 1, message: "Subscribed to newsletter successfully!" });
    console.log("updated");
  } catch (err) {
    console.log(err.message);
    res.json({
      status: -1,
      message: `Couldn't subscribe to email. ${err.message}`,
    });
  }
};
export { landingPageController, newsletterSubscribeController };
