import React from "react";
import { Input, Dropdown, List, Message } from "semantic-ui-react";
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
  /*   if (!isAuthenticated) {
    return <Redirect to="/access-denied" />;
  }
 */

  console.log(props.location);

  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    window.location = "/";
  }

  function onClick(event) {
    event.preventDefault();
    console.log("start campaign clicked");
    console.log(props.location.state);

    const startCampaign = async () => {
      const { data } = await axios.post(
        "/api/campaign/new-campaign",
        props.location.state
      );

      if (data.status === 1) {
        console.log(data.message);
        // window.location.replace("/registration-complete");
        // return <Redirect to="/registration-complete" />;
      } else {
        console.log(data.message);
        //window.location.replace("/error?");

        // return <Redirect to="/error?" />;
      }
    };

    startCampaign();
  }

  // const [number, setNumbers] = useState();
  const [paymentOptionsNumb, setPaymentOptions] = useState([]);
  const [paymentIconKey, setPaymentIcon] = useState("Bkash");
  const [inputField, setInputField] = useState("");
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);

  //-----------------delete Number list Function---------------
  function deletNumber(index, e) {
    e.preventDefault();
    const newList = paymentOptionsNumb.filter((item, indx) => indx !== index);
    setPaymentOptions(newList);
  }

  // console.log(props.location);
  function onChange(e) {
    setInputField(e.target.value);
  }

  async function addOnClick(event) {
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
      var newList;
      if (paymentIconKey === "Bkash") {
        newList = paymentOptionsNumb.concat({ numb: inputField, ico: Bkash });
      }
      if (paymentIconKey === "Nagad") {
        newList = paymentOptionsNumb.concat({ numb: inputField, ico: Nagad });
      }
      if (paymentIconKey === "Rocket") {
        newList = paymentOptionsNumb.concat({
          numb: inputField,
          ico: Rocket,
        });
      }
      setErrorBox(true);
      setPaymentOptions(newList);
      console.log(paymentOptionsNumb);
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
              <button onClick={addOnClick} className="btn btn-type1">
                ADD MORE
              </button>
            </form>
            <div className="number-list">
              <p>PAYMENT OPTIONS ADDED</p>
              <div className="number-listView">
                <List verticalAlign="middle">
                  {paymentOptionsNumb.map((item, index) => (
                    <NumberLists
                      OnClickFunction={deletNumber.bind(this, index)}
                      icon={item.ico}
                      number={item.numb}
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
                <button onClick={onClick} className="btn btn-type1">
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
    </div>
  );
};

export default PaymentOptions;
