import React from "react";
import icoCategory from "../../../assets/icons/ico-category.svg";
import icoFundFor from "../../../assets/icons/ico-fund-for.svg";
import icoLocation from "../../../assets/icons/ico-location.svg";
import icoUnverified from "../../../assets/icons/ico-unverified.svg";
import icoVerified from "../../../assets/icons/ico-verified.svg";

const FundTags = ({ tags }) => {
  return (
    <div className="row fund-tags-container">
      <ul>
        {/* fundraising For */}
        <li>
          <div className="fund-tags">
            <img src={icoFundFor} alt="..." />
            <h4>{tags.fundraisingFor}</h4>
          </div>
        </li>
        {/* category */}
        <li>
          <div className="fund-tags">
            <img src={icoCategory} alt="..." />
            <h4>{tags.category}</h4>
          </div>
        </li>
        {/* location  */}
        <li>
          <div className="fund-tags">
            <img src={icoLocation} alt="..." />
            <h4>{tags.location}</h4>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default FundTags;
