import React, { useEffect } from "react";
import { Button, Dropdown, Space, Switch } from "antd";
import { NavLink, useParams } from "react-router-dom";
import { https } from "../../api/config";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";

export default function Categories() {
  let { id } = useParams();
  let [jobCategoriesDetail, setJobCategoriesDetail] = useState(null);
  let [categoriesTitle, setCategoriesTitle] = useState("");
  let [available, setAvailable] = useState(0);

  const items = [
    {
      label: <span className="text-green-500 font-medium">All Categories</span>,
      key: "1",
    },
    {
      label: (
        <div className="flex items-center justify-between space-x-3 font-medium">
          <span>Web Programing</span>
          <span className="text-gray-500">(20,566)</span>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div className="flex items-center justify-between space-x-3 font-medium">
          <span>Data Entry</span>
          <span className="text-gray-500">(12,566)</span>
        </div>
      ),
      key: "3",
    },
  ];

  useEffect(() => {
    let fetchData = () => {
      https
        .get(`/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`)
        .then((res) => {
          console.log(res.data.content);
          setJobCategoriesDetail(res.data.content);
          setCategoriesTitle(res.data.content[0].tenChiTietLoai);
          setAvailable(res.data.content.length);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [id]);

  const renderItem = () => {
    return jobCategoriesDetail?.map((item, index) => {
      return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4" key={index}>
          <div className="service-card card">
            <img src={item.congViec.hinhAnh} alt="..." />
            <div className="card-body">
              <div className="seller-info flex items-center">
                <div className="avatar">
                  <img
                    width={24}
                    height={24}
                    className="rounded-full"
                    src={item.avatar}
                    alt="avatar"
                  />
                </div>
                <div className="name ml-2 mb-3">
                  <h2 className="text-gray-800 text-lg font-bold">
                    {item.tenNguoiTao}
                  </h2>
                  <p className="text-gray-500 font-semibold">
                    Level {item.congViec.saoCongViec} Seller
                  </p>
                </div>
              </div>
              <NavLink
                to={`/jobDetail/${item.id}`}
                className="text-gray-800 text-lg mb-2 transition duration-150 hover:text-green-500 text-decoration-none"
              >
                <div>{item.congViec.tenCongViec}</div>
              </NavLink>
              <div className="rating-star flex items-center space-x-1">
                <span className="star">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1792 1792"
                    width={15}
                    height={15}
                  >
                    <path
                      fill="#ffbe5b"
                      d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"
                    />
                  </svg>
                </span>
                <span className="star-rate font-semibold text-orange-300">
                  {item.congViec.saoCongViec}
                </span>
                <span className="rating text-gray-500 font-semibold">
                  ({item.congViec.danhGia})
                </span>
              </div>
            </div>
            <div className="card-footer flex justify-content-between items-center">
              <div className="heart-icon">
                <svg
                  cursor={"pointer"}
                  fill="#b5b6ba"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.4469 1.95625C12.7344 0.496875 10.1875 0.759375 8.61561 2.38125L7.99999 3.01562L7.38436 2.38125C5.81561 0.759375 3.26561 0.496875 1.55311 1.95625C-0.409388 3.63125 -0.512513 6.6375 1.24374 8.45312L7.29061 14.6969C7.68124 15.1 8.31561 15.1 8.70624 14.6969L14.7531 8.45312C16.5125 6.6375 16.4094 3.63125 14.4469 1.95625Z" />
                </svg>
              </div>
              <div className="price flex">
                <p className="m-0 text-xs text-gray-500 font-semibold tracking-wide">
                  STARTING AT{" "}
                  <span className=" text-gray-800 text-xl font-semibold">
                    US${item.congViec.giaTien}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="py-28 container">
      <div class="categories-title text-black text-4xl font-bold pt-3 pb-8">
        <span>{categoriesTitle}</span>
      </div>
      <div className="categories-topbar">
        <div className="categories-topbar-dropdown flex flex-wrap gap-2">
          <div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className=" text-black text-lg font-semibold"
            >
              <Button className="rounded-sm py-0">
                <Space>
                  Category
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className=" text-black text-lg font-semibold"
            >
              <Button className="rounded-sm py-0">
                <Space>
                  Services Options
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className=" text-black text-lg font-semibold"
            >
              <Button className="rounded-sm py-0">
                <Space>
                  Seller Detail
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className=" text-black text-lg font-semibold"
            >
              <Button className="rounded-sm py-0">
                <Space>
                  Delivery Time
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </div>
        <div className="flex flex-wrap gap-7 justify-start items-center mt-5">
          <div className="flex items-center">
            <Switch className="bg-gray-400"></Switch>
            <span className=" text-gray-500 text-lg font-semibold ml-2 mb-1">
              Pro services
            </span>
          </div>
          <div className="flex items-center">
            <Switch className="bg-gray-400"></Switch>
            <span className=" text-gray-500 text-lg font-semibold ml-2 mb-1">
              Local sellers
            </span>
          </div>
          <div className="flex items-center">
            <Switch className="bg-gray-400"></Switch>
            <span className=" text-gray-500 text-lg font-semibold ml-2 mb-1">
              Online sellers
            </span>
          </div>
        </div>
      </div>
      <div className="py-3 flex justify-content-between">
        <div className="px-3">
          <span className="font-semibold text-gray-500">
            {available} services available
          </span>
        </div>
        <div className="px-3 text-lg">
          <span className="text-gray-500 font-semibold">Sort by</span>
          <select className="cursor-pointer font-bold outline-none">
            <option>Relevance</option>
            <option value="bestselling">Best Selling</option>
            <option value="newarrival">New Arrivals</option>
          </select>
        </div>
      </div>
      <div className="row">{renderItem()}</div>
    </div>
  );
}
