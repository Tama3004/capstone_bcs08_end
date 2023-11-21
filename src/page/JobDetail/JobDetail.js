import React from "react";
import ListPackage from "./ListPackage";
import DetailPackage from "./DetailPackage";
import Comment from "./Comment";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";

export default function JobDetail() {
  let { jobTitleDetail, detailCongViec } = useSelector((state) => {
    return state.jobReducer;
  });

  return (
    <section className="jobDetail-page py-28 lg:py-9 container">
      <Breadcrumb
        items={[
          {
            href: `/title/${jobTitleDetail?.id || 1}`,
            title: (
              <>
                <span>
                  {jobTitleDetail?.tenLoaiCongViec || "Graphics & Design"}
                </span>
              </>
            ),
          },
          {
            href: `/categories/${detailCongViec?.congViec?.maChiTietLoaiCongViec}`,
            title: (
              <>
                <span>{detailCongViec?.tenChiTietLoai}</span>
              </>
            ),
          },
          {
            href: `/jobDetail/${detailCongViec?.congViec?.id}`,
            title: (
              <>
                <span>{detailCongViec?.congViec?.tenCongViec}</span>
              </>
            ),
          },
        ]}
      />
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
