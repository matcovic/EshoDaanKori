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

const EditPaymentAccordion = ({ fundDetails }) => {
  const history = useHistory();

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
            CHANGE PAYMENT OPTIONS
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <ul>
              {fundDetails.paymentOptions.map(createPaymentListEntry)}
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    history.push({
                      pathname: `/fundraisers/change-payment-options/${fundDetails._id}`,
                      state: {status: 69, fundDetails: fundDetails},
                    });
                  }}
                  className="btn btn-type1"
                  style={{ width: "80%" }}
                >
                  UPDATE
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPaymentAccordion;
