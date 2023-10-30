import React from "react";
import { Button, Form, Input, DatePicker, Select, message } from "antd";
import { https } from "../../api/config";
import { useNavigate } from "react-router-dom";
import moment from "moment";

export default function RegForm() {
  let navigate = useNavigate();
  const onFinish = (values) => {
    const { birthday } = values;
    const formattedBirthday = moment(birthday).format("DD/MM/YYYY");
    const dataToSend = {
      ...values,
      birthday: formattedBirthday,
    };

    https
      .post("/api/auth/signup", dataToSend)
      .then((res) => {
        console.log(res);
        message.success("Đăng ký thành công");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        message.error("Email đã tồn tại");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Option } = Select;
  return (
    <div className="container">
      <Form
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
          name={["name"]}
          label="Name"
          rules={[
            {
              required: true,
              message: "Tên không được để trống",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "E-mail không đúng dinh dạng",
            },
            {
              required: true,
              message: "E-mail không được để trống",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Password không được để trống",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Hãy nhập lại password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Password không chính xác"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Số điện thoại không được để trống" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="birthday"
          label="Ngày sinh"
          rules={[{ required: true, message: "Ngày sinh không được để trống" }]}
        >
          <DatePicker className="w-full" format="DD/MM/YYYY" />
        </Form.Item>
        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[
            {
              required: true,
              message: "Không được để trống",
            },
          ]}
        >
          <Select className="text-left" placeholder="Chọn giới tính" allowClear>
            <Option value="true">Male</Option>
            <Option value="false">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 12,
          }}
        >
          <Button type="primary" className="bg-red-500" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
