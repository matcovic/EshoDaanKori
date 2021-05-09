import React, { useState } from "react";
import { Modal, Header } from "semantic-ui-react";

const customModal = (props) => {
  return (
    <Modal onClose={props.onClose} onOpen={props.onOpen} open={props.open}>
      <Modal.Content>
        <Modal.Description>
          <Header>{props.Header}</Header>
          <p>{props.message}</p>
        </Modal.Description>

        <button onClick={props.onClick} className="btn btn-type1 modal-btn">
          {props.buttonText}
        </button>
      </Modal.Content>
    </Modal>
  );
};

export default customModal;
