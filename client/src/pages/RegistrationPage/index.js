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

const phoneRegExp = "[0][1][1-9][0-9]{8}";

const schema = yup.object().shape({
  fullName: yup.string().required("Enter your full name"),

  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .max(11, "Phone number is too long")
    .min(11, "Phone number is too short")
    .required(),
  dob: yup.date("Date must be dd/mm/yyyy").required(),
});
//-----------for validation------------------

const Registration = (props) => {
  const [form, setFormContent] = useState({});
  const [ErrorMessage, setErrorMessage] = useState();
  const [ErrorBox, setErrorBox] = useState(true);

  const ref = useRef(null); // for loading bar
  console.log("props: ");
  console.log(props);

  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    // return <Redirect to="/sign-in" />;
  }
  const { username, password, confirmPassword } =
    (props.location && props.location.state) || {};

  async function onContinueClick(event) {
    event.preventDefault();

    form.username = username;
    form.password = password;
    form.confirmPassword = confirmPassword;

    console.log("on continue click");
    console.log(form);
    ref.current.continuousStart();

    const isValid = await schema.isValid(form);

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
      setErrorBox(true);
      const registerUser = async () => {
        const { data } = await axios.post("/api/auth/register-user", form);
        if (data.status === 1) {
          ref.current.complete();
          console.log(data.message);
          window.location.replace("/registration-complete");
          // return <Redirect to="/registration-complete" />;
        } else {
          console.log(data.message);
          ref.current.complete();
          window.location.replace("/error?");

          // return <Redirect to="/error?" />;
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

  return (
    <div className="background-signup">
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
