import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { BsPinterest, BsFillPersonFill } from "react-icons/bs";
export default function Footer() {
  return (
    <div className="border-t-2">
      <footer className="container p-5">
        <ul className="grid grid-cols-5 gap-5 py-5">
          <li>
            <p className="font-bold mb-5 text-lg">Categories</p>
            <div className="flex flex-col space-y-6 text-md">
              <a href="*">Graphics & Design</a>
              <a href="*">Digital Marketing</a>
              <a href="*">Writing & Translation</a>
              <a href="*">Video & Animation</a>
              <a href="*">Music & Audio</a>
              <a href="*">Programming & Tech</a>
              <a href="*">Data</a>
              <a href="*">Business</a>
              <a href="*">Lifestyle</a>
              <a href="*">Sitemap</a>
            </div>
          </li>
          <li>
            <p className="font-bold mb-5 text-lg">About</p>
            <div className="flex flex-col space-y-6 text-md">
              <a href="*">Careers</a>
              <a href="*">Press & News</a>
              <a href="*">Partnerships</a>
              <a href="*">Privacy Policy</a>
              <a href="*">Terms of Service</a>
              <a href="*">Intellectual Property Claims</a>
              <a href="*">Investor Relations</a>
            </div>
          </li>
          <li>
            <p className="font-bold mb-5 text-lg">Support</p>
            <div className="flex flex-col space-y-6 text-md">
              <a href="*">Help & Support</a>
              <a href="*">Trust & Safety</a>
              <a href="*">Selling on Fiverr</a>
              <a href="*">Buying on Fiverr</a>
            </div>
          </li>
          <li>
            <p className="font-bold mb-5 text-lg">Communlty</p>
            <div className="flex flex-col space-y-6 text-md">
              <a href="*">Events</a>
              <a href="*">Blog</a>
              <a href="*">Forum</a>
              <a href="*">Community Standards</a>
              <a href="*">Podcast</a>
              <a href="*">Affiliates</a>
              <a href="*">Invite a Friend</a>
              <a href="*">Become a Seller</a>
            </div>
          </li>
          <li>
            <p className="font-bold mb-5 text-lg">More From FIverr</p>
            <div className="flex flex-col space-y-6 text-md">
              <a href="*">Fiverr Business</a>
              <a href="*">Fiverr Pro</a>
              <a href="*">Fiverr Studios</a>
              <a href="*">Fiverr Logo Maker</a>
              <a href="*">Fiverr Guides</a>
              <a href="*">Get Inspired</a>
              <a href="*">Fiverr Select</a>
              <a href="*">
                ClearVoice <br />
                <span>Content Marketing</span>
              </a>
              <a href="*">
                Fiverr Workspace <br /> <span>Invoice Software</span>
              </a>
              <a href="*">
                Learn <br />
                <span>Online Courses</span>
              </a>
              <a href="*">Working Not Working</a>
            </div>
          </li>
        </ul>
        <div className="footer-end border-t-2 py-3 flex justify-between items-center">
          <div className="footer-left flex space-x-4 items-center">
            <span className="logo_footer">
              <svg
                width="91"
                height="27"
                viewBox="0 0 91 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#7A7D85">
                  <path d="m82.9 13.1h-3.2c-2.1 0-3.2 1.5-3.2 4.1v9.3h-6.1v-13.4h-2.6c-2.1 0-3.2 1.5-3.2 4.1v9.3h-6.1v-18.4h6.1v2.8c1-2.2 2.4-2.8 4.4-2.8h7.4v2.8c1-2.2 2.4-2.8 4.4-2.8h2v5zm-25.6 5.6h-12.6c.3 2.1 1.6 3.2 3.8 3.2 1.6 0 2.8-.7 3.1-1.8l5.4 1.5c-1.3 3.2-4.6 5.1-8.5 5.1-6.6 0-9.6-5.1-9.6-9.5 0-4.3 2.6-9.4 9.2-9.4 7 0 9.3 5.2 9.3 9.1 0 .9 0 1.4-.1 1.8zm-5.9-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3.1.8-3.4 3zm-23.1 11.3h5.3l6.7-18.3h-6.1l-3.2 10.7-3.4-10.8h-6.1zm-24.9 0h6v-13.4h5.7v13.4h6v-18.4h-11.6v-1.1c0-1.2.9-2 2.3-2h3.5v-5h-4.4c-4.5 0-7.5 2.7-7.5 6.6v1.5h-3.4v5h3.4z"></path>
                </g>
                <g fill="#7A7D85">
                  <path d="m90.4 23.3c0 2.1-1.6 3.7-3.8 3.7s-3.8-1.6-3.8-3.7 1.6-3.7 3.8-3.7c2.2-.1 3.8 1.5 3.8 3.7zm-.7 0c0-1.8-1.3-3.1-3.1-3.1s-3.1 1.3-3.1 3.1 1.3 3.1 3.1 3.1 3.1-1.4 3.1-3.1zm-1.7.8.1.9h-.7l-.1-.9c0-.3-.2-.5-.5-.5h-.8v1.4h-.7v-3.5h1.4c.7 0 1.2.4 1.2 1.1 0 .4-.2.6-.5.8.4.1.5.3.6.7zm-1.9-1h.7c.4 0 .5-.3.5-.5 0-.3-.2-.5-.5-.5h-.7z"></path>
                </g>
              </svg>
            </span>
            <span className="copyright text-trunc">
              © Fiverr International Ltd. 2022
            </span>
          </div>
          <div className="footer-right flex space-x-10">
            <ul className="flex text-2xl space-x-10 items-center">
              <li>
                <button>
                  <AiFillFacebook></AiFillFacebook>
                </button>
              </li>
              <li>
                <button>
                  <AiFillTwitterCircle></AiFillTwitterCircle>
                </button>
              </li>
              <li>
                <button>
                  <AiOutlineLinkedin></AiOutlineLinkedin>
                </button>
              </li>
              <li>
                <button>
                  <BsPinterest></BsPinterest>
                </button>
              </li>
            </ul>
            <button>English</button>
            <button>US$ USD</button>
            <button>
              <BsFillPersonFill></BsFillPersonFill>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
