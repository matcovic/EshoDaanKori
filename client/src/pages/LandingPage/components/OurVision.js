import React from "react";
import { Link } from "react-router-dom";

function OurVision(props) {
  return (
    <section id="our-vision-section">
      <div className="divider-custom">
        <h2>OUR VISION</h2>
        <div className="divider-custom-line"></div>
      </div>

      <p>{props.ourVision}</p>

      <div className="divider-custom our-promise d-flex flex-row-reverse">
        <h2>OUR PROMISE</h2>
        <div className="divider-custom-line"></div>
      </div>

      <p>{props.ourPromise}</p>

      <div className="btn-align-center">
        <Link to="/how-it-works" className="btn btn-type1">
          LEARN HOW IT WORKS
        </Link>
      </div>
    </section>
  );
}

export default OurVision;
