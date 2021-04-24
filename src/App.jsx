import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DiscoverPage from "./pages/DiscoverPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div id="container">
          <div id="main">
            <Navbar />
            {/* <Home /> */}
            <DiscoverPage />
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
