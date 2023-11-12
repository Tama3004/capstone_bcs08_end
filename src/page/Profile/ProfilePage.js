import React, { useEffect } from "react";
import UserInfo from "./UserInfo";
import ListJob from "./ListJob";
import { useSelector } from "react-redux";
import { message } from "antd";

export default function ProfilePage() {
  let { userLogin } = useSelector((state) => {
    return state.userReducer;
  });

  useEffect(() => {
    if (!userLogin) {
      window.location.href = "/login";
      message.warning("Yêu cầu đăng nhập!");
    }
  }, [userLogin]);

  return (
    <section className="profile-page container py-28">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="lg:w-2/5 lg:pr-3">
          <UserInfo />
        </div>
        <div className="lg:w-3/5 lg:pl-5">
          <ListJob />
        </div>
      </div>
    </section>
  );
}
