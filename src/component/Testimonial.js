import React from "react";
import Slider from "react-slick";

export default function Testimonial() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container">
      <Slider {...settings} className="px-3 py-7 lg:px-5 lg:py-10">
        <div className="testimonial-slide">
          <div className="testimonial-content">
            <img
              src="https://demo5.cybersoft.edu.vn/img/testimonial1.png"
              alt=""
            />
            <div className="testimonial-text">
              <div className="flex items-center mb-3">
                <p className="text-2xl">Kay Kim, Co-Founder</p>
                <span className="modal-logo">
                  <img
                    className="h-full w-2/3"
                    src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/rooted-logo-x2.321d79d.png"
                    alt=""
                  />
                </span>
              </div>
              <i className="text-4xl">
                "It's extremely exciting that Fiverr has freelancers from all
                over the world — it broadens the talent pool. One of the best
                things about Fiverr is that while we're sleeping, someone's
                working."
              </i>
            </div>
          </div>
        </div>
        <div className="testimonial-slide">
          <div className="testimonial-content">
            <img
              src="https://demo5.cybersoft.edu.vn/img/testimonial2.png"
              alt=""
            />
            <div className="testimonial-text">
              <div className="flex items-center mb-3">
                <p className="text-2xl">
                  Caitlin Tormey, Chief Commercial Officer
                </p>
                <span className="modal-logo">
                  <img
                    className="h-full w-2/3"
                    src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/naadam-logo-x2.0a3b198.png"
                    alt=""
                  />
                </span>
              </div>
              <i className="text-4xl">
                "We've used Fiverr for Shopify web development, graphic design,
                and backend web development. Working with Fiverr makes my job a
                little easier every day."
              </i>
            </div>
          </div>
        </div>
        <div className="testimonial-slide">
          <div className="testimonial-content">
            <img
              src="https://demo5.cybersoft.edu.vn/img/testimonial3.png"
              alt=""
            />
            <div className="testimonial-text">
              <div className="flex items-center mb-3">
                <p className="text-2xl">
                  Brighid Gannon (DNP, PMHNP-BC), Co-Founder
                </p>
                <span className="modal-logo">
                  <img
                    className="h-full w-2/3"
                    src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lavender-logo-x2.89c5e2e.png"
                    alt=""
                  />
                </span>
              </div>
              <i className="text-4xl">
                "We used Fiverr for SEO, our logo, website, copy, animated
                videos — literally everything. It was like working with a human
                right next to you versus being across the world."
              </i>
            </div>
          </div>
        </div>
        <div className="testimonial-slide">
          <div className="testimonial-content">
            <img
              src="https://demo5.cybersoft.edu.vn/img/testimonial4.png"
              alt=""
            />
            <div className="testimonial-text">
              <div className="flex items-center mb-3">
                <p className="text-2xl">Tim and Dan Joo, Co-Founders</p>
                <span className="modal-logo">
                  <img
                    className="h-full w-2/3"
                    src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/haerfest-logo-x2.03fa5c5.png"
                    alt=""
                  />
                </span>
              </div>
              <i className="text-4xl">
                "When you want to create a business bigger than yourself, you
                need a lot of help. That's what Fiverr does."
              </i>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
