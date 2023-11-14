import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { https } from "../../api/config";
import { userLocalStorage } from "../../api/localService";
import { NavLink } from "react-router-dom";

export default function ListJob() {
  let { userLogin } = useSelector((state) => {
    return state.userReducer;
  });

  let [listJobThue, setListJobThue] = useState(null);

  useEffect(() => {
    let fetchData = () => {
      https
        .get("/api/thue-cong-viec/lay-danh-sach-da-thue", {
          headers: {
            token: userLocalStorage.get().token,
          },
        })
        .then((res) => {
          console.log(res);
          setListJobThue(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  let renderItem = () => {
    return listJobThue?.map((item, index) => {
      return (
        <div className="gigs_card border border-gray-500 p-4 mb-5" key={index}>
          <div className="flex">
            <div className="gigs_card_img w-2/5 px-3">
              <img src={item.congViec.hinhAnh} alt="" className="w-full" />
            </div>
            <div className="gigs_card_content flex flex-col w-3/5 text-gray-800 px-3">
              <h1 className="text-lg font-bold mb-2">
                {item.congViec.tenCongViec}
              </h1>
              <p className="mb-3">{item.congViec.moTaNgan}</p>
              <div className="danhgia flex justify-between mb-4">
                <div className="left font-bold">
                  <i class="fa-solid fa-star text-yellow-400"></i>
                  <span class="saoCV font-bold text-yellow-400 mr-1">
                    {item.congViec.saoCongViec}
                  </span>
                  <span class="danhGia font-normal text-gray-500">
                    ( {item.congViec.danhGia} )
                  </span>
                </div>
                <div className="right">
                  <p class="giaTien text-gray-800 text-lg">
                    ${item.congViec.giaTien}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="btn_edit flex justify-end">
            <NavLink to={`/jobDetail/${item.congViec.id}`}>
              <button className="viewdetail bg-green-500 text-white font-bold rounded transition-all hover:shadow-lg mr-7 px-3 py-2">
                View detail
              </button>
            </NavLink>
            <div class="right">
              <button class="delete bg-red-500 text-white font-bold rounded transition-all hover:shadow-lg px-3 py-2">
                DEL
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="gigs lg:pl-5">
      <div className="gigs_card_top mb-7">
        <div className="gigs_card bg-white flex items-center justify-between p-7 border border-gray-500 text-gray-600 text-lg font-bold">
          <span class="col-lg-8 col-xl-6 col-8 col-sm-6 w-[70%]">
            It seems that you don't have any active Gigs.
          </span>
          <button class="col-lg-3 col-xl-3 col-4 col-sm-4 w-[30%] bg-green-500 text-white rounded transition-all hover:shadow-lg">
            Create a new Gig
          </button>
        </div>
      </div>

      <div className="gigs_card_bottom">{renderItem()}</div>
    </div>
  );
}
