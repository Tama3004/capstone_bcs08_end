import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "react-responsive";

export default function Slick() {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 5,
    slidesToScroll: isMobile ? 1 : 5,
  };

  return (
    <div className="container py-24 space-y-7">
      <p className="text-4xl">Popular professional services</p>
      <Slider {...settings}>
        <div className="p-2">
          <img
            className="w-full h-full rounded-xl"
            src="https://demo5.cybersoft.edu.vn/img/crs1.png"
            alt=""
          />
        </div>
        <div className="p-2">
          <img
            className="w-full h-full rounded-xl"
            src="https://demo5.cybersoft.edu.vn/img/crs2.png"
            alt=""
          />
        </div>
        <div className="p-2">
          <img
            className="w-full h-full rounded-xl"
            src="https://demo5.cybersoft.edu.vn/img/crs3.png"
            alt=""
          />
        </div>
        <div className="p-2">
          <img
            className="w-full h-full rounded-xl"
            src="https://demo5.cybersoft.edu.vn/img/crs4.png"
            alt=""
          />
        </div>
        <div className="p-2">
          <img
            className="w-full h-full rounded-xl"
            src="https://demo5.cybersoft.edu.vn/img/crs5.png"
            alt=""
          />
        </div>
        <div className="p-2">
          <img
            className="w-full h-full rounded-xl"
            src="https://demo5.cybersoft.edu.vn/img/crs6.png"
            alt=""
          />
        </div>
        <div className="p-2">
          <img
            className="w-full h-full rounded-xl"
            src="https://demo5.cybersoft.edu.vn/img/crs7.png"
            alt=""
          />
        </div>
        <div className="p-2">
          <img
            className="w-full h-full rounded-xl"
            src="https://demo5.cybersoft.edu.vn/img/crs8.png"
            alt=""
          />
        </div>
        <div className="p-2">
          <img
            className="w-full h-full rounded-xl"
            src="https://demo5.cybersoft.edu.vn/img/crs9.png"
            alt=""
          />
        </div>
        <div className="p-2">
          <img
            className="w-full h-full rounded-xl"
            src="https://demo5.cybersoft.edu.vn/img/crs10.png"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
}
