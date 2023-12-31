import React, { useEffect, useState } from "react";
import { https } from "../api/config";
import { useDispatch } from "react-redux";
import { getMenuLoaiCongViec } from "../redux/Reducer/jobReducer";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { Dropdown } from "antd";

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
        console.log(res.data.content);
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
            ? "categoriesHeader transition-all delay-300 flex flex-wrap justify-between items-center lg:gap-3 md:gap-3 fixed z-20 top-24 left-0 right-0 border-b-2 border-t-2 bg-white"
            : "hidden"
        }
      >
        {LoaiCv.map((item, index) => {
          const dropdownItems =
            item?.dsNhomChiTietLoai[0]?.dsChiTietLoai?.map((item2, index2) => {
              return {
                key: index2,
                label: (
                  <NavLink
                    to={`/categories/${item2.id}`}
                    className="text-decoration-none"
                  >
                    {item2?.tenChiTiet}
                  </NavLink>
                ),
              };
            }) || [];

          return (
            <Dropdown
              menu={{
                items: dropdownItems,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <NavLink
                  to={`/title/${item.id}`}
                  key={index}
                  className="transition duration-150 hover:text-green-500"
                >
                  <button className="text-center lg:text-lg md:text-xs">
                    {item.tenLoaiCongViec}
                  </button>
                </NavLink>
              </a>
            </Dropdown>
          );
        })}
      </div>
    );
  };
  return <div className="h-categories">{renderMenuLoaiCv()}</div>;
}
