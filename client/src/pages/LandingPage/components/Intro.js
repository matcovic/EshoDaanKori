import React from "react";

function Intro(props) {
  return (
    <section id="intro-section">
      <svg
        className="blob1"
        viewBox="0 0 322 875"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.13193 1.4056C74.2948 -16.5297 88.9018 142.171 144.66 192.768C197.894 241.074 307.998 201.321 320.905 285.226C335.347 379.11 202.301 415.264 193.517 510.375C184.393 609.166 300.097 688.367 275.012 782.156C253.191 863.741 161.321 879.924 96.3022 873.849C36.7674 868.286 -2.19916 793.128 -52.996 751.509C-88.5988 722.34 -127.97 704.944 -157.647 665.785C-189.139 624.232 -211.432 574.646 -228.348 520.133C-249.828 450.917 -300.328 369.094 -269.04 306.824C-235.769 240.611 -142.863 309.032 -96.7375 258.206C-39.1465 194.746 -65.1836 21.2799 8.13193 1.4056Z"
          fill="#B7FE81"
        />
      </svg>

      <svg
        className="blob2"
        viewBox="0 0 570 896"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M552.32 772.135C637.046 791.358 747.136 745.361 781.951 664.536C819.108 578.274 755.051 479.199 715.874 392.437C692.099 339.785 615.257 323.768 602.608 267.361C584.241 185.463 697.59 76.2565 633.228 23.9111C571.841 -26.015 501.15 95.6528 430.635 127.496C394.29 143.908 359.148 158.953 319.812 165.441C245.066 177.771 134.194 114.609 97.5929 182.431C62.4453 247.56 201.975 299.201 207.15 374.205C213.058 459.845 73.2303 544.517 127.152 610.866C180.772 676.842 288.361 540.64 366.5 570.279C452.437 602.876 463.074 751.887 552.32 772.135Z"
          fill="#B7FE81"
        />
      </svg>

      <h1>{props.slogan}</h1>
      <p>{props.sloganDescription}</p>

      <a className="btn btn-type1" href="#">
        GET STARTED
      </a>
    </section>
  );
}

export default Intro;