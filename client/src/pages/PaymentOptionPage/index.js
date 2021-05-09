import React, { useRef } from "react";
import { Input, Dropdown, List, Message, Header } from "semantic-ui-react";
import "./payment.css";
import Bkash from "../../assets/icons/ico-bkash.svg";
import Nagad from "../../assets/icons/ico-nagad.svg";
import Rocket from "../../assets/icons/ico-rocket.svg";
import NumberLists from "./components/ListofNumbers";
import twoDots from "../../assets/icons/ico-2dots2.svg";
import { Redirect } from "react-router";
import axios from "axios";
import { getBase64 } from "../../util/util";
import { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import LoadingBar from "react-top-loading-bar";

//-----------for validation------------------
import * as yup from "yup";

const phoneRegExp = "[0][1][1-9][0-9]{8}";
const schema = yup.object().shape({
  numb: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(11, "Phone number is too long")
    .min(11, "Phone number is too short")
    .required(),
});
//-----------for validation------------------

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
  const ref = useRef(null); // for loading bar
  const [paymentOptionsList, setPaymentOptionsList] = useState([]); // holds the final numbers
  const [paymentIconKey, setPaymentIcon] = useState("Bkash");
  const [inputField, setInputField] = useState("");
  const [campaignCreated, setCampaignCreated] = useState(false);
  const [buttonActivation, setButtonActivation] = useState("false"); // disables button while loading
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);

  console.log(props);
  //////Modal information---------------
  const [open, setOpen] = React.useState(true);

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
    console.log(props.location.state);

    ref.current.continuousStart(); // start loading

    setButtonActivation("");
    const startCampaign = async () => {
      const { data } = await axios.post(
        "/api/campaign/new-campaign",
        props.location.state
      );

      if (data.status === 1) {
        console.log(data);
        setCampaignCreated(true);
        ref.current.complete(); // end loading
        // @todo: open dialog here
        window.location.replace("/");
        // return <Redirect to="/registration-complete" />;
      } else {
        console.log(data);
        ref.current.complete(); // end loading
        // window.location.replace("/");
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
  async function onAddMoreClick(event) {
    event.preventDefault();

    const isValid = await schema.isValid({ numb: inputField });
    if (!isValid) {
      schema.validate({ numb: inputField }).catch(function (err) {
        console.log("Error Name:");
        console.log(err.name); // => 'ValidationError'
        console.log("Error error");
        console.log(err.errors); // => [{ key: 'field_too_short', values: { min: 18 } }]
        setErrorBox(false);
        setErrorMessage(err.errors);
      });
    } else {
      const newList = paymentOptionsList.concat({
        number: inputField,
        icon: paymentIconKey,
      });
      setErrorBox(true);
      setPaymentOptionsList(newList);
      console.log(paymentIconKey);
      setInputField("");
    }
  }

  function dropDownSelect(e, data) {
    console.log("Dropdown:" + data.value);
    setPaymentIcon(data.value);
  }

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
                  name="userNumber"
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
                  {/* <NumberLists icon={Bkash} number="012222" />
                  <NumberLists icon={Nagad} number="012222" />
                  <NumberLists icon={Rocket} number="012222" /> */}
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
            <Message
              icon="exclamation triangle"
              hidden={ErrorBox}
              error
              header={ErrorMessage}
            />
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

      <Modal
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
            <Header>SUCCESS</Header>
            <p>
              You have successfully created a campaign. Make sure to invite your
              friends and family!
            </p>
          </Modal.Description>
          <button className="btn btn-type1 modal-btn">COPY LINK</button>
          <button className="btn btn-type1 modal-btn">HOME</button>
        </Modal.Content>
      </Modal>
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
