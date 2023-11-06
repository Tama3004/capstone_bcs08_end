import React from "react";
import SliderCard from "../../component/SliderCard/SliderCard";
import Content from "../../component/SliderCard/Content";
import Header from "../../component/Header";
import Trust from "../../component/TrustedBy/Trust";
import Slick from "../../component/Slick";
import CategoriesHeader from "../../component/CategoriesHeader";
import Support from "../../component/Support";
import Testimonial from "../../component/Testimonial";
import Market from "../../component/Market";
import Footer from "../../component/Footer";

export default function HomePage() {
  return (
    <div className="w-screen">
      <Header />
      <CategoriesHeader />
      <div className="relative">
        <SliderCard />
      </div>
      <div className="slider-content">
        <Content />
      </div>
      <div id="trust">
        <Trust />
      </div>
      <div>
        <Slick />
      </div>
      <div id="support">
        <Support />
      </div>
      <div>
        <Testimonial />
      </div>
      <div>
        <Market />
      </div>
      <Footer />
    </div>
  );
}
