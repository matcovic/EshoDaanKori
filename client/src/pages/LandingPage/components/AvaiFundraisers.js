import React from "react";
import FundCardView from "../../../components/FundCardView";
import { Link, useHistory } from "react-router-dom";
import { calculateFundraisingProgress } from "../../../util/util";

function AvailFundraisers({ fundraisers }) {
  const history = useHistory();

  //function for mapping top-funds
  function availFunds(availFundsBox) {
    function onCardClick(event) {
      event.preventDefault();
      const fundraiserId = event.currentTarget.id;
      history.push({
        pathname: `/fundraisers/view/${fundraiserId}`,
      });
    }

    return (
      <div
        className="col-lg-4 col-6"
        key={availFundsBox._id}
        id={availFundsBox._id}
        onClick={onCardClick}
      >
        <FundCardView
          imgURL={availFundsBox.coverPhoto}
          title={availFundsBox.title}
          desc={availFundsBox.story.substring(0, 70) + "..."}
          currentProgress={calculateFundraisingProgress(
            availFundsBox.fundraisedTotal,
            availFundsBox.fundraisingGoal
          )}
          currentAmountRaised={availFundsBox.fundraisedTotal}
          fundraisingGoal={availFundsBox.fundraisingGoal}
        />
      </div>
    );
  }

  if (fundraisers.length !== 0) {
    return (
      <section id="available-funds-section">
        <h2>AVAILABLE FUNDRAISERS</h2>
        <div className="container">
          <div className="row row-flex">{fundraisers.map(availFunds)}</div>
        </div>
        <Link className="below-right-text" to="/discover">
          SEE MORE {`>`}
        </Link>
      </section>
    );
  } else {
    return <div></div>;
  }
}

export default AvailFundraisers;
