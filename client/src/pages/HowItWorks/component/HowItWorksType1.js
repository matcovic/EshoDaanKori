import React from "react";

const HowItWorksType1 = (props) => {
  return (
    <div className="col-lg-6 col-sm-12">
      <div className="vertical-line"></div>
      <div className="step-box">
        <p>{props.desctiption}</p>
      </div>
    </div>
  );
};

export default HowItWorksType1;
