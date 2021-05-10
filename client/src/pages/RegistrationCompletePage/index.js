import React from "react";
import { Redirect } from "react-router";
import "../SignInPage/SignIn.css";

const RegistrationComplete = (props) => {
  if (!(props.location && props.location.state)) {
    console.log("unauthorized. Redirecting to signing page...");
    return <Redirect to="/" />;
  }
  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h2>REGISTRATION COMPLETE!</h2>
            <p>
              We have sent a verification email to your account. Please verify
              yourself by clicking on the link provided in the email.
            </p>

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
