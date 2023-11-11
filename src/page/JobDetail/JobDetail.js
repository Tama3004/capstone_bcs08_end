import React from "react";
import ListPackage from "./ListPackage";
import DetailPackage from "./DetailPackage";
import Comment from "./Comment";

export default function JobDetail() {
  return (
    <div className="py-28 lg:py-9 container">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="lg:w-2/4">
          <ListPackage />
          <Comment />
        </div>
        <div className="lg:w-1/3 right-1 bottom-0 top-52 fixed hidden lg:block overflow-y-scroll">
          <div className=" ">
            <DetailPackage />
          </div>
        </div>
      </div>
    </div>
  );
}
