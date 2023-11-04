import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../api/config";
import { render } from "@testing-library/react";
import { Collapse, Rate } from "antd";

export default function ListPackage() {
  let { id } = useParams();
  let [listPackage, setListPackage] = useState(null);

  const collapseItems = [
    {
      key: "1",
      label: (
        <div className="text-gray-500 text-lg font-semibold">
          There are many passages but the majority?
        </div>
      ),
      children: (
        <div className="text-gray-500 text-lg">
          Voluptates amet earum velit nobis aliquam laboriosam nihil debitis
          facere voluptatibus consectetur quae quasi fuga, ad corrupti libero
          omnis sapiente non assumenda, incidunt officiis eaque iste minima
          autem.
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="text-gray-500 text-lg font-semibold">
          There are many passages but the majority?
        </div>
      ),
      children: (
        <div className="text-gray-500 text-lg">
          Voluptates amet earum velit nobis aliquam laboriosam nihil debitis
          facere voluptatibus consectetur quae quasi fuga, ad corrupti libero
          omnis sapiente non assumenda, incidunt officiis eaque iste minima
          autem.
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="text-gray-500 text-lg font-semibold">
          There are many passages but the majority?
        </div>
      ),
      children: (
        <div className="text-gray-500 text-lg">
          Voluptates amet earum velit nobis aliquam laboriosam nihil debitis
          facere voluptatibus consectetur quae quasi fuga, ad corrupti libero
          omnis sapiente non assumenda, incidunt officiis eaque iste minima
          autem.
        </div>
      ),
    },
  ];

  useEffect(() => {
    let fetchData = () => {
      https
        .get(`/api/cong-viec/lay-cong-viec-chi-tiet/${id}`)
        .then((res) => {
          console.log(res.data.content);
          setListPackage(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [id]);

  const renderItem = () => {
    return listPackage?.map((item, index) => {
      return (
        <div key={index}>
          <div className="job-title text-black text-[1.75rem] font-bold mb-4">
            {item.congViec.tenCongViec}
          </div>
          <div className="seller-overview flex flex-wrap gap-3 items-center">
            <div className="seller-avatar">
              <img
                className="rounded-full"
                width={30}
                src={item.avatar}
                alt="avatar"
              />
            </div>
            <div class="seller-name text-black capitalize font-bold cursor-pointer">
              {item.tenNguoiTao}
            </div>
            <div class="seller-level font-medium">
              Level {item.congViec.saoCongViec} seller
            </div>
            <div className="seller-star-rating flex items-center">
              <p className="mr-2 text-gray-400">|</p>
              <div className="star flex items-center">
                <Rate disabled defaultValue={item.congViec.saoCongViec} />
              </div>
              <div className="star-score font-bold text-orange-300 mx-1">
                {item.congViec.saoCongViec}
              </div>
              <div className="rating font-medium">
                ({item.congViec.danhGia})
              </div>
              <p className="ml-2 text-gray-400">|</p>
            </div>
            <div className="seller-ordered text-gray-400 font-medium">
              2 Order in Queue
            </div>
          </div>

          <div className="job-img mt-3 overflow-hidden">
            <img
              className="img-fluid w-100 transition duration-200 hover:scale-125"
              src={item.congViec.hinhAnh}
              alt="..."
            />
          </div>

          <div class="job-description mt-5">
            <h2 className="text-black text-2xl font-bold mb-7">
              About This Gig
            </h2>
            <div class="description text-lg pb-3 border-b border-gray-400">
              {item.congViec.moTa}
            </div>
          </div>

          <div className="about-seller mt-5">
            <h2 className="text-black text-2xl font-bold mb-7">
              About The Seller
            </h2>
            <div className="profile flex gap-3">
              <div className="profile-img" style={{ width: 110, height: 110 }}>
                <img
                  className="w-100 rounded-full"
                  src="http://sc04.alicdn.com/kf/Hc3e61591078043e09dba7808a6be5d21n.jpg"
                  alt="..."
                />
              </div>
              <div className="profile-label">
                <h3 className="seller-name text-xl font-bold mb-1 capitalize cursor-pointer">
                  {item.tenNguoiTao}
                </h3>
                <p className="text-lg mb-1">{item.tenChiTietLoai}</p>
                <div className="seller-star-rating flex align-items-center">
                  <div className="star flex items-center">
                    <Rate disabled defaultValue={item.congViec.saoCongViec} />
                  </div>
                  <div className="star-score font-bold text-orange-300 mx-1">
                    {item.congViec.saoCongViec}
                  </div>
                  <div className="rating font-medium">
                    ({item.congViec.danhGia})
                  </div>
                </div>
                <button className="contact btn btn-outline-secondary mt-4 font-semibold px-6">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
          <div className="FAQ mt-5">
            <h2 className="text-black text-2xl font-bold mb-7">FAQ</h2>
            <Collapse expandIconPosition={"end"} items={collapseItems} />
          </div>
        </div>
      );
    });
  };

  return <div className="text-gray-500">{renderItem()}</div>;
}
