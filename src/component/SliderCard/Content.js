import React from "react";
import { Button, Input, Space } from "antd";
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);
const Content = () => (
  <div className="space-y-10 mr-52">
    <p className="text-white text-6xl font-bold">
      Find the perfect <i>freelance</i> services for your business
    </p>
    <Space className="w-full" direction="vertical">
      <Search
        placeholder="Try 'building mobile app'"
        allowClear
        enterButton={
          <Button
            style={{ backgroundColor: "green", borderColor: "green" }}
            type="primary"
          >
            Search
          </Button>
        }
        size="large"
        onSearch={onSearch}
      />
    </Space>
    <div className="text-white font-bold flex space-x-7 items-center">
      <p>Popular: </p>
      <div>
        <button className="rounded-3xl border-2 px-3 py-1">
          Website Design
        </button>
      </div>
      <div>
        <button className="rounded-3xl border-2 px-3 py-1">WordPress</button>
      </div>
      <div>
        <button className="rounded-3xl border-2 px-3 py-1">Logo Design</button>
      </div>
      <div>
        <button className="rounded-3xl border-2 px-3 py-1">
          Video Editing
        </button>
      </div>
    </div>
  </div>
);
export default Content;
