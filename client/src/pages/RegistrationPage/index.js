import React from "react";
import { Input } from "semantic-ui-react";
import "../SIgnInPage/SignIn.css";
import profileicon from "../../assets/icons/ico-profile.svg";
import phoneicon from "../../assets/icons/ico-phone.svg";
import calendaricon from "../../assets/icons/ico-calendar.svg";
import nidicon from "../../assets/icons/ico-nid.svg";
import threeDots from "../../assets/icons/ico-3dots3.svg";

const profileIcon = (
  <i className="icon">
    <img className="input-icon" width={37.39} height={38} src={profileicon} />
  </i>
);

const PhoneIcon = (
  <i className="icon">
    <img className="input-icon" width={37.39} height={38} src={phoneicon} />
  </i>
);
const CalendarIcon = (
  <i className="icon">
    <img className="input-icon" width={37.39} height={38} src={calendaricon} />
  </i>
);
const NidIcon = (
  <i className="icon">
    <img className="input-icon" width={37.39} height={38} src={nidicon} />
  </i>
);

const Registration = () => {
  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h2>COMPLETE REGISTRATION</h2>

            <form>
              <div>
                <Input
                  icon={profileIcon}
                  iconPosition="left"
                  placeholder="Enter your full name"
                  className="input-length"
                />
              </div>

              <div>
                <Input
                  icon={PhoneIcon}
                  iconPosition="left"
                  placeholder="Enter your phone number"
                  className="input-length"
                />
              </div>
              <div>
                <Input
                  icon={CalendarIcon}
                  iconPosition="left"
                  placeholder="Enter date of birth"
                  className="input-length"
                />
              </div>

              <div>
                <Input
                  icon={NidIcon}
                  iconPosition="left"
                  placeholder="Enter your NID or birth certificate number (optional)"
                  className="input-length"
                />
              </div>

              <div>
                <button className=" btn btn-type1">CONTINUE</button>
              </div>
            </form>

            <i>
              <img className="three-dots" src={threeDots} />
            </i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
