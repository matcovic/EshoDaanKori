import React, { useEffect, useState } from "react";
import Intro from "./Intro";

function createImageEntry(img, index) {
  return (
    <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
      <img src={img} className="d-block w-100 banner-img" alt={"..props"} />
    </div>
  );
}

const BannerCarousel = ({ carouselImages, slogan, sloganDescription }) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-touch="false"
      data-bs-pause="false"
    >
      <div className="carousel-inner">
        {/* photo component */}
        {carouselImages.map(createImageEntry)}
        <Intro slogan={slogan} sloganDescription={sloganDescription} />
      </div>
    </div>
  );
};

export default BannerCarousel;
