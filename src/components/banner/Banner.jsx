import React from "react";
import "./Banner.css";

const Banner = ({ bannerImage }) => {
  return (
    <section className="intro">
      {bannerImage && (
        <img src={bannerImage} alt="Banner" className="intro-banner" />
      )}
      <h2>Discover Your Inner Peace</h2>
      <p>
        Join us for a series of wellness retreats designed to help you find
        tranquility and rejuvenation.
      </p>
    </section>
  );
};

export default Banner;
