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

const PrivateNavbar = () => {
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
        if(isMounted)
        setUserInfo(data);
      }
    };
    fetchContent(); 
  
    return () => {
      isMounted = false;
    };
  }, []);


  return (
    <nav className="autohide navbar navbar-expand-lg bg-white private-navbar">
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
        <div className="collapse navbar-collapse" id="main_nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <NavHashLink to="/my-fundraisers" className="nav-link">
                My fundraisers
              </NavHashLink>
            </li>
          </ul>
          <Link to="/start-campaign" className="nav-link navbar-btn">
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
                <Link onClick={onSignOutClick} className="dropdown-item" to="#">
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
