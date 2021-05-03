import React from "react";
import { Button, Image, List } from "semantic-ui-react";
import "../../PaymentOptionPage/payment.css";
import DeletIcon from "../../../assets/icons/ico-delete.svg";

const NumberLists = (props) => {
  return (
    <List.Item>
      <List.Content floated="right">
        <Button>
          <img className="delet-icon" src={DeletIcon} alt="delete" />
        </Button>
      </List.Content>
      <Image avatar src={props.icon} />
      <List.Content>{props.number}</List.Content>
    </List.Item>
  );
};

export default NumberLists;
