import React, { useEffect, useState } from "react";
import "./fundDetails.css";
import { Link } from "react-router-dom";
import CarouselComponent from "../../components/CarouselComponent";
import FundTags from "./components/FundTags";
import Story from "./components/Story";
import DonationStats from "./components/DonationStats";
import PaymentSideBar from "./components/PaymentSideBar";
import PaymentAccordion from "./components/PaymentAccordion";

const FundDetailsPage = () => {
  // const [fundDetails, setFundDetails] = useState({});
  const fundDetails = {
    _id: {
      $oid: "60980faf4014412e2add453f",
    },
    fundraisedTotal: {
      $numberInt: "0",
    },
    paymentOptions: [
      {
        number: "01966184895",
        icon: "Bkash",
      },
      {
        number: "01303105504",
        icon: "Nagad",
      },
    ],
    optionalPhotos: [
      "https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png",
      "https://c4.wallpaperflare.com/wallpaper/787/854/424/jujutsu-kaisen-satoru-gojo-anime-boys-anime-girls-hd-wallpaper-preview.jpg",
    ],
    uid: "6095282fa336743dd85e13b0",
    title: "Helping The Juneau Family",
    story:
      "Hi everyone! I was able to see Erika and Aaron this past weekend (distanced of course!) and they asked me to post this on their behalf.\n\n“Aaron and I wanted to take a moment to thank everyone for the generous donations. Your gift has helped us to hire a full time helper for the kids while I have had to return to work. We also hired someone to help us get the house ready to list, what a huge help that was! We can’t thank you enough for your generous gifts. We are beyond grateful and touched.”",
    location: "Greely, ON",
    fundraisingGoal: {
      $numberInt: "15000",
    },
    fundraisingFor: "Yourself",
    category: "Medical",
    coverPhoto:
      "https://res.cloudinary.com/pixieum-studios/image/upload/v1620568740/user/6095282fa336743dd85e13b0/fundraisers/6097ea83a8016622208bfcb8/coverPhoto/bmjyqhbg2latywixuzwo.jpg",
    createdAt: {
      $date: {
        $numberLong: "1620568711786",
      },
    },
    updatedAt: {
      $date: {
        $numberLong: "1620575809879",
      },
    },
    __v: {
      $numberInt: "0",
    },
  };
  const images = [fundDetails.coverPhoto, ...fundDetails.optionalPhotos];
  fundDetails.images = images;

  //Fetching data from JSON or API
  // useEffect(() => {
  //   fetch("./fund_details.json")
  //     .then((response) => response.json())
  //     .then((json) => setFundDetails(json[0]));
  // }, []);

  // console.log(fundDetails);
  // console.log("TITLE IS:  " + fundDetails.title);

  return (
    <section id="fund-details-section">
      <div className="white-container">
        {/* Fund title */}
        <h2>{fundDetails.title}</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              {/* Carousel */}
              <CarouselComponent carouselImages={fundDetails.images} />

              {/* Fund posted time ago  */}
              <h3 className="post-time-text">Posted 4 days ago</h3>

              {/* tags and labels */}
              <FundTags tags={fundDetails} />

              {/* donation stats */}
              <DonationStats fundDetails={fundDetails} />

              {/* payment accordion  */}
              <PaymentAccordion payments={fundDetails.paymentOptions} />

              {/* story  */}
              <Story story={fundDetails.story} />

              {/* contact & share button  */}
              <div className="fund-btn-group">
                <Link to="/#" className="btn btn-type1">
                  CONTACT
                </Link>
                <Link to="/#" className="btn btn-type4">
                  SHARE
                </Link>
              </div>
            </div>

            <div className="col-lg-4">
              {/* payment sidebar  */}
              <PaymentSideBar payments={fundDetails.paymentOptions} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundDetailsPage;
