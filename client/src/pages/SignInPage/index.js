import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import facebookLogo from "../../assets/images/facebookLogo.svg";
import googleLogo from "../../assets/images/googleLogo.svg";
import "./SignIn.css";
import { EmailIcon, KeyIcon } from "../../assets/assets.js";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const SignIn = ({ isAuthenticated }) => {
  const [form, setFormContent] = useState({});

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  function onSignInClick(event) {
    event.preventDefault();
    setFormContent(form);
    console.log("sign in clicked");
    console.log(form);

    const loginUser = async () => {
      const { data } = await axios.post("/api/auth/login-email", form);
      if (data.status === 1) {
        window.location.replace("/");
      } else {
        console.log(data.status);
        console.log(data.message);
      }
    };

    loginUser();
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setFormContent((prevContent) => {
      if (name === "username") {
        return {
          username: value,
          password: prevContent.password,
        };
      } else if (name === "password") {
        return {
          username: prevContent.username,
          password: value,
        };
      }
    });
  }

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
                  name="username"
                  icon={EmailIcon}
                  onChange={handleChange}
                  iconPosition="left"
                  placeholder="Email Address"
                  className="input-length"
                  required
                />
              </div>

              <div>
                <Input
                  name="password"
                  onChange={handleChange}
                  icon={KeyIcon}
                  iconPosition="left"
                  placeholder="Password"
                  className="input-length"
                  required
                />
              </div>
              <div className="signIn-forgot-text">
                <Link to="/forgot-password">FORGOT YOUR PASSWORD?</Link>
              </div>
              <div>
                <button onClick={onSignInClick} className=" btn btn-type1">
                  SIGN IN
                </button>
              </div>
            </form>
            <div className="signIn-dont-text">
              <span>DON’T HAVE AN ACCOUNT?</span> <a href="/sign-up">SIGN UP</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
