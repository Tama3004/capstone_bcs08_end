import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { https } from "../../api/config";
import { setLogin } from "../../redux/Reducer/userReducer";
import { userLocalStorage } from "../../api/localService";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    https
      .post("/api/auth/signin", values)
      .then((res) => {
        console.log(res);
        dispatch(setLogin(res.data.content));
        userLocalStorage.set(res.data.content);
        message.success("Đăng nhập thành công");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        message.error("Đăng nhập thất bại. Sai tài khoản hoặc mặt khẩu");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      className=""
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" className="bg-red-500" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
