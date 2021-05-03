import React from "react";
import { Link } from "react-router-dom";

const AccessNavbar = () => {
  return (
    <nav class="navbar navbar-expand-md bg-white">
      <div class="container-fluid navbar-container">
        <Link className="navbar-brand abs nav-bar-title" to="/#">
          AshoDaanKori
        </Link>
        <button
          class="navbar-toggler ms-auto custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="collapseNavbar">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item active">
              <p class="navbar-access-text">Don’t have an account?</p>
            </li>
          </ul>
          <Link
            to="/#"
            class="nav-link navbar-btn"
            data-bs-target="#myModal"
            data-bs-toggle="modal"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AccessNavbar;
