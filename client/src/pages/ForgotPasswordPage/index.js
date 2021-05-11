import React, { useRef, useState } from "react";
import { Input, Message } from "semantic-ui-react";
import "../SignInPage/SignIn.css";
import { EmailIcon } from "../../assets/assets.js";
import { Redirect } from "react-router";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { notify } from "../../util/util";
import { Helmet } from "react-helmet";


yup.setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: "Field Invalid",
  },
});
const schema = yup.object().shape({
  email: yup.string().email().required(),
});
//-----------for validation------------------

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);
  const ref = useRef(null); // for loading bar
  const [buttonActivation, setButtonActivation] = useState("");

  console.log(props);

  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    // return <Redirect to="/sign-in" />;
  }

  async function onSendClick(event) {
    event.preventDefault();
    console.log("sending reset pass link");

    console.log(email);
    const isValid = await schema.isValid({ email: email });

    if (!isValid) {
      schema.validate({ email: email }).catch(function (err) {
        console.log("Error Name:");
        console.log(err.name); // => 'ValidationError'
        console.log("Error error");
        console.log(err.errors); // => [{ key: 'field_too_short', values: { min: 18 } }]
        setErrorBox(false);
        setErrorMessage(err.errors);
      });
    } else {
      setButtonActivation(true); // disables button
      ref.current.continuousStart();
      setErrorBox(true);
      const sendResetPasswordLink = async () => {
        const { data } = await axios.post("/api/auth/reset-password-link", {
          email,
        });
        if (data.status === 1) {
          console.log(data.message);
          notify(data.message, "success", "/sign-in");
        } else {
          console.log(data.status);
          console.log(data.message);
          notify(data.message, "error", "/sign-in");
        }
        ref.current.complete();
      };

      sendResetPasswordLink();
    }
  }

  function onChange(event) {
    const { value } = event.target;
    setEmail(value);
  }

  return (
    <div className="background-signup">
    <Helmet>
        <meta charSet="utf-8" />
        <title>Forgot Password</title>
      </Helmet>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <LoadingBar color="#FF641A" ref={ref} shadow={true} height={4} />
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
                <button
                  disabled={buttonActivation}
                  onClick={onSendClick}
                  className=" btn btn-type1"
                >
                  CONTINUE
                </button>
              </div>
            </form>
            <Message
              icon="exclamation triangle"
              hidden={ErrorBox}
              error
              header={ErrorMessage}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
