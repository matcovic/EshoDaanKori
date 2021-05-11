import React, { useState } from "react";
import { Input, Message, Modal, Header } from "semantic-ui-react";
import facebookLogo from "../../assets/images/facebookLogo.svg";
import googleLogo from "../../assets/images/googleLogo.svg";
import "./SignIn.css";
import { EmailIcon, KeyIcon } from "../../assets/assets.js";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Helmet } from "react-helmet";

yup.setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: "Field Invalid",
  },
  email: {},
  // use functions to generate an error object that includes the value from the schema
  string: {
    min: () => "Password is too short",
  },
});

const schema = yup.object().shape({
  username: yup.string().email().required(),
  password: yup.string().required().min(6),
});
//-----------for validation------------------

const SignIn = ({ isAuthenticated }) => {
  const [form, setFormContent] = useState({});
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  async function onSignInClick(event) {
    event.preventDefault();

    console.log("sign in clicked");
    console.log(form);

    const isValid = await schema.isValid(form);
    console.log("to mama");
    console.log(isValid);

    if (!isValid) {
      schema.validate(form).catch(function (err) {
        console.log("Error Name:");
        console.log(err.name); // => 'ValidationError'
        console.log("Error error");
        console.log(err.errors); // => [{ key: 'field_too_short', values: { min: 18 } }]
        setErrorBox(false);
        setErrorMessage(err.errors);
      });
    } else {
      console.log(form);
      const loginUser = async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/auth/login-email`, form,  { withCredentials: true });
        if (data.status === 1) {
          setErrorBox(true);
          window.location.replace("/");
        } else {
          setErrorBox(false);
          console.log(data.status);
          console.log(data.message);
          setErrorMessage(data.message);
        }
      };

      loginUser();
    }
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setFormContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="background-signup">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign In</title>
      </Helmet>
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h1>SIGN IN</h1>

            <form>
              <div>
                <Input
                  name="username"
                  icon={EmailIcon}
                  onChange={handleChange}
                  iconPosition="left"
                  placeholder="Email Address"
                  className="input-length"
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
                  type="password"
                />
              </div>

              <div className="signIn-forgot-text">
                <Link to="/forgot-password">Forgot your password?</Link>
              </div>
              <div>
                <button onClick={onSignInClick} className=" btn btn-type1">
                  SIGN IN
                </button>
              </div>
            </form>
            <Message
              icon="exclamation triangle"
              hidden={ErrorBox}
              error
              header={ErrorMessage}
            />
            <div className="signIn-dont-text">
              <span>Don't have an account? </span>{" "}
              <Link to="/sign-up">Sign up</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
