import { use } from "passport";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Message, Modal, Header } from "semantic-ui-react";

//-----------for validation------------------
import * as yup from "yup";

const schema = yup.object().shape({
  taka: yup.number().integer().positive().required("Enter Some amount"),
});
//-----------for validation------------------

const EditDonationStats = ({ fundDetails }) => {
  //////Modal information---------------
  const [open, setOpen] = React.useState(false);

  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);
  const [amount, setAmount] = useState(0);

  function onChange(e) {
    console.log(e.target.value);

    setAmount(e.target.value);
  }
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
    }
  }

  function onEditClick() {
    console.log("Edit Clicked");
    setOpen(true);
  }

  return (
    <div className="donation-statistics">
      <div className="row">
        <div className="col-sm-6 amount-box">
          <h3>DONATION RECEIVED:</h3>
          <h3 className="amount-text">
            {/* {fundDetails.fundraisedTotal} */}
            200
          </h3>
          {/* edit button */}
          <button onClick={onEditClick} className="btn edit-btn">
            <i aria-hidden="true" className="pencil large icon"></i>
          </button>
        </div>
        <div className="col-sm-6 amount-box amount-goal-box">
          <h3>GOAL:</h3>
          <h3 className="amount-text">
            {/* {fundDetails.fundraisingGoal} */}
            1000
          </h3>
        </div>
      </div>
      {/* progress in percentage */}
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: "25%", backgroundColor: "#00AD7C" }}
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      <Modal
        id="modal-section"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        onClose={() => {
          console.log("MODAL CLOSED");
          setOpen(false);
        }}
        // trigger={onSignInClick}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>DONATION RECEIVED</Header>
            <span className="goal">GOAL: </span>{" "}
            <span className="taka">৳ 10000</span>
            {/* <p>Is it okay to use this photo?</p> */}
            <input
              onChange={onChange}
              placeholder="৳ 0"
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
