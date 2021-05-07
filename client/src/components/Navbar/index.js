import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import "./privateNavBar.css";
import "./utilities/navBarHide";

function onSignOutClick(event) {
  event.preventDefault();
  console.log("sign out clicked");

  const signOut = async () => {
    const { data } = await axios.post("/api/auth/sign-out");
    if (data.status === 1) {
      console.log(data.message);
      window.location.replace("/");
    } else {
      console.log(data.message);
    }
  };

  signOut();
}

const Navbar = ({ isAuthenticated }) => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    let isMounted = true;
    // when the component loads up, send a req to the server
    const fetchContent = async () => {
      const { data } = await axios.get("/api/data/user-profile", {
        withCredentials: true,
      });
      if (data.status === -1) {
        console.log(data.message);
      } else {
        console.log(data);
        if (isMounted) setUserInfo(data);
      }
    };
    fetchContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <a
        className="close-navbar-toggler collapsed"
        data-bs-toggle="collapse"
        data-bs-target="#main_nav"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      ></a>
      <nav
        className={`autohide navbar navbar-expand-lg bg-white ${
          isAuthenticated ? "private-navbar" : ""
        }`}
      >
        <div className="container-fluid navbar-container">
          <NavHashLink className="navbar-brand abs nav-bar-title" to="/">
            AshoDaanKori
          </NavHashLink>
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

          {isAuthenticated ? (
            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item active">
                  <NavHashLink
                    to={{
                      pathname: "/fundraisers",
                      state: { status: 1 },
                    }}
                    className="nav-link"
                  >
                    My fundraisers
                  </NavHashLink>
                </li>
              </ul>
              <Link
                className="nav-link navbar-btn"
                to={{
                  pathname: "/start-campaign",
                  state: { status: 1 },
                }}
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
                  style={{ padding: "0" }}
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
                      {userInfo.fullName || "User"}
                    </h3>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />{" "}
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account">
                      Account Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={onSignOutClick}
                      className="dropdown-item"
                      to="#"
                    >
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div> //If authenticated, rendered PrivateNavbar elements
          ) : (
            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item active">
                  <NavHashLink
                    smooth
                    to="/#our-story-section"
                    className="nav-link"
                  >
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
            </div> //If not authenticated, rendered PublicNavbar elements
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
