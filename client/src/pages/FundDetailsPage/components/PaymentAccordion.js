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

const PaymentAccordion = ({ payments }) => {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item payment-list" style={{ padding: "0" }}>
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed payment-list-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
            style={{ margin: "0" }}
          >
            AVAILABLE PAYMENT OPTIONS
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <ul>{payments.map(createPaymentListEntry)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentAccordion;
