import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { https } from "../../api/config";
import { Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { userLocalStorage } from "../../api/localService";

export default function UserInfo() {
  const handleLogOut = () => {
    userLocalStorage.remove();
  };
  const items = [
    {
      key: "1",
      label: (
        <NavLink to={"/"} onClick={handleLogOut}>
          <button className="text-lg">Đăng xuất</button>
        </NavLink>
      ),
    },
  ];
  let { userLogin } = useSelector((state) => {
    return state.userReducer;
  });

  let [infoSeller, setInfoSeller] = useState(null);

  const getUserInfo = () => {
    https
      .get(`/api/users/${userLogin?.user.id}`)
      .then((res) => {
        console.log(res);
        setInfoSeller(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let fetchData = () => {
      getUserInfo();
      //   https
      //     .get(`/api/users/${userLogin?.user.id}`)
      //     .then((res) => {
      //       console.log(res);
      //       setInfoSeller(res.data.content);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    };
    fetchData();
  }, []);

  return (
    <div className="info">
      <div className="info_sellercard_top mb-8">
        <div className="info_card bg-white p-7 border border-gray-500">
          <div className="onl flex justify-between">
            <div className="dropdown">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={"click"}
                placement="bottomRight"
              >
                <DownOutlined />
              </Dropdown>
            </div>
            <div className="user_online">online</div>
          </div>
        </div>
      </div>

      <div className="info_sellercard_bottom">card bottom</div>
    </div>
  );
}
