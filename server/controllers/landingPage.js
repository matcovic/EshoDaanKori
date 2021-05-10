import LandingPage from "../models/landingPage.js";
import NewsLetter from "../models/newsletter.js";

const landingPageController = (req, res) => {
  console.log(req.cookies);

  console.log("preparing to fetch content from db");
  LandingPage.find().then((result) => {
    if (req.cookies.newsLetterShown === "shown") {
      console.log("inserting shown");
      res.json({result: result[0], newsLetterShown: "shown"});
    } else {
      res.cookie("newsLetterShown", "shown");
      res.json({result: result[0], newsLetterShown: "notShown"});

    }
  });
};

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
