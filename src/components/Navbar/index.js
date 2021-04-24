import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-white">
      <div className="container-fluid navbar-container">
        <a className="navbar-brand abs nav-bar-title" href="#">
          AshoDaanKori
        </a>
        <button
          className="navbar-toggler ms-auto custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="collapseNavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a
                className="nav-link"
                href=""
                data-bs-target="#myModal"
                data-bs-toggle="modal"
              >
                About
              </a>
            </li>
            <li className="nav-item active">
              <a
                className="nav-link"
                href=""
                data-bs-target="#myModal"
                data-bs-toggle="modal"
              >
                How it works
              </a>
            </li>
          </ul>
          <a
            className="nav-link navbar-btn"
            href=""
            data-bs-target="#myModal"
            data-bs-toggle="modal"
          >
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
