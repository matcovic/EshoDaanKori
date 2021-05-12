import React from "react";
import { Redirect } from "react-router";
import "../SignInPage/SignIn.css";
import "./errorPage.css";
import { Helmet } from "react-helmet";


const Error = (props) => {
  return (
    <div className="background-signup">
    <Helmet>
        <meta charSet="utf-8" />
        <title>404 Error</title>
      </Helmet>
      <section id="signIn-section">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small error-box">
            <h2>404</h2>
            <h3>OOPS! PAGE NOT FOUND</h3>
            <p>
              Sorry 😔, the page you’re looking for doesn’t exist. If you think
              something is broken, report a problem
            </p>
            <form>
              <div>
                <button style={{ height: "100%" }} className=" btn btn-type1">
                  REPORT
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
