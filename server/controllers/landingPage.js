import LandingPage from "../models/landingPage.js";

const landingPageController = (req, res) => {
    console.log(req.cookies)
    console.log("preparing to fetch content from db");
    LandingPage.find().then(result => {
        res.json(result[0])
    })
};

export { landingPageController };
