import React from "react";

function OurVision(props) {
  return (
    <section id="our-vision-section">
      <svg
        className="blob3"
        viewBox="0 0 527 826"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.1983 128.129C-25.4465 150.759 -82.2094 157.374 -106.502 208.412C-130.687 259.225 -116.899 328.769 -105.656 392.545C-95.2019 451.842 -68.9521 504.346 -44.4903 560.156C-10.3858 637.967 -0.489155 746.359 65.333 782.662C130.001 818.328 183.329 743.357 242.914 718.668C300.112 694.969 371.193 697.718 406.875 641.147C443.896 582.452 454.228 495.988 433.986 415.738C414.973 340.355 349.655 294.294 303.974 233.186C261.04 175.752 233.392 90.6731 174.76 68.9671C116.291 47.3211 70.9465 102.969 20.1983 128.129Z"
          fill="#B7FE81"
        />
      </svg>

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
        <a className="btn btn-type1" href="#">
          LEARN HOW IT WORKS
        </a>
      </div>
    </section>
  );
}

export default OurVision;
