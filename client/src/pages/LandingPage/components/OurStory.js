import React from "react";

function OurStory(props) {
  return (
    <section id="our-story-section">
      <div className="divider-custom">
        <h2>OUR STORY</h2>
        <div className="divider-custom-line"></div>
      </div>

      <p>{props.ourStory}</p>

      <div className="btn-align-center">
        <a className="btn btn-type1" href="#">
          SUPPORT US
        </a>
      </div>
    </section>
  );
}

export default OurStory;
