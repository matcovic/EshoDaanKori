import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SIgnIn";
import DiscoverPage from "./pages/DiscoverPage";
import SignUp from "./pages/SignUp";
import Verification from "./pages/Verification";
import Registration from "./pages/Registration";

function App() {
  return (
    <Router>

      <div>
        <div id="container">
          <div id="main">
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/discover" component={DiscoverPage} />
              <Route path="/signIn" component={SignIn} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/verification" component={Verification} />
              <Route path="/registration" component={Registration} />
            </Switch>
          
           
          </div>
        </div>
        <Footer />
      </div>

    </Router>
  );
}

export default App;
