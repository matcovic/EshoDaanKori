import React, { useEffect, useState } from "react";
import PaginationComponent from "../MyFundRaisersPage/components/PaginationComponent";
import "../DiscoverPage/discoverPage.css";
import axios from "axios";
import { Redirect } from "react-router";
import Loading from "react-fullscreen-loading";

const MyFundRaisersPage = (props) => {
  console.log(props);

  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // when the component loads up, send a req to the server
    const fetchContent = async () => {
      const { data } = await axios.post("/api/campaign/get-my-campaigns");
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

  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    return <Redirect to="/access-denied" />;
  }

  return (
    <section id="discover-section">
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
              <PaginationComponent fundraisers={fundraisers} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyFundRaisersPage;
