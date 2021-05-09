import React, { useState } from "react";
import { Input, Message } from "semantic-ui-react";
import "../SignInPage/SignIn.css";
import { EmailIcon, KeyIcon } from "../../assets/assets.js";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
//-----------for validation------------------
import * as yup from "yup";

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
  string: {
    min: () => "Password is too short",
  },
});

const schema = yup.object().shape({
  username: yup.string().email("Enter a valid email").required("Enter Email"),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .min(6)
    .oneOf(
      [yup.ref("password"), null],
      "Password and confirm password doesn't match"
    ),
});
//-----------for validation------------------

const SignUp = ({ isAuthenticated }) => {
  const [state, setState] = useState({});
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  async function OnSignUpClick(event) {
    event.preventDefault();
    console.log(state);

    const isValid = await schema.isValid(state);
    if (!isValid) {
      schema.validate(state).catch(function (err) {
        console.log("Error Name:");
        console.log(err.name); // => 'ValidationError'
        console.log("Error error");
        console.log(err.errors); // => [{ key: 'field_too_short', values: { min: 18 } }]
        setErrorBox(false);
        setErrorMessage(err.errors);
      });
    } else {
      setErrorBox(true);

      //-------------todo------------
      window.location = "/registration";
    }
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
                {/* <Link
                  className="btn btn-type1"
                  to={{
                    pathname: "/registration",
                    state,
                  }}
                >
                  SIGN IN
                </Link> */}
                <button onClick={OnSignUpClick} className="btn btn-type1">
                  {" "}
                  SIGN UP
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
