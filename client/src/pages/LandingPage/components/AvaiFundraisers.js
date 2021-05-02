import React from "react";
import fund_card from "../../../components/FundCardView/fundCard";
import FundCardView from "../../../components/FundCardView";

//function for mapping top-funds
function topFunds(topFundsBox) {
  return (
    <div className="col-lg-4 col-6" key={topFundsBox.id}>
      <FundCardView
        imgURL={topFundsBox.imgURL}
        title={topFundsBox.title}
        desc={topFundsBox.desc}
        currentProgress={topFundsBox.currentProgress}
        currentAmountRaised={topFundsBox.currentAmountRaised}
      />
    </div>
  );
}

function AvailFundraisers(props) {
  return (
    <section id="top-funds-section">
      <h2>AVAILABLE FUNDRAISERS</h2>
      <div className="container">
        <div className="row row-flex">{fund_card.map(topFunds)}</div>
      </div>
      <a className="below-right-text" href="#">
        SEE MORE {`>`}
      </a>
    </section>
  );
}

export default AvailFundraisers;
