import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { https } from "../../api/config";
import { Dropdown, Modal, Radio, Upload, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { userLocalStorage } from "../../api/localService";
import { updateUser } from "../../redux/Reducer/userReducer";

export default function UserInfo() {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    userLocalStorage.remove();
    message.success("Đăng xuất thành công!");
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
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

  let [changeInfo, setChangeInfo] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    role: "",
    skill: [],
    certification: [],
    bookingJob: [],
  });

  const getUserInfo = () => {
    https
      .get(`/api/users/${userLogin?.user.id}`)
      .then((res) => {
        setInfoSeller(res.data.content);
        setChangeInfo({
          id: res.data.content.id,
          name: res.data.content.name,
          email: res.data.content.email,
          phone: res.data.content.phone,
          birthday: res.data.content.birthday,
          gender: res.data.content.gender,
          role: res.data.content.role,
          skill: res.data.content.skill,
          certification: res.data.content.certification,
          bookingJob: res.data.content.bookingJob,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let fetchData = () => {
      getUserInfo();
    };
    fetchData();
  }, [userLogin]);

  const handleChangeAvatar = (file) => {
    const formData = new FormData();
    formData.append("formFile", file);
    https
      .post(`/api/users/upload-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: userLocalStorage.get().token,
        },
      })
      .then((res) => {
        const userLoginData = userLocalStorage.get();
        userLoginData.user.avatar = res.data.content.avatar;
        userLocalStorage.set(userLoginData);
        dispatch(updateUser(userLoginData));
        message.success("Cập nhật avatar thành công!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Có lỗi xảy ra!");
      });
  };

  let handleChangeForm = (e) => {
    const { name, value } = e.target;
    if (name == "skill" || name == "certification" || name == "bookingJob") {
      setChangeInfo({
        ...changeInfo,
        [name]: [value],
      });
    } else {
      setChangeInfo({
        ...changeInfo,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    console.log(changeInfo);
    https
      .put(`/api/users/${infoSeller.id}`, changeInfo, {
        headers: {
          token: userLocalStorage.get().token,
        },
      })
      .then((res) => {
        getUserInfo();
        message.success("Cập nhật thành công!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Có lỗi xảy ra!");
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
                <Upload
                  className="label_inp hidden avatar-uploader absolute"
                  beforeUpload={handleChangeAvatar}
                  showUploadList={false}
                />
                <div className="image flex items-center justify-center bg-white text-white rounded-full w-full h-full">
                  {infoSeller?.avatar.length === 0 && (
                    <div className="rounded-full bg-gray-400 font-semibold text-white flex justify-center items-center w-40 h-40 border-[1px] border-gray-700">
                      <p className="uppercase">
                        {infoSeller?.name.slice(0, 1)}
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
            <div className="info_profile_label flex flex-col items-center">
              <p className="text-gray-800 text-xl font-bold">
                {infoSeller?.email}
              </p>
              <div className="btn_update">
                <div
                  className="edit text-gray-400 hover:text-black cursor-pointer"
                  onClick={showModal}
                >
                  <i class="fa-sharp fa-solid fa-pen"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="info_desc border-t border-gray-300 mt-6 pt-4">
            <div className="location flex justify-between mb-3">
              <div className="location_left text-gray-500">
                <i className="las la-map-marker-alt icon mr-3" />
                <span>From</span>
              </div>
              <div className="location_right text-gray-600 font-bold">
                <span>Vietnam</span>
              </div>
            </div>
            <div className="location flex justify-between mb-4">
              <div className="location_left text-gray-500">
                <i class="fa-solid fa-user icon mr-3"></i>
                <span>Member since</span>
              </div>
              <div className="location_right text-gray-600 font-bold">
                <span className="text">Oct2022</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="info_sellercard_bottom text-gray-500 leading-[2]">
        <div className="info_card bg-white p-7 border border-gray-500">
          <div className="inner_item border-b border-gray-300 mb-8 pb-3">
            <div className="inner_row flex items-center justify-between">
              <h3 className="text-gray-800 font-bold text-lg">Description</h3>
              <div
                className="edit text-gray-400 hover:text-black cursor-pointer"
                onClick={showModal}
              >
                <i class="fa-sharp fa-solid fa-pen"></i>
              </div>
            </div>
            <div className="flex items-center gap-14 pb-3">
              <h6 className="w-[40%] font-light text-lg text-gray-600">
                Name:
              </h6>
              <p class="lorem mb-1 text-base">{infoSeller?.name}</p>
            </div>
            <div className="flex items-center gap-14 pb-3">
              <h6 className="w-[40%] font-light text-lg text-gray-600">
                Phone:
              </h6>
              <p class="lorem mb-1 text-base">{infoSeller?.phone}</p>
            </div>
            <div className="flex items-center gap-14 pb-3">
              <h6 className="w-[40%] font-light text-lg text-gray-600">
                Birthday:
              </h6>
              <p class="lorem mb-1 text-base">{infoSeller?.birthday}</p>
            </div>
          </div>

          <div className="inner_item border-b border-gray-300 mb-8 pb-3">
            <div className="inner_row">
              <h3 className="text-gray-800 font-bold text-lg">Language</h3>
              <p class="lorem pt-1 mb-2 text-gray-600">
                English - <span className="text-gray-400">Basic</span>
              </p>
              <p class="lorem pt-2 mb-2 text-gray-600">
                Vietnamese (Tiếng Việt) -{" "}
                <span className="text-gray-400">Native/Bilingual</span>
              </p>
            </div>
          </div>

          <div className="inner_item border-b border-gray-300 mb-8 pb-3">
            <div className="inner_row flex items-center justify-between">
              <h3 className="text-gray-800 font-bold text-lg">Skills</h3>
              <div
                className="edit text-gray-400 hover:text-black cursor-pointer"
                onClick={showModal}
              >
                <i class="fa-sharp fa-solid fa-pen"></i>
              </div>
            </div>
            <p class="lorem pt-2 mb-2 text-gray-600">{infoSeller?.skill}</p>
          </div>
          <div className="inner_item border-b border-gray-300 mb-8 pb-3">
            <div className="inner_row flex items-center justify-between">
              <h3 className="text-gray-800 font-bold text-lg">Education</h3>
              <div
                className="edit text-gray-400 hover:text-black cursor-pointer"
                onClick={showModal}
              >
                <i class="fa-sharp fa-solid fa-pen"></i>
              </div>
            </div>
            <p class="lorem pt-2 mb-2 text-gray-600">CYPERSOFT</p>
          </div>
          <div className="inner_item border-b border-gray-300 mb-8 pb-3">
            <div className="inner_row flex items-center justify-between">
              <h3 className="text-gray-800 font-bold text-lg">Certification</h3>
              <div
                className="edit text-gray-400 hover:text-black cursor-pointer"
                onClick={showModal}
              >
                <i class="fa-sharp fa-solid fa-pen"></i>
              </div>
            </div>
            <p class="lorem pt-2 mb-2 text-gray-600">
              {infoSeller?.certification}
            </p>
          </div>

          <div className="inner_item mb-8 pb-3">
            <div className="inner_row">
              <h3 className="text-gray-800 font-bold text-lg">
                Linked Accounts
              </h3>
              <ul className="flex flex-col mt-2 text-gray-800">
                <li className="flex items-center mb-1 gap-3">
                  <i class="fa-brands fa-facebook"></i>
                  <a
                    href="#facebook"
                    className="no-underline hover:no-underline text-blue-500 cursor-pointer"
                  >
                    Facebook
                  </a>
                </li>
                <li className="flex items-center mb-1 gap-3">
                  <i class="fa-brands fa-google"></i>
                  <a
                    href="#google"
                    className="no-underline hover:no-underline text-blue-500 cursor-pointer"
                  >
                    Google
                  </a>
                </li>
                <li className="flex items-center mb-1 gap-3">
                  <i class="fa-brands fa-github"></i>
                  <a
                    href="#github"
                    className="no-underline hover:no-underline text-blue-500 cursor-pointer"
                  >
                    Github
                  </a>
                </li>
                <li className="flex items-center mb-1 gap-3">
                  <i class="fa-brands fa-twitter"></i>
                  <a
                    href="#twitter"
                    className="no-underline hover:no-underline text-blue-500 cursor-pointer"
                  >
                    Twitter
                  </a>
                </li>
                <li className="flex items-center mb-1 gap-3">
                  <i class="fa-brands fa-dribbble"></i>
                  <a
                    href="#dribbble"
                    className="no-underline hover:no-underline text-blue-500 cursor-pointer"
                  >
                    Dribbble
                  </a>
                </li>
                <li className="flex items-center mb-1 gap-3">
                  <i class="fa-brands fa-stack-overflow"></i>
                  <a
                    href="#stackoverflow"
                    className="no-underline hover:no-underline text-blue-500 cursor-pointer"
                  >
                    Stack Overflow
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        className="w-full h-full"
        width={"80%"}
        title={
          <p className="text-center font-bold text-xl border-b border-gray-300 pb-3">
            Update User
          </p>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <div className="flex flex-col gap-3 min-[300px]:gap-0 min-[300px]:flex-row min-[300px]:justify-end">
            <button
              className="bg-red-500 text-white font-bold rounded transition-all hover:shadow-lg mr-7 px-3 py-2"
              style={{ outline: "none" }}
              onClick={handleCancel}
            >
              CANCEL
            </button>
            <button
              className="bg-green-500 text-white font-bold rounded transition-all hover:shadow-lg px-3 py-2"
              style={{ outline: "none" }}
              onClick={handleSave}
            >
              SAVE
            </button>
          </div>,
        ]}
      >
        <div>
          <div className="top flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 pr-2">
              <div className="pb-4">
                <p className="text-sm text-gray-600">Email:</p>
                <input
                  name="email"
                  type="text"
                  value={changeInfo?.email}
                  disabled
                  className="border border-gray-400 rounded px-2 py-3 w-full text-gray-400 bg-gray-100"
                />
              </div>
              <div className="pb-4">
                <p className="text-sm text-gray-600">Name:</p>
                <input
                  name="name"
                  type="text"
                  autoComplete="off"
                  value={changeInfo?.name}
                  className="border border-gray-400 rounded hover:border-black px-2 py-3 w-full outline-blue-400"
                  onChange={handleChangeForm}
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 pl-2">
              <div className="pb-4">
                <p className="text-sm text-gray-600">Phone:</p>
                <input
                  name="phone"
                  type="text"
                  autoComplete="off"
                  value={changeInfo?.phone}
                  className="border border-gray-400 rounded hover:border-black px-2 py-3 w-full outline-blue-400"
                  onChange={handleChangeForm}
                />
              </div>
              <div className="pb-4">
                <p className="text-sm text-gray-600">Birthday:</p>
                <input
                  name="birthday"
                  type="text"
                  autoComplete="off"
                  value={changeInfo?.birthday}
                  className="border border-gray-400 rounded hover:border-black px-2 py-3 w-full outline-blue-400"
                  onChange={handleChangeForm}
                />
              </div>
            </div>
          </div>

          <div className="pb-4">
            <p className="text-sm text-gray-600">Gender:</p>
            <Radio.Group
              name="gender"
              onChange={handleChangeForm}
              value={changeInfo?.gender}
            >
              <Radio value={true}>Male</Radio>
              <Radio value={false}>Female</Radio>
            </Radio.Group>
          </div>
          <div className="bot flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 pr-2">
              <div className="pb-4">
                <p className="text-sm text-gray-600">Certification:</p>
                <input
                  name="certification"
                  type="text"
                  value={changeInfo?.certification}
                  autoComplete="off"
                  className="border border-gray-400 rounded hover:border-black px-2 py-3 w-full outline-blue-400"
                  onChange={handleChangeForm}
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 pl-2">
              <div className="pb-4">
                <p className="text-sm text-gray-600">Skill:</p>
                <input
                  name="skill"
                  type="text"
                  autoComplete="off"
                  value={changeInfo?.skill}
                  className="border border-gray-400 rounded hover:border-black px-2 py-3 w-full outline-blue-400"
                  onChange={handleChangeForm}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
