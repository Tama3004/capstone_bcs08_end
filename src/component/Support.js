import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function Support() {
  return (
    <div className="container py-20">
      <div className="grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 space-y-7 sm:col-span-1">
          <p className="text-5xl font-bold">
            A whole world of freelance talent at your fingertips
          </p>
          <ul className="space-y-5">
            <li className="space-y-2">
              <p className="flex items-center text-2xl font-bold">
                <span className="font-bold mr-2">
                  <AiOutlineCheckCircle />
                </span>
                The best for every budget
              </p>
              <p>
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </p>
            </li>
            <li className="space-y-2">
              <p className="flex items-center text-2xl font-bold">
                <span className="font-bold mr-2">
                  <AiOutlineCheckCircle />
                </span>
                Quality work done quickly
              </p>
              <p>
                Find the right freelancer to begin working on your project
                within minutes.
              </p>
            </li>
            <li className="space-y-2">
              <p className="flex items-center text-2xl font-bold">
                <span className="font-bold mr-2">
                  <AiOutlineCheckCircle />
                </span>
                Protected payments, every time
              </p>
              <p>
                Always know what you'll pay upfront. Your payment isn't released
                until you approve the work.
              </p>
            </li>
            <li className="space-y-2">
              <p className="flex items-center text-2xl font-bold">
                <span className="font-bold mr-2">
                  <AiOutlineCheckCircle />
                </span>
                24/7 support
              </p>
              <p>
                Questions? Our round-the-clock support team is available to help
                anytime, anywhere.
              </p>
            </li>
          </ul>
        </div>
        <div className="py-5 lg:col-span-7 sm:col-span-1">
          <img src="https://demo5.cybersoft.edu.vn/img/selling.png" alt="" />
        </div>
      </div>
    </div>
  );
}
