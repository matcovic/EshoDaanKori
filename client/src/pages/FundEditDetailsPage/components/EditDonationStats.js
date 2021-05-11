import React, { useState } from "react";
import { use } from "passport";
import { Link } from "react-router-dom";
import { Header, Input, Message, Modal } from "semantic-ui-react";
import { calculateFundraisingProgress } from "../../../util/util";
import * as yup from "yup";
import axios from "axios";

const EditDonationStats = ({ fundDetails }) => {
  const [open, setOpen] = React.useState(false);
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);
  const [amount, setAmount] = useState(fundDetails.fundraisedTotal);
  var previousDonationAmount = amount;

  function onChange(e) {
    console.log(e.target.value);
    setAmount(e.target.value);
  }

  const schema = yup.object().shape({
    taka: yup
      .number()
      .integer()
      .positive()
      .required("Enter Some amount")
      .max(
        fundDetails.fundraisingGoal,
        "Amount entered cannot exceed the fundraising goal!"
      ),
  });

  async function onClick() {
    const isValid = await schema.isValid({ taka: amount });
    console.log(isValid);

    if (!isValid) {
      schema.validate({ taka: amount }).catch(function (err) {
        console.log("Error Name:");
        console.log(err.name); // => 'ValidationError'
        console.log("Error error");
        console.log(err.errors); // => [{ key: 'field_too_short', values: { min: 18 } }]
        setErrorBox(false);
        setErrorMessage(err.errors);
      });
    } else {
      setErrorBox(true);
      const fetchContent = async () => {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_DOMAIN}/api/campaign/update-donation-received`,
          {
            _id: fundDetails._id,
            donation: amount,
          }
        );
        if (data.status === 1) {
          console.log(data);
        } else {
          setAmount(previousDonationAmount);
          console.log(data);
        }
        setOpen(false);
      };
      fetchContent();
    }
  }

  function onDonationEditClick(event) {
    event.preventDefault();
    console.log("Edit Clicked");
    setOpen(true);
  }

  const progressLength = calculateFundraisingProgress(
    amount,
    fundDetails.fundraisingGoal
  );

  return (
    <div className="donation-statistics">
      <div className="row">
        <div className="col-sm-6 amount-box">
          <h3>DONATION RECEIVED:</h3>
          <h3 className="amount-text">{`৳${amount}`}</h3>
          <button onClick={onDonationEditClick} className="btn edit-btn">
            <i aria-hidden="true" className="pencil large icon"></i>
          </button>
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
      <Modal
        id="modal-section"
        onOpen={() => setOpen(true)}
        open={open}
        onClose={() => {
          setErrorBox(false);
          setErrorMessage("Please enter an amount and press confirm.");
        }}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>DONATION RECEIVED</Header>
            <span className="goal">GOAL: </span>{" "}
            <span className="taka">{`৳${fundDetails.fundraisingGoal}`}</span>
            <input
              onChange={onChange}
              placeholder={`৳${fundDetails.fundraisedTotal}`}
              value={amount}
              className="goal-input input-length"
            />
          </Modal.Description>
          <button onClick={onClick} className="btn btn-type1 modal-btn">
            CONFIRM
          </button>
          <Message
            icon="exclamation triangle"
            hidden={ErrorBox}
            error
            header={ErrorMessage}
          />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default EditDonationStats;
