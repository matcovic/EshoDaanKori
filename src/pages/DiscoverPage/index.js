import React from "react";
import PaginationComponent from "./PaginationComponent";
import "../DiscoverPage/discoverPage.css";

const DiscoverPage = () => {
  return (
    <section id="discover-section">
      <div className="list-of-funds">
        <p>Showing category "All"</p>
        <div className="divider-custom">
          <div className="divider-custom-line"></div>
        </div>
        <PaginationComponent />
      </div>
    </section>
  );
};

export default DiscoverPage;
