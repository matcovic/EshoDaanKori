import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import "../SignInPage/SignIn.css";
import threeDots from "../../assets/icons/ico-3dots3.svg";
import {
  CalendarIcon,
  NidIcon,
  PhoneIcon,
  ProfileIcon,
} from "../../assets/assets";
import axios from "axios";
import { Redirect } from "react-router";

const Registration = ({ isAuthenticated }) => {
  const [form, setFormContent] = useState({});

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  function onContinueClick(event) {
    event.preventDefault();
    setFormContent(form);
    console.log("on continue click");
    console.log(form);

    const registerUser = async () => {
      const { data } = await axios.post("/api/auth/register-info", form);
      if (data.status === 1) {
        console.log("verify yourself now");
        window.location.replace("/registration-complete");
      } else {
        console.log(data.message);
      }
    };

    registerUser();
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setFormContent((prevContent) => {
      if (name === "fullName") {
        return {
          fullName: value,
          phoneNumber: prevContent.phoneNumber,
          dob: prevContent.dob,
          nid: prevContent.nid,
        };
      } else if (name === "phoneNumber") {
        return {
          fullName: prevContent.fullName,
          phoneNumber: value,
          dob: prevContent.dob,
          nid: prevContent.nid,
        };
      } else if (name === "dob") {
        return {
          fullName: prevContent.fullName,
          phoneNumber: prevContent.phoneNumber,
          dob: value,
          nid: prevContent.nid,
        };
      } else if (name === "nid") {
        return {
          fullName: prevContent.fullName,
          phoneNumber: prevContent.phoneNumber,
          dob: prevContent.dob,
          nid: value,
        };
      }
    });
  }

  return (
    <div className="background-signup">
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

            <i>
              <img alt="three-dots" className="three-dots" src={threeDots} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
