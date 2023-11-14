import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../api/config";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../redux/Reducer/commentsReducer";
import { Progress, Rate } from "antd";

export default function Comment() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let { arrComments } = useSelector((state) => {
    return state.commentsReducer;
  });

  let { saoCongViec, danhGia } = useSelector((state) => {
    return state.commentsReducer;
  });

  //   let [danhGia, setDanhGia] = useState(0);
  //   let [saoCongViec, setSaoCongViec] = useState(0);

  useEffect(() => {
    let fetchDanhGiaData = () => {
      https
        .get(`/api/cong-viec/lay-cong-viec-chi-tiet/${id}`)
        .then((res) => {
          console.log(res.data.content);
          //   console.log(res.data.content[0].congViec.danhGia);
          //   setDanhGia(res.data.content[0].congViec.danhGia);
          //   setSaoCongViec(res.data.content[0].congViec.saoCongViec);
          //   console.log(res.data.content[0].congViec.saoCongViec);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    let fetchBinhLuanData = () => {
      https
        .get(`/api/binh-luan/lay-binh-luan-theo-cong-viec/${id}`)
        .then((res) => {
          console.log(res.data.content);
          dispatch(getComments(res.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchDanhGiaData();
    fetchBinhLuanData();
  }, [id]);

  const renderItem = () => {
    return arrComments?.map((item, index) => {
      return <div></div>;
    });
  };

  return (
    <div className="text-gray-500">
      <div className="rating-section mt-5">
        <div class="review-count lg:flex lg:justify-between">
          <div class="count flex items-center">
            <h2 class="me-2 mb-1 text-black text-2xl font-bold">
              {danhGia} Reviews
            </h2>
            <div className="star flex items-center">
              <Rate disabled value={saoCongViec} style={{ color: "orange" }} />
            </div>
            <div className="star-score font-bold text-orange-400 mx-1">
              {saoCongViec}
            </div>
          </div>
          <div class="sort flex items-center lg:px-3 text-lg">
            <span class="pre-title font-semibold">Sort By</span>
            <select className="cursor-pointer font-semibold outline-none">
              <option value="recent">Most Recent</option>
              <option value="relevant">Most Relevant</option>
            </select>
          </div>
        </div>
      </div>

      <div className="review-rating mt-3 row">
        <div className="col-md-6 col-sm-12">
          <div className="stars-counters">
            <tbody>
              <tr>
                <td class="star-title-container">
                  <p className="text-center border-none rounded-md text-blue-500 text-lg font-semibold px-2 py-1 mb-2 hover:bg-blue-100 cursor-pointer">
                    5 Stars
                  </p>
                </td>
                <td className="process-bar-container w-full p-2">
                  <Progress
                    percent={danhGia - 10}
                    showInfo={false}
                    strokeColor={"orange"}
                  />
                </td>
                <td class="star-num text-blue-500 text-lg pb-3">
                  ({danhGia - 10})
                </td>
              </tr>
              <tr>
                <td class="star-title-container">
                  <p className="text-center border-none rounded-md text-blue-500 text-lg font-semibold px-2 py-1 mb-2 hover:bg-blue-100 cursor-pointer">
                    4 Stars
                  </p>
                </td>
                <td className="process-bar-container w-full p-2">
                  <Progress
                    percent={4}
                    showInfo={false}
                    strokeColor={"orange"}
                  />
                </td>
                <td class="star-num text-blue-500 text-lg pb-3">(4)</td>
              </tr>
              <tr>
                <td class="star-title-container">
                  <p className="text-center border-none rounded-md text-blue-500 text-lg font-semibold px-2 py-1 mb-2 hover:bg-blue-100 cursor-pointer">
                    3 Stars
                  </p>
                </td>
                <td className="process-bar-container w-full p-2">
                  <Progress
                    percent={3}
                    showInfo={false}
                    strokeColor={"orange"}
                  />
                </td>
                <td class="star-num text-blue-500 text-lg pb-3">(3)</td>
              </tr>
              <tr>
                <td class="star-title-container">
                  <p className="text-center border-none rounded-md text-blue-500 text-lg font-semibold px-2 py-1 mb-2 hover:bg-blue-100 cursor-pointer">
                    2 Stars
                  </p>
                </td>
                <td className="process-bar-container w-full p-2">
                  <Progress
                    percent={2}
                    showInfo={false}
                    strokeColor={"orange"}
                  />
                </td>
                <td class="star-num text-blue-500 text-lg pb-3">(2)</td>
              </tr>
              <tr>
                <td class="star-title-container">
                  <p className="text-center border-none rounded-md text-blue-500 text-lg font-semibold px-2 py-1 mb-2 hover:bg-blue-100 cursor-pointer">
                    1 Stars
                  </p>
                </td>
                <td className="process-bar-container w-full p-2">
                  <Progress
                    percent={1}
                    showInfo={false}
                    strokeColor={"orange"}
                  />
                </td>
                <td class="star-num text-blue-500 text-lg pb-3">(1)</td>
              </tr>
            </tbody>
          </div>
        </div>

        <div class="col-sm-12 col-md-6">
          <div class="ranking">
            <h1 className="text-black text-lg font-semibold mt-1 mb-3">
              Rating Breakdown
            </h1>
            <ul>
              <li class="flex justify-between pb-2">
                <p className="text-lg font-semibold">
                  Seller communication level
                </p>
                <div class="flex items-center">
                  <span class="star">
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#ffb33e"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"
                      ></path>
                    </svg>
                  </span>
                  <span class="star-score font-bold text-orange-400 mx-1">
                    2
                  </span>
                </div>
              </li>
              <li class="flex justify-between pb-2">
                <p className="text-lg font-semibold">Recommend to a friend</p>
                <div class="flex items-center">
                  <span class="star">
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#ffb33e"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"
                      ></path>
                    </svg>
                  </span>
                  <span class="star-score font-bold text-orange-400 mx-1">
                    2
                  </span>
                </div>
              </li>
              <li class="flex justify-between pb-2">
                <p className="text-lg font-semibold">Service as described</p>
                <div class="flex items-center">
                  <span class="star">
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#ffb33e"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"
                      ></path>
                    </svg>
                  </span>
                  <span class="star-score font-bold text-orange-400 mx-1">
                    2
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
