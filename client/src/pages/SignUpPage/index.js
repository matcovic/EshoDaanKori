import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import "../SIgnInPage/SignIn.css";
import threeDots from "../../assets/icons/ico-3dots1.svg";
import { EmailIcon, KeyIcon } from "../../assets/assets.js";
import axios from "axios";

const SignUp = () => {
  const [form, setFormContent] = useState({});

  function onSignUpClick(event) {
    event.preventDefault();
    setFormContent(form);
    console.log("sign up clicked");
    console.log(form);

    const registerUser = async () => {
      const { data } = await axios.post("/api/auth/register-email", form);
      console.log(data);
    };

    registerUser();
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setFormContent((prevContent) => {
      if (name === "username") {
        return {
          username: value,
          password: prevContent.password,
          confirmPassword: prevContent.confirmPassword,
        };
      } else if (name === "password") {
        return {
          username: prevContent.username,
          password: value,
          confirmPassword: prevContent.confirmPassword,
        };
      } else if (name === "confirmPassword") {
        return {
          username: prevContent.username,
          password: prevContent.password,
          confirmPassword: value,
        };
      }
    });
  }

  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h1>SIGN UP</h1>
            <form>
              <div>
                <Input
                  name="username"
                  icon={EmailIcon}
                  iconPosition="left"
                  placeholder="Email Address"
                  className="input-length"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Input
                  name="password"
                  icon={KeyIcon}
                  iconPosition="left"
                  placeholder="Password"
                  className="input-length"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Input
                  name="confirmPassword"
                  icon={KeyIcon}
                  iconPosition="left"
                  placeholder="Confirm Password"
                  className="input-length"
                  onChange={handleChange}
                />
              </div>
              <div>
                <button onClick={onSignUpClick} className="btn btn-type1">
                  SIGN IN
                </button>
              </div>
            </form>

            <i>
              <img className="three-dots" alt="three dots" src={threeDots} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
