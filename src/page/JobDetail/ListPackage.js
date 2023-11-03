import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../api/config";
import { render } from "@testing-library/react";
import { Rate } from "antd";

export default function ListPackage() {
  let { id } = useParams();
  let [listPackage, setListPackage] = useState(null);

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
          <div className="job-title text-black text-[28px] font-bold mb-4">
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
            <div class="seller-name text-black capitalize font-bold">
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

          <div className="job-img mt-3">
            <img
              className="img-fluid w-100 transition ease-in-out hover:scale-105 duration-200"
              src={item.congViec.hinhAnh}
              alt="..."
            />
          </div>
        </div>
      );
    });
  };

  return <div className="text-gray-500">{renderItem()}</div>;
}
