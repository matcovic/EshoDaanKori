import React from "react";
import { Input } from "semantic-ui-react";
import "../SIgnInPage/SignIn.css";
import threeDots from "../../assets/icons/ico-3dots2.svg";
import {KeyIcon} from "../../assets/assets.js";
import { Redirect } from "react-router";

const Verification = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

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
              <img alt ="three dots" className="three-dots" src={threeDots} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Verification;
