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
  let [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let fetchDanhGiaData = () => {
      https
        .get(`/api/cong-viec/lay-cong-viec-chi-tiet/${id}`)
        .then((res) => {
          console.log(res.data.content);
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

  let handleChange = (e) => {
    if (e.target.name == "search") {
      setSearchInput(e.target.value);
    }
  };

  let handleSearchOnclick = () => {
    console.log(searchInput);
    console.log(arrComments);
  };

  const renderItem = () => {
    return arrComments?.map((item, index) => {
      return (
        <li className="row py-4 border-b border-gray-400" key={index}>
          <div className="reviewer-avatar col-2">
            {item.avatar.length === 0 && (
              <div className="rounded-full bg-gray-400 font-semibold text-white text-lg flex justify-center items-center w-10 h-10 border-[1px] border-gray-700">
                <p className="uppercase">
                  {item.tenNguoiBinhLuan?.slice(0, 1)}
                </p>
              </div>
            )}
            {item.avatar.length > 0 && (
              <img
                src={item.avatar}
                alt="..."
                className="rounded-full w-10 h-10"
              />
            )}
          </div>
          <div className="reviewer-comment col-10">
            <div className="reviewer-name flex items-center mb-2">
              <h3 className="mr-2 text-gray-700 text-lg font-semibold">
                {item.tenNguoiBinhLuan}
              </h3>
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
                {item.saoBinhLuan}
              </span>
            </div>
            <div className="reviewer-country flex items-center mb-3">
              <img
                width={20}
                height={20}
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ed.png"
                alt
                className="country-flag"
              />
              <div class="country-name ms-2">Switzerland</div>
            </div>
            <div className="comment">
              <p className="mb-2 text-gray-600 text-lg">{item.noiDung}</p>
            </div>
          </div>
        </li>
      );
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
            <select className="cursor-pointer font-semibold outline-none text-gray-800">
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

      <div className="review-filter mt-5 p-5 border-b border-gray-400">
        <h3 className="text-black text-2xl font-bold mb-7">Filters</h3>

        <form className="search-form flex max-w-[350px]">
          <input
            className="w-[25rem] py-2 pr-[2px] pl-3 outline-none border border-gray-600 rounded-l-[4px] text-lg"
            name="search"
            type="text"
            placeholder="Search reviews"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleSearchOnclick}
            className="bg-black rounded-r-[4px] py-2 px-4"
          >
            <span>
              <svg
                className=" fill-white"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.8906 14.6531L12.0969 10.8594C12.025 10.7875 11.9313 10.75 11.8313 10.75H11.4187C12.4031 9.60938 13 8.125 13 6.5C13 2.90937 10.0906 0 6.5 0C2.90937 0 0 2.90937 0 6.5C0 10.0906 2.90937 13 6.5 13C8.125 13 9.60938 12.4031 10.75 11.4187V11.8313C10.75 11.9313 10.7906 12.025 10.8594 12.0969L14.6531 15.8906C14.8 16.0375 15.0375 16.0375 15.1844 15.8906L15.8906 15.1844C16.0375 15.0375 16.0375 14.8 15.8906 14.6531ZM6.5 11.5C3.7375 11.5 1.5 9.2625 1.5 6.5C1.5 3.7375 3.7375 1.5 6.5 1.5C9.2625 1.5 11.5 3.7375 11.5 6.5C11.5 9.2625 9.2625 11.5 6.5 11.5Z" />
              </svg>
            </span>
          </button>
        </form>
      </div>

      <div class="review-comment p-3">
        <ul className="review-comment-list">{renderItem()}</ul>
      </div>
    </div>
  );
}
