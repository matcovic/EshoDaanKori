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
import Verification from "./pages/VerificationPage";
import Registration from "./pages/RegistrationPage";
import RegistrationComplete from "./pages/RegistrationCompletePage";
import NewCampaign from "./pages/NewCampaignPage";
import axios from "axios";
import PaymentOptions from "./pages/PaymentOptionPage";
import Loading from "react-fullscreen-loading";

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
        const { data } = await axios.get("/api/auth/is-authenticated", {
          withCredentials: true,
        });
        if (isMounted) {
          onDataChange(true);
          console.log(data);
          data.status === 1
            ? setAuthenticationStatus(true)
            : setAuthenticationStatus(false);
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
              loading={dataChange ? false : true}
              background="#00AD7C"
              loaderColor="#B7FE81"
            />
            {isAuthenticated
              ? (console.log("hello"), (<PrivateNavbar />))
              : (console.log("ggg"), (<PublicNavbar />))}
            <Switch>
              <Route
                path="/"
                exact
                component={isAuthenticated ? DiscoverPage : LandingPage}
              />
              <Route path="/discover" exact component={DiscoverPage} />
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

              <Route
                path="/verification"
                exact
                component={() => (
                  <Verification isAuthenticated={isAuthenticated} />
                )}
              />
              <Route
                path="/registration"
                exact
                component={() => (
                  <Registration isAuthenticated={isAuthenticated} />
                )}
              />
              <Route
                path="/registration-complete"
                component={() => (
                  <RegistrationComplete isAuthenticated={isAuthenticated} />
                )}
              />
              <Route exact path="/start-campaign" component={NewCampaign} />
              <Route
                exact
                path="/payment"
                component={() => (
                  <PaymentOptions isAuthenticated={isAuthenticated} />
                )}
              />
              {/* @todo: show an error screen here  <Route exact path="*" component={LandingPage} /> */}
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
