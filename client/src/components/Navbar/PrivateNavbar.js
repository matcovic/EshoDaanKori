import React from "react";
import { Link } from "react-router-dom";
import "./privateNavBar.css";
import "./utilities/navBarHide";

const PrivateNavbar = () => {
  return (
    <nav className="autohide navbar navbar-expand-lg bg-white private-navbar">
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
                My fundraisers
              </Link>
            </li>
          </ul>
          <Link
            to="/courses?sort=name"
            className="nav-link navbar-btn"
            data-bs-target="#myModal"
            data-bs-toggle="modal"
          >
            Start a new campaign
          </Link>

          {/* User profile */}
          <div className="btn-group nav-item">
            <button
              type="button"
              className="btn "
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              <i aria-hidden="true" className="user circle huge icon"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: 600,
                    color: "#6E6E6E",
                  }}
                >
                  Tashfiq Khanki
                </h3>
              </li>
              <li>
                <hr className="dropdown-divider" />{" "}
              </li>
              <li>
                <Link className="dropdown-item" to="/#">
                  My Donations
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/#">
                  Account Settings
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/#">
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
