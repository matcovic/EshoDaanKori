import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import "../SignInPage/SignIn.css";
import { EmailIcon, KeyIcon } from "../../assets/assets.js";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

const SignUp = ({ isAuthenticated }) => {
  const [state, setState] = useState({});

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                <Link
                  className="btn btn-type1"
                  to={{
                    pathname: "/registration",
                    state,
                  }}
                >
                  SIGN IN
                </Link>
              </div>
            </form>

            <div className="signIn-dont-text">
              <span>Already have an account?</span>
              <a href="/sign-in">SIGN IN</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
