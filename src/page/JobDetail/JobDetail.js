import React from "react";
import ListPackage from "./ListPackage";
import DetailPackage from "./DetailPackage";
import Comment from "./Comment";

export default function JobDetail() {
  return (
    <section className="jobDetail-page py-28 lg:py-9 container">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="lg:w-1/2">
          <ListPackage />
          <Comment />
        </div>
        <div className="lg:w-1/3 right-1 bottom-0 top-52 fixed hidden lg:block overflow-y-scroll">
          <DetailPackage />
        </div>
      </div>
    </section>
  );
}
