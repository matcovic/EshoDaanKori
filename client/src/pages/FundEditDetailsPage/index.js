import React, { useEffect, useState } from "react";
import "../FundDetailsPage/fundDetails.css";
import { Link, useHistory } from "react-router-dom";
import CarouselComponent from "../../components/CarouselComponent";
import FundTags from "../FundDetailsPage/components/FundTags";
import Story from "../FundDetailsPage/components/Story";
import EditDonationStats from "./components/EditDonationStats";
import EditPaymentSideBar from "./components/EditPaymentSideBar";
import EditPaymentAccordion from "./components/EditPaymentAccordion";
import { Header, Input, Modal } from "semantic-ui-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "react-fullscreen-loading";
import { notify } from "../../util/util";
import { Helmet } from "react-helmet";


const FundEditDetailsPage = (props) => {
  const fundraiserId = props.location.state.id;
  const [open, setOpen] = React.useState(false);
  const [fundDetails, setFundDetails] = useState();
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    // when the component loads up, send a req to the server
    const fetchContent = async () => {
      const { data } = await axios.post("/api/campaign/get-campaign-by-id", {
        fundraiserId: fundraiserId,
      });
      if (data.status === 1) {
        console.log(data);
        const images = [data.result.coverPhoto, ...data.result.optionalPhotos];
        data.result.images = images;
        setFundDetails(data.result);
        setLoading(false);
        console.log("result returned ");
      } else {
        console.log("coudlnt get result");
        console.log(data.message);
        setLoading(false);
      }
    };
    fetchContent();
  }, [fundraiserId]);

  function onDeleteConfirmClick(e) {
    e.preventDefault();

    const deleteFundraiser = async () => {
      const { data } = await axios.post("/api/campaign/delete-campaign", {
        fundraiserId: fundraiserId,
      });
      if (data.status === 1) {
        console.log(data);
        notify(data.message, "success", "/");
        setOpen(false);
        console.log("deleted success");
      } else {
        console.log("couldn't delete fundraiser");
        notify(data.message, "error");
        setOpen(false);
      }
    };

    deleteFundraiser();
  }

  if (loading) {
    return (
      <Loading loading={loading} background="#00AD7C" loaderColor="#B7FE81" />
    );
  }

  return (
    <section id="fund-details-section">
    <Helmet>
        <meta charSet="utf-8" />
        <title>Fundraiser Edit</title>
      </Helmet>

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
      <div className="white-container edit-fund-details">
        {/* Fund title */}
        <h2>{fundDetails.title}</h2>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              {/* Carousel */}
              <CarouselComponent carouselImages={fundDetails.images} />

              {/* Fund posted time ago  */}
              <h3 className="post-time-text">
                {new Date(fundDetails.createdAt).toUTCString()}
              </h3>

              {/* tags and labels */}
              <FundTags tags={fundDetails} />

              {/* donation stats */}
              <EditDonationStats fundDetails={fundDetails} />

              {/* payment accordion  */}
              <EditPaymentAccordion fundDetails={fundDetails} />

              {/* story  */}
              <Story story={fundDetails.story} />

              {/* contact & share button  */}
              <div className="fund-btn-group">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    history.push({
                      pathname: `/fundraisers/edit/${fundDetails._id}`,
                      state: { props: fundDetails, status: 2 },
                    });
                  }}
                  className="btn btn-type1"
                >
                  EDIT POST
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                  className="btn btn-type1 delete-btn"
                >
                  DELETE POST
                </button>
              </div>
            </div>

            <div className="col-lg-4">
              {/* payment sidebar  */}
              <EditPaymentSideBar fundDetails={fundDetails} />
            </div>
          </div>
        </div>
      </div>
      <Modal
        id="modal-section"
        onOpen={() => setOpen(true)}
        open={open}
        onClose={() => {
          console.log("MODAL CLOSED");
          setOpen(false);
        }}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>ARE YOU SURE</Header>
            <p>
              This action is not irreversible. Make sure you are absolutely
              sure. Enter DELETE in the box below and press confirm to delete
              the fundraiser
            </p>
            {/* <Input placeholder="Enter DELETE here" className="input-length" /> */}
          </Modal.Description>
          <button
            onClick={onDeleteConfirmClick}
            className="btn btn-type1 modal-btn red-btn"
          >
            CONFIRM
          </button>
        </Modal.Content>
      </Modal>
    </section>
  );
};

export default FundEditDetailsPage;
