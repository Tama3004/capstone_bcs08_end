import { Button, Modal, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { https } from "../../api/config";
import { AiFillEdit, AiFillPlusCircle, AiFillCamera } from "react-icons/ai";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  FaLocationDot,
  FaPerson,
  FaFacebook,
  FaGoogle,
  FaGithub,
  FaTwitter,
} from "react-icons/fa6";
import { userLocalStorage } from "../../api/localService";
import { updateUser } from "../../redux/Reducer/userReducer";
import { useMediaQuery } from "react-responsive";

export default function InfoProfile() {
  const isMobile = useMediaQuery({ maxWidth: 480 });
  let dispatch = useDispatch();
  let { user } = useSelector((state) => {
    return state.userReducer.userLogin;
  });
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setVisible(true);
  };

  const handleUpload = (file) => {
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
        console.log(res.data.content.avatar);
        const userLoginData = userLocalStorage.get();
        userLoginData.user.avatar = res.data.content.avatar;
        userLocalStorage.set(userLoginData);
        dispatch(updateUser(userLoginData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (values) => {
    https
      .put(`/api/users/${user.id}`, values)
      .then((res) => {
        console.log(res.data.content);
        const userLoginData = userLocalStorage.get();
        const updatedUser = { ...userLoginData.user, ...values };
        const updatedUserLoginData = { ...userLoginData, user: updatedUser };
        userLocalStorage.set(updatedUserLoginData);
        dispatch(updateUser(updatedUserLoginData));
        message.success("Thay đổi thành công");
        handleCancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  const { Option } = Select;

  return (
    <div className={isMobile ? "w-full" : "w-1/3"}>
      <div className="border-2 p-4 mb-5">
        <div className="flex-col justify-center items-center text-center">
          <div>
            <Upload beforeUpload={handleUpload} showUploadList={false}>
              <Button className="relative-button w-56 h-56 rounded-full overflow-hidden p-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="absolute-img w-full h-full object-cover rounded-full"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <span className="absolute-span">
                    <AiFillCamera />
                  </span>
                )}
              </Button>
            </Upload>
          </div>
          <p className="text-xl font-bold">{user.email}</p>
          <Button
            className="relative-button border-none w-2"
            onClick={showModal}
          >
            <span className="absolute-span text-2xl text-center">
              <AiFillEdit></AiFillEdit>
            </span>
          </Button>
        </div>
        <hr />
        <div>
          <div className="flex justify-between py-3">
            <div className="flex space-x-2 items-center">
              <span>
                <FaLocationDot></FaLocationDot>
              </span>
              <p>From</p>
            </div>
            <p className="font-bold">VietNam</p>
          </div>
          <div className="flex justify-between">
            <div className="flex space-x-2 items-center">
              <span>
                <FaPerson></FaPerson>
              </span>
              <p>Member since</p>
            </div>
            <p className="font-bold">Oct2022</p>
          </div>
        </div>
      </div>
      <div className="border-2 p-4 mb-5">
        <div className="">
          <div className="flex justify-between items-center">
            <p className="font-bold">Description</p>
            <Button className="border-none w-1" onClick={showModal}>
              <span className="text-2xl">
                <AiFillEdit></AiFillEdit>
              </span>
            </Button>
          </div>
          <div className="flex justify-between items-center py-3">
            <p>Name:</p>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <p>Phone:</p>
            <span>{user.phone}</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <p>Birthday:</p>
            <span>{user.birthday}</span>
          </div>
        </div>
        <hr />
        <div className="py-3">
          <p className="font-bold">Languages</p>
          <p>
            English - <span> Basic</span>
          </p>
          <p className="pt-3">
            Vietnamese (Tiếng Việt) - <span>Native/Bilingual</span>
          </p>
        </div>
        <hr />
        <div className="flex justify-between py-3">
          <p className="font-bold">Skill</p>
          <Button className="border-none w-1" onClick={showModal}>
            <span className="text-2xl">
              <AiFillEdit></AiFillEdit>
            </span>
          </Button>
        </div>
        <hr />
        <div className="py-4">
          <div className="flex justify-between">
            <p className="font-bold">Education</p>
            <Button className="border-none w-1" onClick={showModal}>
              <span className="text-2xl">
                <AiFillEdit></AiFillEdit>
              </span>
            </Button>
          </div>
          <p>CYBERSOFT</p>
        </div>
        <hr />
        <div>
          <div className="flex justify-between py-3">
            <p className="font-bold">Certification</p>
            <Button className="border-none w-1" onClick={showModal}>
              <span className="text-2xl">
                <AiFillEdit></AiFillEdit>
              </span>
            </Button>
          </div>
        </div>
        <hr />
        <div className="py-3">
          <p className="font-bold">Linked Accounts</p>
          <div>
            <ul className="space-y-2">
              <li className="flex items-center space-x-3">
                <span>
                  <FaFacebook></FaFacebook>
                </span>
                <a href="">Facebook</a>
              </li>
              <li className="flex items-center space-x-3">
                <span>
                  <FaGoogle></FaGoogle>
                </span>
                <a href="">Google</a>
              </li>
              <li className="flex items-center space-x-3">
                <span>
                  <FaGithub></FaGithub>
                </span>
                <a href="">Github</a>
              </li>
              <li className="flex items-center space-x-3">
                <span>
                  <FaTwitter></FaTwitter>
                </span>
                <a href="">Twitter</a>
              </li>
              <li className="flex items-center space-x-3">
                <span>
                  <AiFillPlusCircle></AiFillPlusCircle>
                </span>
                <a href="">Dirbble</a>
              </li>
              <li className="flex items-center space-x-3">
                <span>
                  <AiFillPlusCircle></AiFillPlusCircle>
                </span>
                <a href="">Stack Overflow</a>
              </li>
            </ul>
          </div>
        </div>
        <>
          <Modal open={visible} onOk={form.submit} onCancel={handleCancel}>
            <Form className="py-5" form={form} onFinish={handleSubmit}>
              <Form.Item label="Email" name="email" initialValue={user.email}>
                <Input disabled />
              </Form.Item>
              <Form.Item label="Phone" name="phone" initialValue={user.phone}>
                <Input />
              </Form.Item>
              <Form.Item label="Name" name="name" initialValue={user.name}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Birthday"
                name="birthday"
                initialValue={user.birthday}
              >
                <Input />
              </Form.Item>
              <Form.Item name="gender" label="Giới tính">
                <Select
                  className="text-left"
                  placeholder="Chọn giới tính"
                  allowClear
                >
                  <Option value="true">Male</Option>
                  <Option value="false">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Certification"
                name="certification"
                initialValue={user.certification}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Skill" name="skill" initialValue={user.skill}>
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </>
      </div>
    </div>
  );
}
