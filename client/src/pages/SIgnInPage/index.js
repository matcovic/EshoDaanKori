import React from "react";
import { Input } from "semantic-ui-react";
import facebookLogo from "../../assets/images/facebookLogo.svg";
import googleLogo from "../../assets/images/googleLogo.svg";
import mailIcon from "../../assets/icons/ico-email.svg";
import keyIcon from "../../assets/icons/ico-key.svg";
import "./SignIn.css";

const EmailIcon = (
  <i className="icon">
    <img
      className="input-icon"
      width={37.39}
      height={38}
      src={mailIcon}
      alt="email-icon"
    />
  </i>
);

const KeyIcon = (
  <i className="icon">
    <img
      className="input-icon"
      width={37.39}
      height={38}
      src={keyIcon}
      alt="key-icon"
    />
  </i>
);

const SignIn = () => {
  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h1>SIGN IN</h1>

            <a>
              <img className="logo" src={facebookLogo} alt="Facebook Logo" />
            </a>
            <img className="logo" src={googleLogo} alt="Google Logo" />

            <div className="divider-custom">
              <div className="divider-custom-line"></div>
              <p>OR</p>
              <div className="divider-custom-line"></div>
            </div>

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
                <button className=" btn btn-type1">SIGN IN</button>
              </div>
            </form>
            <div className="divider-custom">
              <div className="divider-custom-line"></div>
            </div>
            <a href="/">FORGOT YOUR PASSWORD?</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
