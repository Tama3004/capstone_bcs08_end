import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { https } from "../../api/config";
import { NavLink, useParams } from "react-router-dom";
import { getJobDetail } from "../../redux/Reducer/jobReducer";
import { AiOutlineArrowRight } from "react-icons/ai";

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
          console.log(res.data.content);
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
        <p className="font-bold text-5xl text-center">{jobTitleDetail.tenLoaiCongViec}</p>
        <p className="text-2xl">Designs to make you stand out.</p>
        <button className="border-2 rounded-xl py-2 px-3">
          How Fiverr Works
        </button>
      </div>
      <div className="container py-16">
        <p className="font-bold text-4xl pb-10">
          Most popular in {jobTitleDetail.tenLoaiCongViec}
        </p>
        <div className="content flex items-center space-x-5 overflow-hidden justify-start ">
          <div className="border-2 p-2 rounded-xl">
            <div className="flex items-center space-x-3">
              <img
                className="h-16 w-16"
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101614/Logo%20design_2x.png"
                alt=""
              />
              <p className="font-bold">Minimalist Logo Design</p>
              <span className="font-bold text-xl">
                <AiOutlineArrowRight></AiOutlineArrowRight>
              </span>
            </div>
          </div>
          <div className="border-2 p-2 rounded-xl">
            <div className="flex items-center space-x-3">
              <img
                className="h-16 w-16"
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101618/Architecture%20_%20Interior%20Design_2x.png"
                alt=""
              />
              <p className="font-bold">Architecture & Interior Design</p>
              <span className="font-bold text-xl">
                <AiOutlineArrowRight></AiOutlineArrowRight>
              </span>
            </div>
          </div>
          <div className="border-2 p-2 rounded-xl">
            <div className="flex items-center space-x-3">
              <img
                className="h-16 w-16"
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101624/Photoshop%20Editing_2x.png"
                alt=""
              />
              <p className="font-bold">Image Editing</p>
              <span className="font-bold text-xl">
                <AiOutlineArrowRight></AiOutlineArrowRight>
              </span>
            </div>
          </div>
          <div className="border-2 p-2 rounded-xl">
            <div className="flex items-center space-x-3">
              <img
                className="h-16 w-16"
                src="https://fiverr-res.cloudinary.com/f_auto,q_auto/v1/attachments/generic_asset/asset/fc6c7b8c1d155625e7878252a09c4437-1653222039380/Nft%20Art%20%281%29.png"
                alt=""
              />
              <p className="font-bold">NFT Art</p>
              <span className="font-bold text-xl">
                <AiOutlineArrowRight></AiOutlineArrowRight>
              </span>
            </div>
          </div>
          <div className="border-2 p-2 rounded-xl">
            <div className="flex items-center space-x-3">
              <img
                className="h-16 w-16"
                src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/97477f04af40de3aa1f8d6aa21f69725-1626179101623/T-Shirts%20_%20Merchandise_2x.png"
                alt=""
              />
              <p className="font-bold">T-Shirts & Merchandise</p>
              <span className="font-bold text-xl">
                <AiOutlineArrowRight></AiOutlineArrowRight>
              </span>
            </div>
          </div>
        </div>
        <div className="py-5">
          <p className="text-4xl font-bold">
            Explore {jobTitleDetail.tenLoaiCongViec}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-10">{renderItem()}</div>
        </div>
        <div>
          <p className="text-center text-3xl font-bold pb-5">
            Services Related To Writing & Translation
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="border-2 rounded-2xl py-1 px-2">
              Minimalist logo design
            </span>
            <span className="border-2 rounded-2xl py-1 px-2">
              Signature logo design
            </span>
            <span className="border-2 rounded-2xl py-1 px-2">
              Mascot logo design
            </span>
            <span className="border-2 rounded-2xl py-1 px-2">3d logo design</span>
            <span className="border-2 rounded-2xl py-1 px-2">
              Hand drawn logo design
            </span>
            <span className="border-2 rounded-2xl py-1 px-2">
              Vintage logo design
            </span>
            <span className="border-2 rounded-2xl py-1 px-2">Remove background</span>
            <span className="border-2 rounded-2xl py-1 px-2">Photo restoration</span>
            <span className="border-2 rounded-2xl py-1 px-2">Photo retouching</span>
            <span className="border-2 rounded-2xl py-1 px-2">Image resize</span>
            <span className="border-2 rounded-2xl py-1 px-2">
              Product label design
            </span>
            <span className="border-2 rounded-2xl py-1 px-2">
              Custom twitch overlay
            </span>
            <span className="border-2 rounded-2xl py-1 px-2">
              Custom twitch emotes
            </span>
            <span className="border-2 rounded-2xl py-1 px-2">Gaming logo</span>
            <span className="border-2 rounded-2xl py-1 px-2">
              Children book illustration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
