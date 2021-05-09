import React from "react";
import PaginationComponent from "../MyFundRaisersPage/components/PaginationComponent";
import "../DiscoverPage/discoverPage.css";
import axios from "axios";
import { Redirect } from "react-router";

const MyFundRaisersPage = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section id="discover-section">
      <div className="container-fluid">
        <div className="row">
          <div className="list-of-funds white-container">
            <h2>MY FUNDRAISERS</h2>
            <div className="divider-custom" style={{ paddingTop: "0" }}>
              <div className="divider-custom-line"></div>
            </div>
            <PaginationComponent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyFundRaisersPage;
