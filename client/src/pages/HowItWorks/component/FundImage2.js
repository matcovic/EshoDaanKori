import React from "react";

const FundImage2 = (props) => {
  return (
    <div className="col-lg-6 col-sm-12">
      <div className="vertical-line"></div>
      <div className="step-box">
        <img src={props.Image} alt="" />
      </div>
    </div>
  );
};

export default FundImage2;
