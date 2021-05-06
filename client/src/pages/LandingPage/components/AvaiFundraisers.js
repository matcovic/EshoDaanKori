import React from "react";
import fund_card from "../../../components/FundCardView/fundCard";
import FundCardView from "../../../components/FundCardView";
import { Link } from "react-router-dom";

//function for mapping top-funds
function availFunds(availFundsBox) {
  return (
    <div className="col-lg-4 col-6" key={availFundsBox.id}>
      <FundCardView
        imgURL={availFundsBox.imgURL}
        title={availFundsBox.title}
        desc={availFundsBox.desc}
        currentProgress={availFundsBox.currentProgress}
        currentAmountRaised={availFundsBox.currentAmountRaised}
      />
    </div>
  );
}

function AvailFundraisers(props) {
  return (
    <section id="available-funds-section">
      <h2>AVAILABLE FUNDRAISERS</h2>
      <div className="container">
        <div className="row row-flex">{fund_card.map(availFunds)}</div>
      </div>
      <Link className="below-right-text" to="/discover">
        SEE MORE {`>`}
      </Link>
    </section>
  );
}

export default AvailFundraisers;
