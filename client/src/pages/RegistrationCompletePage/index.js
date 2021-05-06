import React from "react";
import { Redirect } from "react-router";
import "../SIgnInPage/SignIn.css";

const RegistrationComplete = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h2>REGISTRATION COMPLETE!</h2>
            <p>
              We have received your registration form. If you are not redirected
              within 5 seconds, press the button below.
            </p>

            <form>
              <div>
                <button className=" btn btn-type1">CONFIRM</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationComplete;
