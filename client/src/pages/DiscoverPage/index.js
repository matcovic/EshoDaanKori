import React from "react";
import PaginationComponent from "./PaginationComponent";
import "../DiscoverPage/discoverPage.css";
import axios from "axios";
import { Redirect } from "react-router";

const DiscoverPage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  
  return (
    <section id="discover-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-2 col-sm-12">
            <div className="query-box white-container">
              <div className="categorical-box">
                <h4>CATEGORIES</h4>
                <ul>
                  <li>
                    <a className="" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="" href="#">
                      Medical
                    </a>
                  </li>
                  <li>
                    <a className="" href="#">
                      Tuition
                    </a>
                  </li>
                  <li>
                    <a className="" href="#">
                      Emergency
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-10 col-sm-12">
            <div className="list-of-funds white-container">
              <p>Showing category "All"</p>
              <div className="divider-custom">
                <div className="divider-custom-line"></div>
              </div>
              <PaginationComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverPage;
