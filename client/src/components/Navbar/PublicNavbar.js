import React from "react";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import "./utilities/navBarHide";

const PublicNavbar = () => {
  return (
    <nav className="autohide navbar navbar-expand-lg bg-white">
      <div className="container-fluid navbar-container">
        <Link className="navbar-brand abs nav-bar-title" to="/">
          AshoDaanKori
        </Link>
        <button
          className="navbar-toggler ms-auto custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main_nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main_nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <NavHashLink smooth to="/#our-story-section" className="nav-link">
                About
              </NavHashLink>
            </li>
            <li className="nav-item active">
              <NavHashLink to="/how-it-works" className="nav-link">
                How it works
              </NavHashLink>
            </li>
            <li className="nav-item active">
              <NavHashLink to="/discover" className="nav-link">
                Discover
              </NavHashLink>
            </li>
          </ul>
          <NavHashLink to="/sign-in" className="nav-link navbar-btn">
            START CAMPAIGN
          </NavHashLink>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
