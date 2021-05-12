import React, { useEffect, useState } from "react";
import PaginationComponent from "../MyFundRaisersPage/components/PaginationComponent";
import "../DiscoverPage/discoverPage.css";
import axios from "axios";
import { Redirect } from "react-router";
import Loading from "react-fullscreen-loading";
import { Input, Modal, Header } from "semantic-ui-react";
import NoContentImage from "../../assets/images/NoContentImage.svg";
import { Helmet } from "react-helmet";

const MyFundRaisersPage = ({ isAuthenticated }) => {
  // console.log(props);

  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    // when the component loads up, send a req to the server
    const fetchContent = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/api/campaign/get-my-campaigns`,
        "",
        { withCredentials: true }
      );
      if (data.status === 1) {
        console.log(data);
        setFundraisers(data.result);
        setLoading(false);
        console.log("result returned after category press: ");
        console.log(data.result.length);
      } else {
        setLoading(false);
        console.log(data);
      }
    };
    fetchContent();
  }, []);

  if (!isAuthenticated) {
    console.log("unauthorized. Redirecting to signing page...");
    return <Redirect to="/" />;
  }

  return (
    <section id="discover-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Fundraisers</title>
      </Helmet>
      {loading ? (
        <Loading loading={true} background="#00AD7C" loaderColor="#B7FE81" />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="list-of-funds white-container">
              <h2>MY FUNDRAISERS</h2>
              <div className="divider-custom" style={{ paddingTop: "0" }}>
                <div className="divider-custom-line"></div>
              </div>
              {fundraisers.length ? (
                <PaginationComponent fundraisers={fundraisers} />
              ) : (
                <div className="discover-no-content-found">
                  <img src={NoContentImage} alt="..." />
                  <h1>NO FUNDRAISERS FOUND</h1>
                  <p>You have no fundraisers availabel at this moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
            {/* <p>Is it okay to use this photo?</p> */}
            <Input placeholder="Enter DELETE here" className="input-length" />
          </Modal.Description>
          <button className="btn btn-type1 modal-btn red-btn">CONFIRM</button>
        </Modal.Content>
      </Modal>
    </section>
  );
};

export default MyFundRaisersPage;
