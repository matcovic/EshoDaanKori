import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import "../SignInPage/SignIn.css";
import { EmailIcon } from "../../assets/assets.js";
import { Redirect } from "react-router";
import axios from "axios";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  console.log(props)

  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
   // return <Redirect to="/sign-in" />;
  }

  function onSendClick(event) {
    event.preventDefault();
    console.log("sending reset pass link");

    const sendResetPasswordLink = async () => {
      const { data } = await axios.post("/api/auth/reset-password-link", {email});
      if (data.status === 1) {
        console.log(data.message);
       // window.location.replace("/");
      } else {
        console.log(data.status);
        console.log(data.message);
      }
    };

    sendResetPasswordLink();
  }

  function onChange(event) {
    const { value } = event.target;
    setEmail(value);
  }

 
  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h1>RESET PASSWORD</h1>
            <p>
              Enter your email address that is associated with your account. We
              will send you an email containing a link to reset your password
            </p>

            <form>
              <div>
                <Input
                  name="email"
                  onChange={onChange}
                  icon={EmailIcon}
                  iconPosition="left"
                  placeholder="Email Address"
                  className="input-length"
                />
              </div>
              <div className="Forgot-reset-btn">
                <button onClick={onSendClick} className=" btn btn-type1">
                  CONTINUE
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
