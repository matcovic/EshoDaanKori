import React from "react";
import { Link } from "react-router-dom";

function Intro(props) {
  return (
    <section id="intro-section">
      <h1>{props.slogan}</h1>
      <p>{props.sloganDescription}</p>

      <Link className="btn btn-type1" to="/discover">
        START DONATING
      </Link>
    </section>
  );
}

export default Intro;
