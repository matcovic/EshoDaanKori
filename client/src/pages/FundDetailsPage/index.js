import React, { useEffect, useState } from "react";
import "./fundDetails.css";
import { Link } from "react-router-dom";
import CarouselComponent from "../../components/CarouselComponent";
import FundTags from "./components/FundTags";
import Story from "./components/Story";
import DonationStats from "./components/DonationStats";
import PaymentSideBar from "./components/PaymentSideBar";
import PaymentAccordion from "./components/PaymentAccordion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loading from "react-fullscreen-loading";
import { notify } from "../../util/util";
import { Helmet } from "react-helmet";
import { CopyToClipboard } from "react-copy-to-clipboard";

const FundDetailsPage = (props) => {
  const fundraiserId = props.match.params.fundraiserId;
  const [fundDetails, setFundDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [shareableLink, setShareableLink] = useState({
    value: `https://eshodaankori.netlify.app/fundraisers/view/${fundraiserId}`,
    copied: false,
  });

  useEffect(() => {
    // when the component loads up, send a req to the server
    const fetchContent = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/api/campaign/get-campaign-by-id`,
        {
          fundraiserId: fundraiserId,
        },
        { withCredentials: true }
      );
      if (data.status === 1) {
        const images = [data.result.coverPhoto, ...data.result.optionalPhotos];
        data.result.images = images;
        setFundDetails(data.result);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchContent();
  }, [fundraiserId]);

  if (loading) {
    return (
      <Loading loading={loading} background="#00AD7C" loaderColor="#B7FE81" />
    );
  }

  const onCopy = () => {
    setShareableLink((prevState) => ({
      ...prevState,
      copied: true,
    }));

    notify("Link copied! 🔗 Share it with your friends and family.", "info");
  };

  return (
    <section id="fund-details-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{fundDetails.title}</title>
      </Helmet>
      <div className="white-container">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Fund title */}
        <h2>{fundDetails.title}</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              {/* Carousel */}
              <CarouselComponent carouselImages={fundDetails.images} />

              {/* Fund posted time ago  */}
              <h3 className="post-time-text">
                {`Posted on: ${new Date(
                  fundDetails.createdAt
                ).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}`}
              </h3>

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
                {/*    <Link to="/#" className="btn btn-type1">
                  CONTACT
                </Link> */}
                <CopyToClipboard onCopy={onCopy} text={shareableLink.value}>
                  <button className="btn btn-type4">SHARE</button>
                </CopyToClipboard>
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
