import React from "react";
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

const PaymentSideBar = ({ payments }) => {
  return (
    <div className="availlable-payment-sidebar">
      <div className="payment-list">
        <ul>{payments.map(createPaymentListEntry)}</ul>
      </div>
      <button className="btn btn-type1 payment-list-btn" disabled>
        AVAILABLE PAYMENT OPTIONS
      </button>
    </div>
  );
};

export default PaymentSideBar;
