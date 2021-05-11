import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container-fluid">
        <div className="row">
          {/* Footer Copyright */}
          <div className="col-lg-4 col-md-12 footer-copyright">
            <h4>© 2021 All rights reserved</h4>
          </div>
          {/* Footer links */}
          <div className="col-lg-4 col-md-12 footer-links">
            <Link to="/terms">TERMS</Link>
            <Link to="/privacy">PRIVACY POLICY</Link>
            <Link to="/contact-us">CONTACT US</Link>
            <Link to="#!">FAQ</Link>
          </div>
          {/* Footer Social */}
          <div className="col-lg-4 col-md-12 footer-social-links">
            <Link to="#!">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="#!">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link to="#!">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
