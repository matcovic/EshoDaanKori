import React, { useState } from "react";
import { Input, Message, Modal, Header } from "semantic-ui-react";
import facebookLogo from "../../assets/images/facebookLogo.svg";
import googleLogo from "../../assets/images/googleLogo.svg";
import "./SignIn.css";
import { EmailIcon, KeyIcon } from "../../assets/assets.js";
import axios from "axios";
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

  //////Modal information---------------
  const [open, setOpen] = React.useState(true);

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
        const { data } = await axios.post("/api/auth/login-email", form);
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
            <Message
              icon="exclamation triangle"
              hidden={ErrorBox}
              error
              header={ErrorMessage}
            />
            <div className="signIn-dont-text">
              <span>DON’T HAVE AN ACCOUNT?</span>{" "}
              <Link to="/sign-up">SIGN UP</Link>
            </div>
          </div>
        </div>
      </section>

      <Modal
        id="modal-section"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        onClose={() => {
          console.log("MODAL CLOSED");
          setOpen(false);
        }}
        // trigger={onSignInClick}
      >
        <Modal.Content>
          <Modal.Description>
            <Header>News Letter</Header>
            <p>
              Our platform completely depends on individuals. The more people we
              have, the greater funds we can raise and help people to a greater
              extent. Subscribe to our newsletter to get notified of new
              campaigns
            </p>
            {/* <p>Is it okay to use this photo?</p> */}
            <Input
              placeholder="Enter email"
              iconPosition="left"
              icon={EmailIcon}
              className="input-length"
            />
          </Modal.Description>
          <button className="btn btn-type1 modal-btn">CONFIRM</button>

          <div className="modal-not-interested">
            <span onClick={() => setOpen(false)}>I’M NOT INTERESTED</span>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default SignIn;
