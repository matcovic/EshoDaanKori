import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SIgnInPage";
import DiscoverPage from "./pages/DiscoverPage";
import SignUp from "./pages/SignUpPage";
import Verification from "./pages/VerificationPage";
import Registration from "./pages/RegistrationPage";
import RegistrationComplete from "./pages/RegistrationCompletePage";
import NewCampaign from "./pages/NewCampaignPage";
import axios from "axios";
import PaymentOptions from "./pages/PaymentOptionPage";

function App() {
  const [isAuthenticated, setAuthenticationStatus] = useState(false);

  /**
   * @GET request
   * Checks if the user is authenticated already. IF so, then redirect user to their homepage
   */
  try {
    axios
      .get("/api/auth/is-authenticated", {
        withCredentials: true,
      })
      .then(({ data }) => {
        console.log(data);
        data.status === 1
          ? setAuthenticationStatus(true)
          : setAuthenticationStatus(false);
      });
  } catch (error) {
    console.log(error);
  }

  return (
    <Router>
      <div>
        <div id="container">
          <div id="main">
            <PublicNavbar />
            <Switch>
              <Route
                  path="/"
                  exact
                  component={isAuthenticated ? Registration : LandingPage}
              />
              <Route path="/discover" exact component={DiscoverPage} />
              <Route path="/signIn" exact component={SignIn} />
              <Route path="/signUp" exact component={SignUp} />
              <Route path="/verification" exact component={Verification} />
              <Route path="/registration"  exact component={Registration} />
              <Route
                path="/registration-complete"
                component={RegistrationComplete}
              />
              <Route exact path="/new-campaign" component={NewCampaign} />
              <Route exact path="/payment" component={PaymentOptions} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
