import express from "express";

const landingPageRouter = express.Router();

landingPageRouter.get("/landing-page", (req, res) => {
    console.log("inside landing page")
});


export default landingPageRouter