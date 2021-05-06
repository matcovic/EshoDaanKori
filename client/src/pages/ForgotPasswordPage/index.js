import React from "react";
import { Input } from "semantic-ui-react";
import "../SignInPage/SignIn.css";
import mailIcon from "../../assets/icons/ico-email.svg";

const EmailIcon = (
  <i className="icon">
    <img className="input-icon" width={37.39} height={38} src={mailIcon} />
  </i>
);

const ForgotPassword = () => {
  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h1>RESET PASSWORD</h1>
            <p>Enter your email address that is associated with your account</p>

            <form>
              <div>
                <Input
                  icon={EmailIcon}
                  iconPosition="left"
                  placeholder="Email Address"
                  className="input-length"
                />
              </div>
              <div className="Forgot-reset-btn">
                <button className=" btn btn-type1">RESET</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
