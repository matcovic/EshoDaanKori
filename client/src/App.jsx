import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignInPage";
import DiscoverPage from "./pages/DiscoverPage";
import SignUp from "./pages/SignUpPage";
import Registration from "./pages/RegistrationPage";
import RegistrationComplete from "./pages/RegistrationCompletePage";
import NewCampaign from "./pages/NewCampaignPage";
import axios from "axios";
import PaymentOptions from "./pages/PaymentOptionPage";
import Loading from "react-fullscreen-loading";
import ErrorPage from "./pages/ErrorPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  const [isAuthenticated, setAuthenticationStatus] = useState(false);
  const [dataChange, onDataChange] = useState(false);

  console.log("App.jsx");
  /**
   * @GET request
   * Checks if the user is authenticated
   */
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status

    const checkAuthenticationStatus = async () => {
      try {
        const { data } = await axios.get("/api/auth/is-authenticated");
        console.log(data);

        if (isMounted) {
          onDataChange(true);
          setAuthenticationStatus(data.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAuthenticationStatus();
    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);

  if (!dataChange) {
    return (
      <Loading
        loading={dataChange ? false : true}
        background="#00AD7C"
        loaderColor="#B7FE81"
      />
    );
  }

  return (
    <Router>
      <div>
        <div id="container">
          <div id="main">
            <Loading
              loading={dataChange ? false : true}
              background="#00AD7C"
              loaderColor="#B7FE81"
            />
            {isAuthenticated ? (
              <PrivateNavbar />
            ) : (
              <PublicNavbar isAuthenticated={isAuthenticated} />
            )}
            <Switch>
              <Route
                path="/"
                exact
                component={isAuthenticated ? DiscoverPage : LandingPage}
              />
              <Route
                path="/discover"
                exact
                component={() => (
                  <DiscoverPage isAuthenticated={isAuthenticated} />
                )}
              />
              <Route
                path="/sign-in"
                exact
                component={() => <SignIn isAuthenticated={isAuthenticated} />}
              />
              <Route
                path="/sign-up"
                exact
                component={() => <SignUp isAuthenticated={isAuthenticated} />}
              />

              <Route path="/registration" exact component={Registration} />
              <Route
                path="/registration-complete"
                exact
                component={RegistrationComplete}
              />
              <Route
                exact
                path="/start-campaign"
                component={() => (
                  <NewCampaign isAuthenticated={isAuthenticated} />
                )}
              />
              <Route
                exact
                path="/payment"
                component={() => (
                  <PaymentOptions isAuthenticated={isAuthenticated} />
                )}
              />

              <Route
                exact
                path="/forgot-password"
                component={() => (
                  <ForgotPassword isAuthenticated={isAuthenticated} />
                )}
              />

              <Route
                exact
                path="/reset-password/:token/:id"
                component={() => (
                  <ResetPasswordPage isAuthenticated={isAuthenticated} />
                )}
              />
              <Route path="*" component={ErrorPage} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
