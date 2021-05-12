import React from "react";
import { Link } from "react-router-dom";

const EditFundCardView = (props) => { 
  return (
    // fund-card template
    <div className="fund-card-box">
      <div className="card-img">
        <img src={props.imgURL} alt="" />
        {/* edit button */}
        <button
          id="editButton"
          onClick={(e) => {
            e.preventDefault();
          }}
          className="btn edit-btn"
        >
          <i
            id="editButton"
            aria-hidden="true"
            className="pencil large icon"
          ></i>
        </button>
      </div>
      <div className="card-desc">
        <h3>{props.title}</h3>
        <p className="font-body2">{props.desc}</p>
      </div>
      {/* progress in percentage */}
      <div className="progress">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: props.currentProgress }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <div className="card-amount">
        <p>
          ৳ {props.currentAmountRaised} raised of {props.goal}
        </p>
      </div>
    </div>
  );
};

export default EditFundCardView;
