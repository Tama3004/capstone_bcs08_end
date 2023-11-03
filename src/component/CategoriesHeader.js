import React, { useEffect, useState } from "react";
import { https } from "../api/config";
import { useDispatch } from "react-redux";
import { getMenuLoaiCongViec } from "../redux/Reducer/jobReducer";
import { NavLink, useLocation, useParams } from "react-router-dom";

export default function CategoriesHeader() {
  const [LoaiCv, setLoaiCv] = useState([]);
  let dispatch = useDispatch();
  let { id } = useParams();

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

  useEffect(() => {
    https
      .get("/api/cong-viec/lay-menu-loai-cong-viec")
      .then((res) => {
        dispatch(getMenuLoaiCongViec(res.data.content));
        setLoaiCv(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  let renderMenuLoaiCv = () => {
    return (
      <div
        className={
          scrollPosition > 0 || location.pathname !== "/"
            ? "categoriesHeader transition-all delay-300 flex justify-between fixed z-20 top-24 left-0 right-0 px-44 py-2 border-b-2 border-t-2 bg-white"
            : "hidden"
        }
      >
        {LoaiCv.map((item, index) => {
          return (
            <NavLink to={`/title/${item.id}`} key={index}>
              <button className="text-lg">{item.tenLoaiCongViec}</button>
            </NavLink>
          );
        })}
      </div>
    );
  };
  return <div className="h-categories">{renderMenuLoaiCv()}</div>;
}
