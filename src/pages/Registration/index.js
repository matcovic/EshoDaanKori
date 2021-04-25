import React from "react";
import { Input } from "semantic-ui-react";
import "../../pages/SIgnIn/SignIn.css";
import mailIcon from "../../assets/icons/ico-email.svg";
import keyIcon from "../../assets/icons/ico-key.svg";
import threeDots from "../../assets/icons/ico-3dots3.svg";

const EmailIcon = (
  <i className="icon">
    <img className="input-icon" width={37.39} height={38} src={mailIcon} />
  </i>
);

const KeyIcon = (
  <i className="icon">
    <img className="input-icon" width={37.39} height={38} src={keyIcon} />
  </i>
);

const Registration = () => {
  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h2>COMPLETE REGISTRATION</h2>

            <form>
              <div>
                <Input
                  icon={EmailIcon}
                  iconPosition="left"
                  placeholder="Email Address"
                  className="input-length"
                />
              </div>

              <div>
                <Input
                  icon={KeyIcon}
                  iconPosition="left"
                  placeholder="Password"
                  className="input-length"
                />
              </div>
              <div>
                <Input
                  icon={KeyIcon}
                  iconPosition="left"
                  placeholder="Confirm Password"
                  className="input-length"
                />
              </div>

              <div>
                <Input
                  icon={EmailIcon}
                  iconPosition="left"
                  placeholder="Email Address"
                  className="input-length"
                />
              </div>

              <div>
                <button className=" btn btn-type1">SIGN IN</button>
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

export default Registration;
