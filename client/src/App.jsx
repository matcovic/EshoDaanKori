import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
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
import MyFundRaisersPage from "./pages/MyFundRaisersPage";
import FundDetailsPage from "./pages/FundDetailsPage";
import FundEditDetailsPage from "./pages/FundEditDetailsPage";
import HowItWorks from "./pages/HowItWorks";
import TermsAndConditions from "./pages/TermsAndConditions";
import Privacy from "./pages/Privacy";
import CookiePolicy from "./pages/CookiePolicy";

import contactUs from "./pages/ContactUs";
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


  return (
    <Router>
      <div>
        <div id="container">
          <div id="main">
            <Loading
              loading={!dataChange}
              background="#00AD7C"
              loaderColor="#B7FE81"
            />
            {<Navbar isAuthenticated={isAuthenticated} />}
            <Switch>
              <Route
                path="/"
                exact
                component={isAuthenticated ? DiscoverPage : LandingPage}
              />
              <Route path="/discover" exact component={DiscoverPage} />
              <Route
                path="/terms-and-conditions"
                exact
                component={TermsAndConditions}
              />
              <Route path="/privacy-policy" exact component={Privacy} />
              <Route path="/cookie-policy" exact component={CookiePolicy} />

              <Route path="/how-it-works" exact component={HowItWorks} />
              <Route path="/contact-us" exact component={contactUs} />

              <Route
                exact
                path="/category/:category"
                component={DiscoverPage}
              />
              <Route
                exact
                path="/fundraisers/view/:fundraiserId"
                component={FundDetailsPage}
              />
              <Route
                exact
                path="/fundraisers/edit/:fundraiserId"
                component={NewCampaign}
              />

              <Route
                exact
                path="/fundraisers/change-payment-options/:fundraiserId"
                component={PaymentOptions}
              />

              <Route
                exact
                path="/fundraisers/edit-post/:fundraiserId"
                component={FundEditDetailsPage}
              />

              <Route
                path="/my-fundraisers"
                exact
                component={() => (
                  <MyFundRaisersPage isAuthenticated={isAuthenticated} />
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
              <Route exact path="/start-campaign" component={NewCampaign} />
              <Route
                exact
                path="/payment"
                render={(props) => <PaymentOptions {...props} />}
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
