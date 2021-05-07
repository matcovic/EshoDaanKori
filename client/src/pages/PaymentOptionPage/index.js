import React from "react";
import { Input, Dropdown, List } from "semantic-ui-react";
import "./payment.css";
import Bkash from "../../assets/icons/ico-bkash.svg";
import Nagad from "../../assets/icons/ico-nagad.svg";
import Rocket from "../../assets/icons/ico-rocket.svg";
import NumberLists from "./components/ListofNumbers";
import twoDots from "../../assets/icons/ico-2dots2.svg";
import { Redirect } from "react-router";

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

  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    window.location = "/";
  }

  console.log(props.location);
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
                  />
                </span>
                <Input
                  className="input-length"
                  placeholder="Enter your number. Ex- 19XXXXXXXX"
                />
              </div>
              <button className="btn btn-type1">ADD MORE</button>
            </form>
            <div className="number-list">
              <p>PAYMENT OPTIONS ADDED</p>
              <div className="number-listView">
                <List verticalAlign="middle">
                  <NumberLists icon={Bkash} number="012222" />
                  <NumberLists icon={Nagad} number="012222" />
                  <NumberLists icon={Rocket} number="012222" />
                </List>
              </div>
            </div>
            <div className="campaign-start">
              <p>
                NOTE: If your account reaches its limit, you can always change
                it from your profile
              </p>
              <form>
                <button className="btn btn-type1">START CAMPAIGN</button>
              </form>
            </div>
            <i>
              <img className="three-dots" src={twoDots} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentOptions;
