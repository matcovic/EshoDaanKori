import React, { useEffect, useState } from "react";

function createImageEntry(img, index) {
  return (
    <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
      <img src={img} className="d-block w-100" alt={"..props"} />
    </div>
  );
}

const CarouselComponent = ({ carouselImages }) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="false"
    >
      <div className="carousel-inner">
        {/* photo component */}
        {carouselImages.map(createImageEntry)}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
