import React from "react";
import { useHistory } from "react-router";
import Bkash from "../../../assets/icons/ico-bkash.svg";
import Nagad from "../../../assets/icons/ico-nagad.svg";
import Rocket from "../../../assets/icons/ico-rocket.svg";

function paymentIcon(icon) {
  return icon === "Bkash" ? Bkash : icon === "Nagad" ? Nagad : Rocket;
}

function createPaymentListEntry(payment, index) {
  return (
    <li key={index}>
      <img src={paymentIcon(payment.icon)} alt={payment.icon} />
      <h3 className="phone-text">{payment.number}</h3>
    </li>
  );
}

const EditPaymentSideBar = ({ fundDetails }) => {
  const history = useHistory();
  return (
    <div className="availlable-payment-sidebar">
      <div className="payment-list">
        <ul>{fundDetails.paymentOptions.map(createPaymentListEntry)}</ul>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          history.push({
            pathname: `/fundraisers/change-payment-options/${fundDetails._id}`,
            state: {status: 69, fundDetails: fundDetails},
          });
        }}
        className="btn btn-type1"
      >
        CHANGE PAYMENT OPTIONS
      </button>
    </div>
  );
};

export default EditPaymentSideBar;
