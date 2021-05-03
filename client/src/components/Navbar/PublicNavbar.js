import React from "react";
import { Link } from "react-router-dom";
import "./utilities/navBarHide";

const PublicNavbar = () => {
  return (
    <nav className="autohide navbar navbar-expand-lg bg-white">
      <div className="container-fluid navbar-container">
        <Link className="navbar-brand abs nav-bar-title" to="/#">
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
              <Link
                to="/#"
                className="nav-link"
                data-bs-target="#myModal"
                data-bs-toggle="modal"
              >
                About
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                to="/#"
                className="nav-link"
                data-bs-target="#myModal"
                data-bs-toggle="modal"
              >
                How it works
              </Link>
            </li>
            <li className="nav-item active">
              <Link
                to="/#"
                className="nav-link"
                data-bs-target="#myModal"
                data-bs-toggle="modal"
              >
                Discover
              </Link>
            </li>
          </ul>
          <Link
            to="/#"
            className="nav-link navbar-btn"
            data-bs-target="#myModal"
            data-bs-toggle="modal"
          >
            Start Campaign
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
