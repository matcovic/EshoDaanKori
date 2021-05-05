import React from "react";
import { Input } from "semantic-ui-react";
import "../../pages/SIgnInPage/SignIn.css";
import keyIcon from "../../assets/icons/ico-key.svg";

const KeyIcon = (
  <i className="icon">
    <img className="input-icon" width={37.39} height={38} src={keyIcon} />
  </i>
);

const ResetPassword = () => {
  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h1>RESET PASSWORD</h1>

            <form>
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
                <button className=" btn btn-type1">RESET</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
