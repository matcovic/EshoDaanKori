import React, { useRef, useState } from "react";
import { Input, Message } from "semantic-ui-react";
import "../SignInPage/SignIn.css";
import {
  CalendarIcon,
  NidIcon,
  PhoneIcon,
  ProfileIcon,
} from "../../assets/assets";
import axios from "axios";
import { Redirect } from "react-router";
import LoadingBar from "react-top-loading-bar";
//-----------for validation------------------
import * as yup from "yup";
import { useHistory } from "react-router-dom";
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

const phoneRegExp = "[0][1][1-9][0-9]{8}";

const schema = yup.object().shape({
  fullName: yup.string().required("Enter your full name"),

  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(11, "Phone number is too long")
    .min(11, "Phone number is too short")
    .required("Field cannot be empty!"),

  dob: yup.string().required("Field cannot be empty!"),
});
//-----------for validation------------------

const Registration = (props) => {
  const [form, setFormContent] = useState({});
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);
  const [registrationStatus, setRegistrationStatus] = useState(false);
  const history = useHistory();

  const ref = useRef(null); // for loading bar

  if (!(props.location && props.location.state)) {
    return <Redirect to="/sign-in" />;
  }
  const { username, password, confirmPassword } =
    (props.location && props.location.state) || {};

  async function onContinueClick(event) {
    event.preventDefault();

    form.username = username;
    form.password = password;
    form.confirmPassword = confirmPassword;
    const isValid = await schema.isValid(form);

    if (!isValid) {
      schema.validate(form).catch(function (err) {
        setErrorBox(false);
        setErrorMessage(err.errors);
      });
    } else {
      ref.current.continuousStart();
      setErrorBox(true);
      const registerUser = async () => {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_DOMAIN}/api/auth/register-user`,
          form,
          { withCredentials: true }
        );
        if (data.status === 1) {
          ref.current.complete();
          window.location.replace("/registration-complete");
          setRegistrationStatus(true);
        } else {
          ref.current.complete();
          setErrorBox(false);
          setErrorMessage(data.message);
        }
      };

      registerUser();
    }
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setFormContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  if (registrationStatus) {
    return <Redirect to="/registration-complete" />;
  }

  return (
    <div className="background-signup">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Registration</title>
      </Helmet>
      <LoadingBar color="#FF641A" ref={ref} shadow={true} height={4} />

      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h2>COMPLETE REGISTRATION</h2>

            <form>
              <div>
                <Input
                  name="fullName"
                  onChange={handleChange}
                  icon={ProfileIcon}
                  iconPosition="left"
                  placeholder="Enter your full name *"
                  className="input-length"
                />
              </div>

              <div>
                <Input
                  name="phoneNumber"
                  onChange={handleChange}
                  icon={PhoneIcon}
                  iconPosition="left"
                  placeholder="Enter your phone number *"
                  className="input-length"
                />
              </div>
              <div>
                <Input
                  name="dob"
                  onChange={handleChange}
                  icon={CalendarIcon}
                  iconPosition="left"
                  placeholder="Enter date of birth(dd/mm/yy) *"
                  className="input-length"
                />
              </div>

              <div>
                <button onClick={onContinueClick} className=" btn btn-type1">
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

export default Registration;
