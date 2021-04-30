import React, { useState, useEffect } from "react";
import WhyUs from "./WhyUs";
import why_us from "./why_us";
import FundCardView from "../../components/FundCardView";
import fund_card from "../../components/FundCardView/fund_card";
import axios from 'axios'

// function for mapping why-us boxes
function createWhyUsEntry(whyUsBox) {
  return (
    <WhyUs
      key={whyUsBox.id}
      icon={whyUsBox.icon}
      title={whyUsBox.title}
      desc={whyUsBox.desc}
    />
  );
}

//function for mapping top-funds
function topFunds(topFundsBox) {
  return (
    <div className="col-lg-4 col-6" key={topFundsBox.id}>
      <FundCardView
        imgURL={topFundsBox.imgURL}
        title={topFundsBox.title}
        desc={topFundsBox.desc}
        currentProgress={topFundsBox.currentProgress}
        currentAmountRaised={topFundsBox.currentAmountRaised}
      />
    </div>
  );
}

async function sendReqToServer(){
  const {data} = await axios.get('/api/products')
  console.log("response from server")
  console.log(data)
  return data
}


function Home() {
  // this is called as soon as the components load up.
  useEffect(() => {
    // when the component loads up, send a req to the server
    console.log("sending req to server")
    const fetch = sendReqToServer()
    
  });

  return (
    <div>
      {/* <!-- --------------------- Intro Section --------------------- --> */}
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

        <h1>MAKE FUNDRAISING EASIER</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum sit
          dui diam non. Dolor egestas lectus at pellentesque faucibus sed
          faucibus commodo proin.
        </p>

        <a className="btn btn-type1" href="#">
          GET STARTED
        </a>
      </section>

      {/* <!-- --------------------- Our-Story Section --------------------- --> */}
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

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum sit
          dui diam non. Dolor egestas lectus at pellentesque faucibus sed
          faucibus commodo proin. Elementum sit dui diam non. Dolor egestas
          lectus at pellentesque faucibus sed faucibus commodo proin. Elementum
          sit dui diam non. Dolor egestas lectus at pellentesque faucibus sed
          faucibus commodo proin.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum sit
          dui diam non. Dolor egestas lectus at pellentesque faucibus sed
          faucibus commodo proin. Elementum sit dui diam non. Dolor egestas
          lectus at pellentesque faucibus sed faucibus commodo proin. Elementum
          sit dui diam non. Dolor egestas lectus at pellentesque faucibus sed
          faucibus commodo proin.
        </p>

        <div className="btn-align-center">
          <a className="btn btn-type1" href="#">
            SUPPORT US
          </a>
        </div>
      </section>

      {/* <!-- --------------------- Our-Vision Section --------------------- --> */}
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

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum sit
          dui diam non. Dolor egestas lectus at pellentesque faucibus sed
          faucibus commodo proin. Elementum sit dui diam non. Dolor egestas
          lectus at pellentesque faucibus sed faucibus commodo proin. Elementum
          sit dui diam non. Dolor egestas lectus at pellentesque faucibus sed
          faucibus commodo proin.
        </p>

        <div className="divider-custom our-promise d-flex flex-row-reverse">
          <h2>OUR PROMISE</h2>
          <div className="divider-custom-line"></div>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum sit
          dui diam non. Dolor egestas lectus at pellentesque faucibus sed
          faucibus commodo proin. Elementum sit dui diam non. Dolor egestas
          lectus at pellentesque faucibus sed faucibus commodo proin. Elementum
          sit dui diam non. Dolor egestas lectus at pellentesque faucibus sed
          faucibus commodo proin.
        </p>

        <div className="btn-align-center">
          <a className="btn btn-type1" href="#">
            LEARN HOW IT WORKS
          </a>
        </div>
      </section>

      {/* <!-- --------------------- Top-FundRaisers Section --------------------- --> */}
      <section id="top-funds-section">
        <h2>TOP FUNDRAISERS</h2>
        <div className="container-fluid">
          <div className="row row-flex">{fund_card.map(topFunds)}</div>
        </div>
        <a className="below-right-text" href="#">
          SEE MORE {`>`}
        </a>
      </section>

      {/* --------------------- Why-Us Section --------------------- */}
      <section id="why-us-section">
        <div className="divider-custom">
          <h2>WHY US?</h2>
          <div className="divider-custom-line"></div>
        </div>

        <div className="container-fluid">
          <div className="row row-flex">{why_us.map(createWhyUsEntry)}</div>
        </div>
      </section>
    </div>
  );
}

export default Home;
