import React from "react";
import { Input } from "semantic-ui-react";
import "../SIgnInPage/SignIn.css";
import keyIcon from "../../assets/icons/ico-key.svg";
import threeDots from "../../assets/icons/ico-3dots2.svg";

const KeyIcon = (
  <i className="icon">
    <img className="input-icon" width={37.39} height={38} src={keyIcon} />
  </i>
);

const Verification = () => {
  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h2>VERIFICATION</h2>
            <p>
              An email has been sent to your account with a verification code.
              Please enter the code down below.
            </p>

            <form>
              <div>
                <Input
                  icon={KeyIcon}
                  iconPosition="left"
                  placeholder="Enter the code"
                  className="input-length"
                />
              </div>
              <div>
                <button className=" btn btn-type1">CONFIRM</button>
              </div>
            </form>

            <i>
              <img className="three-dots" src={threeDots} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Verification;
