import React from "react";
import { Redirect } from "react-router";
import "../SignInPage/SignIn.css";
import "./errorPage.css";

const Error = (props) => {
  return (
    <div className="background-signup">
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small error-box">
            <h2>404</h2>
            <h3>OOPS! PAGE NOT FOUND</h3>
            <p>
              Sorry, the page you’re looking for doesn’t exist. If you think
              something is broken, report a problem
            </p>
            <form>
              <div>
                <button style={{ height: "100%" }} className=" btn btn-type1">
                  RETURN TO HOME
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error;
