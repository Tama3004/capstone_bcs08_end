import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  // Get info from State and useState
  let { userLogin } = useSelector((state) => {
    return state.userReducer;
  });
  //---------- END -------------

  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  useEffect(() => {
    const updatePosition = () => {
      if (location.pathname === "/") {
        setScrollPosition(window.pageYOffset);
      } else if (location.pathname !== "/") {
        setScrollPosition(0);
      }
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [location.pathname]);

  // Render Nav
  let renderUserNav = () => {
    if (userLogin) {
      return (
        <div>
          <NavLink to="/profile">
            <button>{userLogin.user.name}</button>
          </NavLink>
        </div>
      );
    } else {
      return (
        <div className="space-x-10">
          <NavLink to="/login">
            <button>Sign in</button>
          </NavLink>
          <NavLink to="/register">
            <button>Join</button>
          </NavLink>
        </div>
      );
    }
  };

  //---------- END -------------
  return (
    <header
      className={
        scrollPosition > 0 || location.pathname !== "/"
          ? " header-active "
          : " header"
      }
    >
      <div className="container header-content">
        <div className="left_h">
          <a className="" href="/">
            fiverr<span className="text-green-500 text-5xl">.</span>
          </a>
        </div>
        <div className="right_h space-x-10 flex items-center text-lg font-bold">
          <NavLink href="">Fiverr Business</NavLink>
          <NavLink href="">Explore</NavLink>
          <NavLink href="">English</NavLink>
          <NavLink href="">US$ USD</NavLink>
          <NavLink href="">Become a Seller</NavLink>
          <div>{renderUserNav()}</div>
        </div>
      </div>
    </header>
  );
}
