import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { https } from "../../api/config";
import { Button, Dropdown, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { userLocalStorage } from "../../api/localService";

export default function UserInfo() {
  const handleLogOut = () => {
    userLocalStorage.remove();
    message.success("Đăng xuất thành công!");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };
  const items = [
    {
      key: "1",
      label: (
        <button className="text-lg" onClick={handleLogOut}>
          Đăng xuất
        </button>
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
            <div className="user_online rounded-xl px-2 border-[0.0625rem] border-green-400 text-green-400 flex items-center justify-center">
              <i className="dot font-semibold mr-1">.</i>
              <p>Online</p>
            </div>
          </div>

          <div className="info_profile">
            <div className="info_profile_image flex justify-center mb-4">
              <label className="info_label relative text-5xl w-40 h-40 rounded-full">
                <div className="label_camera absolute rounded-full opacity-0 hover:opacity-50 bg-gray-600 w-full h-full cursor-pointer">
                  <span
                    className="absolute left-1/2 top-1/2 text-white font-black"
                    style={{ transform: "translate(-50%, -50%)" }}
                  >
                    <i class="las la-camera"></i>
                  </span>
                </div>
                <input className="label_inp hidden" type="file" />
                <div className="image flex items-center justify-center bg-white text-white rounded-full w-full h-full">
                  {infoSeller?.avatar.length === 0 && (
                    <div className="rounded-full bg-gray-400 font-semibold text-white flex justify-center items-center w-40 h-40 border-[1px] border-gray-700">
                      <p className="uppercase">
                        {infoSeller?.tenNguoiBinhLuan.slice(0, 1)}
                      </p>
                    </div>
                  )}
                  {infoSeller?.avatar.length > 0 && (
                    <img
                      src={infoSeller?.avatar}
                      alt="avatar"
                      className="avatar w-40 h-40 rounded-full"
                    />
                  )}
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="info_sellercard_bottom">card bottom</div>
    </div>
  );
}
