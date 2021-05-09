import React, { useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent";
import "../DiscoverPage/discoverPage.css";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const DiscoverPage = (props) => {
  var selectedCategory = props.match.params.category;
  selectedCategory = selectedCategory ? selectedCategory : "All";
  const [fundCardItems, setFundCardItems] = useState([]);

  useEffect(() => {
    // when the component loads up, send a req to the server
    const fetchContent = async () => {
      const { data } = await axios.post("/api/campaign/get-campaigns", {
        selectedCategory,
      });
      if (data.status === 1) {
        console.log(data);
        setFundCardItems(data.result);
        console.log("result returned after category press: ");
        console.log(data.result.length);
      } else {
        console.log(data);
      }
    };
    fetchContent();
  }, [selectedCategory]);

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
                    <Link className="" to="/category/All">
                      All
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/category/Medical">
                      Medical
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/category/Tuition">
                      Tuition
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/category/Entertainment">
                      Entertainment
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-10 col-sm-12">
            <div className="list-of-funds white-container">
              <p>Showing category "{selectedCategory}"</p>
              <div className="divider-custom">
                <div className="divider-custom-line"></div>
              </div>

              {fundCardItems.length ? (
                <PaginationComponent fundCardItems={fundCardItems} />
              ) : (
                <h1>No content found</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverPage;
