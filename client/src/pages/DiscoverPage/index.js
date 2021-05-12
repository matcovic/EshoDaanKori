import React, { useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent.js";
import "../DiscoverPage/discoverPage.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "react-fullscreen-loading";
import NoContentImage from "../../assets/images/NoContentImage.svg";
import { getCategoryList } from "../../util/util";
import { Helmet } from "react-helmet";

const DiscoverPage = (props) => {
  var selectedCategory = props.match.params.category;
  selectedCategory = selectedCategory ? selectedCategory : "All";
  const [fundCardItems, setFundCardItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryList = getCategoryList();

  useEffect(() => {
    // when the component loads up, send a req to the server
    const fetchContent = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_DOMAIN}/api/campaign/get-campaigns`,
        {
          selectedCategory,
        },
        { withCredentials: true }
      );
      if (data.status === 1) {
        console.log(data);
        setFundCardItems(data.result);
        setLoading(false);
        console.log("result returned after category press: ");
        console.log(data.result.length);
      } else {
        console.log("sucerdddd");
        console.log(data);
        setLoading(false);
      }
    };
    fetchContent();
  }, [selectedCategory]);

  return (
    <section id="discover-section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Discover</title>
      </Helmet>
      {loading ? (
        <Loading loading={true} background="#00AD7C" loaderColor="#B7FE81" />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-2 col-sm-12">
              <div className="query-box white-container">
                <div className="categorical-box">
                  <h4>CATEGORIES</h4>
                  <ul>
                    {categoryList.map((category) => {
                      const link = `/category/${category}`;
                      return (
                        <li>
                          <Link className="" to={link}>
                            {category}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/*Categorical accordion */}
              <div
                className="accordion query-box categorical-box-accordion"
                id="accordionExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed query-box-accordion-btn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                      style={{ margin: "0" }}
                    >
                      CATEGORIES
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul>
                        {categoryList.map((category) => {
                          const link = `/category/${category}`;
                          return (
                            <li>
                              <Link className="" to={link}>
                                {category}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
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
                  <div className="discover-no-content-found">
                    <img alt="no fundraisers" src={NoContentImage}></img>
                    <h1>NO FUNDRAISERS FOUND</h1>
                    <p>
                      No fundraiser posts available at the moment! Try switching
                      between the categories to see if you can find one.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DiscoverPage;
