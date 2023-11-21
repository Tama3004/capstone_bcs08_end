import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { https } from "../../api/config";
import { NavLink, useParams } from "react-router-dom";
import { getJobDetail } from "../../redux/Reducer/jobReducer";

export default function Title() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let { jobTitleDetail } = useSelector((state) => {
    return state.jobReducer;
  });

  useEffect(() => {
    let fetchData = () => {
      https
        .get(`/api/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`)
        .then((res) => {
          console.log(res.data.content[0]);
          dispatch(getJobDetail(res.data.content[0]));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [id]);

  const renderItem = () => {
    return jobTitleDetail.dsNhomChiTietLoai?.map((item, index) => {
      return (
        <div className="item" key={index}>
          <img className="h-56 w-96 rounded-xl" src={item.hinhAnh} alt="..." />
          <p className="font-bold text-2xl py-6">{item.tenNhom}</p>
          {item.dsChiTietLoai.map((chiTiet, index) => {
            return (
              <p className="py-2 text-xl" key={index}>
                <NavLink to={`/categories/${chiTiet.id}`}>
                  {chiTiet.tenChiTiet}
                </NavLink>
              </p>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-green-950 text-white py-28 space-y-5">
        <p className="font-bold text-5xl">{jobTitleDetail.tenLoaiCongViec}</p>
        <p className="text-2xl">Designs to make you stand out.</p>
        <button className="border-2 rounded-xl py-2 px-3">
          How Fiverr Works
        </button>
      </div>
      <div className="container py-16">
        <p className="font-bold text-4xl pb-10">
          Most popular in {jobTitleDetail.tenLoaiCongViec}
        </p>
        <div className="content grid grid-cols-10 gap-4">
          <div className="border-2 col-span-2">
            <p>Minimalist Logo Design</p>
          </div>
          <div className="border-2 col-span-2">
            <p>Architecture & Interior Design</p>
          </div>
          <div className="border-2 col-span-2">Image Editing</div>
          <div className="border-2 col-span-2">NFT Art</div>
          <div className="border-2 col-span-2">T-Shirts & Merchandise</div>
        </div>
        <div className="py-5">
          <p className="text-4xl font-bold">
            Explore {jobTitleDetail.tenLoaiCongViec}
          </p>
          <div className="grid grid-cols-4 gap-6 py-10">{renderItem()}</div>
        </div>
        <div>
          <p className="text-center text-3xl font-bold pb-5">
            Services Related To Writing & Translation
          </p>
          <div className="grid grid-cols-7 text-center gap-4">
            <span className="border-2 rounded-2xl py-1">
              Minimalist logo design
            </span>
            <span className="border-2 rounded-2xl py-1">
              Signature logo design
            </span>
            <span className="border-2 rounded-2xl py-1">
              Mascot logo design
            </span>
            <span className="border-2 rounded-2xl py-1">3d logo design</span>
            <span className="border-2 rounded-2xl py-1">
              Hand drawn logo design
            </span>
            <span className="border-2 rounded-2xl py-1">
              Vintage logo design
            </span>
            <span className="border-2 rounded-2xl py-1">Remove background</span>
            <span className="border-2 rounded-2xl py-1">Photo restoration</span>
            <span className="border-2 rounded-2xl py-1">Photo retouching</span>
            <span className="border-2 rounded-2xl py-1">Image resize</span>
            <span className="border-2 rounded-2xl py-1">
              Product label design
            </span>
            <span className="border-2 rounded-2xl py-1">
              Custom twitch overlay
            </span>
            <span className="border-2 rounded-2xl py-1">
              Custom twitch emotes
            </span>
            <span className="border-2 rounded-2xl py-1">Gaming logo</span>
            <span className="border-2 rounded-2xl py-1">
              Children book illustration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
