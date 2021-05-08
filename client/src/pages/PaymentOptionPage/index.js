import React from "react";
import { Input, Dropdown, List } from "semantic-ui-react";
import "./payment.css";
import Bkash from "../../assets/icons/ico-bkash.svg";
import Nagad from "../../assets/icons/ico-nagad.svg";
import Rocket from "../../assets/icons/ico-rocket.svg";
import NumberLists from "./components/ListofNumbers";
import twoDots from "../../assets/icons/ico-2dots2.svg";
import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "semantic-ui-react";

const MobileBankingOptions = [
  {
    key: "Bkash",
    value: "Bkash",
    image: {
      src: Bkash,
      alt: "Bkash",
    },
  },
  {
    key: "Nagad",

    value: "Nagad",
    image: {
      src: Nagad,
      alt: "Nagad",
    },
  },
  {
    key: "Rocket",

    value: "Rocket",
    image: {
      src: Rocket,
      alt: "Rocket",
    },
  },
];

const PaymentOptions = (props) => {
  /*   if (!isAuthenticated) {
    return <Redirect to="/access-denied" />;
  }
 */
  const [paymentOptionsList, setPaymentOptionsList] = useState([]); // holds the final numbers
  const [paymentIconKey, setPaymentIcon] = useState("Bkash");
  const [inputField, setInputField] = useState("");
  const [campaignCreated, setCampaignCreated] = useState(false);
  const [buttonActivation, setButtonActivation] = useState("false"); // disables button while loading

  console.log(props.location);

  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    window.location = "/";
  }

  function onStartCampaignClick(event) {
    event.preventDefault();
    console.log("start campaign clicked");
    console.log(paymentOptionsList);
    props.location.state.paymentOptions = paymentOptionsList;
    props.location.state.category = "Entertainment";
    console.log(props.location.state);

    setButtonActivation("");
    const startCampaign = async () => {
      const { data } = await axios.post(
        "/api/campaign/new-campaign",
        props.location.state
      );

      if (data.status === 1) {
        console.log(data.message);
        setCampaignCreated(true);
        // open dialog here
        // window.location.replace("/registration-complete");
        // return <Redirect to="/registration-complete" />;
      } else {
        console.log(data.message);
        setButtonActivation("false"); // making the button enabled again
        window.location.replace("/");

        // return <Redirect to="/error?" />;
      }
    };

    startCampaign();
  }

  //-----------------delete Number list Function---------------
  function onDeletNumberClick(index, e) {
    e.preventDefault();
    const newList = paymentOptionsList.filter((item, indx) => indx !== index);
    setPaymentOptionsList(newList);
  }

  // console.log(props.location);
  function onChange(e) {
    setInputField(e.target.value);
  }

  /**
   *
   * @param {*} event Add More button
   */
  function onAddMoreClick(event) {
    event.preventDefault();
    if (inputField !== "") {
      const newList = paymentOptionsList.concat({
        number: inputField,
        icon: paymentIconKey,
      });

      setPaymentOptionsList(newList);
      console.log(paymentOptionsList);
      console.log(paymentIconKey);

      setInputField("");
    }
  }

  function dropDownSelect(e, data) {
    console.log("Dropdown:" + data.value);
    setPaymentIcon(data.value);
  }

  /*   if (campaignCreated) {
    return (
      <Modal
        trigger={<Button>Show Modal</Button>}
        header="Reminder!"
        content="Call Benjamin regarding the reports."
        actions={["Snooze", { key: "done", content: "Done", positive: true }]}
      />
    );
  } */

  return (
    <div className="payment-background">
      <section id="payment-section">
        <div className="sample">
          <div className="payment-box payment-box-medium payment-box-small">
            <h2>PAYMENT OPTIONS</h2>
            <p>
              For now, we only offer mobile banking options. You can directly
              receive the payment through the following services.
            </p>
            <h5> We dont charge anything.</h5>

            <form>
              <div className="option-section">
                <span>
                  <Dropdown
                    inline
                    options={MobileBankingOptions}
                    defaultValue={MobileBankingOptions[0].value}
                    onChange={dropDownSelect}
                  />
                </span>
                <Input
                  value={inputField}
                  className="input-length"
                  placeholder="Enter your number. Ex- 19XXXXXXXX"
                  onChange={onChange}
                  required
                />
              </div>
              <button
                onClick={onAddMoreClick}
                disabled={!buttonActivation}
                className="btn btn-type1"
              >
                ADD MORE
              </button>
            </form>
            <div className="number-list">
              <p>PAYMENT OPTIONS ADDED</p>
              <div className="number-listView">
                <List verticalAlign="middle">
                  {paymentOptionsList.map((item, index) => (
                    <NumberLists
                      OnClickFunction={onDeletNumberClick.bind(this, index)}
                      icon={mapIcon(item.icon)}
                      number={item.number}
                    />
                  ))}
                </List>
              </div>
            </div>
            <div className="campaign-start">
              <p>
                NOTE: If your account reaches its limit, you can always change
                it from your profile
              </p>
              <form>
                <button
                  onClick={onStartCampaignClick}
                  className="btn btn-type1"
                  disabled={!buttonActivation}
                >
                  START CAMPAIGN
                </button>
              </form>
            </div>
            <i>
              <img
                alt="start campaign button"
                className="three-dots"
                src={twoDots}
              />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

function mapIcon(iconName) {
  switch (iconName) {
    case "Bkash":
      return Bkash;
    case "Nagad":
      return Nagad;
    default:
      return Rocket;
  }
}

export default PaymentOptions;
