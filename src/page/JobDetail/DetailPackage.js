import { ConfigProvider, Tabs, message, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { https } from "../../api/config";
import moment from "moment/moment";
import { userLocalStorage } from "../../api/localService";

export default function DetailPackage() {
  let { id } = useParams();

  let { giaTien, moTaNgan } = useSelector((state) => {
    return state.commentsReducer;
  });

  let { userLogin } = useSelector((state) => {
    return state.userReducer;
  });

  const [thueCongViec, setThueCongViec] = useState({
    id: 0,
    maCongViec: id,
    maNguoiThue: userLogin?.user.id,
    ngayThue: moment().format("DD/MM/YYYY"),
    hoanThanh: true,
  });

  let handleThueViec = () => {
    if (userLogin) {
      https
        .post("/api/thue-cong-viec", thueCongViec, {
          headers: {
            token: userLocalStorage.get().token,
          },
        })
        .then((res) => {
          console.log(res);
          message.success("Thuê công việc thành công");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      message.error("Vui lòng đăng nhập");
    }
  };

  const renderItem = (type) => {
    return (
      <div>
        <div className="check-out-body">
          <div class="price flex items-center justify-between text-2xl font-semibold text-gray-600">
            <span class="title">{type}</span>
            <span class="title">US${giaTien}</span>
          </div>
          <p class="description my-4">{moTaNgan}</p>
          <div class="additional-info flex gap-4 mb-3">
            <div class="delivery flex items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"></path>
                <path d="M9 4H7v5h5V7H9V4z"></path>
              </svg>
              <span className="font-semibold text-gray-600">
                14 Days Delivery
              </span>
            </div>
            <div class="revision flex items-center gap-1">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.50001 11.4999C6.40001 13.3999 9.60001 13.3999 11.5 11.4999C12.2 10.7999 12.7 9.7999 12.9 8.7999L14.9 9.0999C14.7 10.5999 14 11.8999 13 12.8999C10.3 15.5999 5.90001 15.5999 3.10001 12.8999L0.900012 15.0999L0.200012 8.6999L6.60001 9.3999L4.50001 11.4999Z"></path>
                <path d="M15.8 7.2999L9.40001 6.5999L11.5 4.4999C9.60001 2.5999 6.40001 2.5999 4.50001 4.4999C3.80001 5.1999 3.30001 6.1999 3.10001 7.1999L1.10001 6.8999C1.30001 5.3999 2.00001 4.0999 3.00001 3.0999C4.40001 1.6999 6.10001 1.0999 7.90001 1.0999C9.70001 1.0999 11.5 1.7999 12.8 3.0999L15 0.899902L15.8 7.2999Z"></path>
              </svg>
              <span className="font-semibold text-gray-600">
                Unlimited Revisions
              </span>
            </div>
          </div>
          <ul class="fearture m-0 p-0">
            <li class="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 11 9"
                xmlns="http://www.w3.org/2000/svg"
                fill="#1dbf73"
              >
                <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
              </svg>
              <span className="text-gray-400 font-semibold mb-1">
                Good fearture
              </span>
            </li>
            <li class="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 11 9"
                xmlns="http://www.w3.org/2000/svg"
                fill="#1dbf73"
              >
                <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
              </svg>
              <span className="text-gray-400 font-semibold mb-1">
                Good fearture
              </span>
            </li>
            <li class="flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 11 9"
                xmlns="http://www.w3.org/2000/svg"
                fill="#1dbf73"
              >
                <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
              </svg>
              <span className="text-gray-400 font-semibold mb-1">
                Good fearture
              </span>
            </li>
          </ul>
        </div>

        <div className="check-out-footer py-6 pb-1 flex flex-col text-lg">
          <button
            type="button"
            className="submit py-3 px-6 w-full bg-green-500 rounded-sm border border-inherit text-center text-white font-semibold hover:bg-green-600 outline-none"
            onClick={handleThueViec}
          >
            Continue (US${giaTien})
          </button>
          <a
            href="#compare"
            className="compare p-3 w-full text-green-500 font-semibold text-center no-underline hover:no-underline hover:text-green-500"
          >
            Compare Packages
          </a>
        </div>
      </div>
    );
  };

  const tabItems = [
    {
      key: "1",
      label: "Basic",
      children: <div className="p-6 text-gray-500">{renderItem("Basic")}</div>,
    },
    {
      key: "2",
      label: "Standard",
      children: (
        <div className="p-6 text-gray-500">{renderItem("Standard")}</div>
      ),
    },
    {
      key: "3",
      label: "Premium",
      children: (
        <div className="p-6 text-gray-500">{renderItem("Premium")}</div>
      ),
    },
  ];

  return (
    <div className="check-out">
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              inkBarColor: "#1dbf73",
              itemActiveColor: "#1dbf73",
              itemSelectedColor: "#1dbf73",
              itemColor: "gray",
              itemHoverColor: "#1dbe50",
              itemSelectedColor: "#1dbf73",
            },
          },
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          type="card"
          size="large"
          className=" border"
        />
      </ConfigProvider>
    </div>
  );
}