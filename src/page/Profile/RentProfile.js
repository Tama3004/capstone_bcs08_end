import React, { useEffect } from "react";
import { https } from "../../api/config";
import { useDispatch, useSelector } from "react-redux";
import { getJobRent } from "../../redux/Reducer/jobReducer";
import { message } from "antd";
import { userLocalStorage } from "../../api/localService";

export default function RentProfile() {
  let dispatch = useDispatch();
  let { JobRent } = useSelector((state) => {
    return state.jobReducer;
  });
  let fetch = () => {
    https
      .get("/api/thue-cong-viec/lay-danh-sach-da-thue", {
        headers: {
          token: userLocalStorage.get().token,
        },
      })
      .then((res) => {
        console.log(res.data.content);
        dispatch(getJobRent(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch();
  }, []);
  let handleDelete = (id) => {
    https
      .delete(`/api/thue-cong-viec/${id}`)
      .then((res) => {
        message.success("Xoa thành công");
        fetch();
      })
      .catch((err) => {
        message.error("Đã xảy ra lỗi");
      });
  };
  let renderJobRent = () => {
    return JobRent?.map((item, index) => {
      return (
        <div key={index}>
          <div className="border-2 mb-4">
            <div className="flex justify-between py-4">
              <img className="px-4" src={item.congViec.hinhAnh} alt="" />
              <div className="px-4">
                <p className="text-2xl font-bold">
                  {item.congViec.tenCongViec}
                </p>
                <p className="py-3 text-lg">{item.congViec.moTaNgan}</p>
                <div className="flex justify-between">
                  <div className="flex space-x-3">
                    <p>{item.congViec.saoCongViec}</p>
                    <p>({item.congViec.danhGia})</p>
                  </div>
                  <div>
                    <p className="text-2xl">${item.congViec.giaTien}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-5 px-4 pb-2">
              <button className="border-2 py-2 px-3 bg-green-500 text-white rounded-lg font-bold">
                View Detail
              </button>
              <button
                onClick={() => {
                  handleDelete(item.id);
                }}
                className="border-2 py-2 px-3 bg-red-500 text-white rounded-lg font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="w-2/3">
      <div className="flex py-4 px-5 border-2 justify-between items-center">
        <p className="text-2xl font-bold">
          It seems that you don't have any active Gigs.
        </p>
        <button className="border-2 py-2 px-5 text-lg rounded-lg text-white font-bold bg-green-500">
          Create a new Cig
        </button>
      </div>
      <div className="py-10">{renderJobRent()}</div>
    </div>
  );
}
