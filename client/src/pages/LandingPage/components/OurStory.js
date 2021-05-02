import React from "react";

function OurStory(props) {
  return (
    <section id="our-story-section">
    <svg
      className="blob4"
      viewBox="0 0 415 627"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M346.26 0.17434C387.289 -2.77635 420.92 32.6004 461.335 40.2644C517.105 50.8404 592.174 10.5407 628.95 53.7817C665.119 96.3097 622.924 163.473 612.818 218.379C605.548 257.874 582.279 292.152 577.73 332.051C572.488 378.037 599.569 425.334 584.247 469.008C568.077 515.097 531.776 552.83 490.895 579.558C448.094 607.541 396.256 635.341 346.26 624.603C295.042 613.602 267.431 558.568 228.74 523.251C199.225 496.311 175.996 464.619 144.311 440.269C102.027 407.773 34.8298 403.4 10.8228 355.781C-12.0308 310.45 5.25006 252.387 26.3003 206.191C46.3241 162.247 86.3523 131.253 125.816 103.421C159.613 79.5862 201.437 73.803 238.889 56.262C275.92 38.918 305.473 3.10758 346.26 0.17434Z"
        fill="#B7FE81"
      />
    </svg>

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
