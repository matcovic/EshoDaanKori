import React from "react";
import { Redirect } from "react-router";
import "../SignInPage/SignIn.css";
import { Helmet } from "react-helmet";

const RegistrationComplete = (props) => {
 
  return (
    <div className="background-signup">
    <Helmet>
        <meta charSet="utf-8" />
        <title>Registration Success</title>
      </Helmet>
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h2>REGISTRATION COMPLETE!</h2>
            <p>
              An email has been sent to your account with a verification link.
              Please click on the link and we will verify you.
            </p>
            <p className="spam">Make sure to check your spam folder</p>

            <form>
              <div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    window.location.replace("/sign-in");
                  }}
                  className=" btn btn-type1"
                >
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegistrationComplete;
