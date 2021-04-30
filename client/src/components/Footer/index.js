import React from "react";

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
            <a href="#!">TERMS</a>
            <a href="#!">PRIVACY POLICY</a>
            <a href="#!">CONTACT US</a>
            <a href="#!">FAQ</a>
          </div>
          {/* Footer Social */}
          <div className="col-lg-4 col-md-12 footer-social-links">
            <a href="#!">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#!">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#!">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
