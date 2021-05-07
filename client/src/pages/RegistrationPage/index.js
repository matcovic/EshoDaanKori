import React, { useRef, useState } from "react";
import { Input } from "semantic-ui-react";
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

const Registration = (props) => {
  const [form, setFormContent] = useState({});

  const ref = useRef(null); // for loading bar
  console.log("props: ");
  console.log(props);

  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    return <Redirect to="/sign-in" />;
  }
  const { username, password, confirmPassword } =
    (props.location && props.location.state) || {};

  function onContinueClick(event) {
    event.preventDefault();

    form.username = username;
    form.password = password;
    form.confirmPassword = confirmPassword;

    console.log("on continue click");
    console.log(form);
    ref.current.continuousStart();

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

  function handleChange(event) {
    const { value, name } = event.target;

    setFormContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="background-signup">
      <LoadingBar color="#FF641A" ref={ref} shadow={true} height={3} />

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
                  placeholder="Enter your full name"
                  className="input-length"
                />
              </div>

              <div>
                <Input
                  name="phoneNumber"
                  onChange={handleChange}
                  icon={PhoneIcon}
                  iconPosition="left"
                  placeholder="Enter your phone number"
                  className="input-length"
                />
              </div>
              <div>
                <Input
                  name="dob"
                  onChange={handleChange}
                  icon={CalendarIcon}
                  iconPosition="left"
                  placeholder="Enter date of birth"
                  className="input-length"
                />
              </div>

              <div>
                <Input
                  name="nid"
                  onChange={handleChange}
                  icon={NidIcon}
                  iconPosition="left"
                  placeholder="Enter your NID or birth certificate number (optional)"
                  className="input-length"
                />
              </div>

              <div>
                <button onClick={onContinueClick} className=" btn btn-type1">
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

export default Registration;
