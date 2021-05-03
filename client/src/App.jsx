import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <div>
        <div id="container">
          <div id="main">
            <PublicNavbar />
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/discover" component={DiscoverPage} />
              <Route path="/signIn" component={SignIn} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/verification" component={Verification} />
              <Route path="/registration" component={Registration} />
              <Route
                path="/registration-complete"
                component={RegistrationComplete}
              />
              <Route path="/new-campaign" component={NewCampaign} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
