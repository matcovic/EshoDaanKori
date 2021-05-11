import React from "react";
import { calculateFundraisingProgress } from "../../../util/util";

const DonationStats = ({ fundDetails }) => {
  const progressLength = calculateFundraisingProgress( 
    fundDetails.fundraisedTotal,
    fundDetails.fundraisingGoal
  );
  return (
    <div className="donation-statistics">
      <div className="row">
        <div className="col-sm-6 amount-box">
          <h3>DONATION RECEIVED:</h3>
          <h3 className="amount-text">{`৳${fundDetails.fundraisedTotal}`}</h3>
        </div>
        <div className="col-sm-6 amount-box amount-goal-box">
          <h3>GOAL:</h3>
          <h3 className="amount-text">{`৳${fundDetails.fundraisingGoal}`}</h3>
        </div>
      </div>
      {/* progress in percentage */}
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progressLength}`, backgroundColor: "#00AD7C" }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

export default DonationStats;
