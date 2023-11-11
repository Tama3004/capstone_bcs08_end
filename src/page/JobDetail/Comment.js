import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../api/config";
import { useDispatch, useSelector } from "react-redux";
import { setComments } from "../../redux/Reducer/commentsReducer";
import { Progress, Rate, message } from "antd";
import moment from "moment/moment";
import { userLocalStorage } from "../../api/localService";

export default function Comment() {
  let { id } = useParams();
  let dispatch = useDispatch();

  let { saoCongViec, danhGia, arrComments } = useSelector((state) => {
    return state.commentsReducer;
  });

  let { userLogin } = useSelector((state) => {
    return state.userReducer;
  });

  const [postComment, setPostComment] = useState({
    id: 0,
    maCongViec: id,
    maNguoiBinhLuan: userLogin?.user.id,
    ngayBinhLuan: moment().format("DD/MM/YYYY"),
    noiDung: "",
    saoBinhLuan: 3,
  });

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
          dispatch(setComments(res.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchDanhGiaData();
    fetchBinhLuanData();
  }, [id]);

  let handleChangeForm = (e) => {
    setPostComment({
      ...postComment,
      noiDung: e.target.value,
    });
  };

  let handlePostComment = () => {
    if (userLogin) {
      https
        .post("/api/binh-luan", postComment, {
          headers: {
            token: userLocalStorage.get().token,
          },
        })
        .then((res) => {
          console.log(res);
          https
            .get(`/api/binh-luan/lay-binh-luan-theo-cong-viec/${id}`)
            .then((res) => {
              console.log(res.data.content);
              dispatch(setComments(res.data.content));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(postComment);
    } else {
      message.info("Vui lòng đăng nhập");
    }
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
          <div className="reviewer-comment col-9">
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
            <div className="reviewer-country flex items-center mb-4">
              <img
                width={20}
                height={20}
                src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1ed.png"
                alt
                className="country-flag"
              />
              <div class="country-name ms-2">Switzerland</div>
            </div>
            <div className="comment mb-3">
              <p className="text-gray-600 text-lg">{item.noiDung}</p>
            </div>
            <div class="reviewer-helpful flex items-center gap-2">
              <div class="helpful-title text-gray-700 font-semibold">
                Helpful?
              </div>
              <div class="helpful-thumb flex items-center gap-2">
                <div class="yes flex items-center gap-1 cursor-pointer">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11.89 14.75H1C0.59 14.75 0.25 14.41 0.25 14V8C0.25 7.59 0.59 7.25 1 7.25H3.46L6.05 0.72C6.16 0.43 6.44 0.25 6.75 0.25H7.67C8.59 0.25 9.34 0.98 9.34 1.87V5.45H13.17C14 5.45 14.78 5.84 15.27 6.48C15.73 7.1 15.87 7.87 15.66 8.6L14.39 12.93C14.08 13.99 13.06 14.74 11.9 14.74L11.89 14.75ZM4.75 13.25H11.89C12.38 13.25 12.81 12.95 12.94 12.52L14.21 8.19C14.32 7.81 14.16 7.52 14.06 7.39C13.85 7.12 13.53 6.96 13.16 6.96H8.58C8.17 6.96 7.83 6.62 7.83 6.21V1.87C7.83 1.81 7.76 1.75 7.66 1.75H7.25L4.74 8.08V13.25H4.75ZM1.75 13.25H3.25V8.75H1.75V13.25V13.25Z"></path>
                  </svg>
                  <span className="font-semibold">Yes</span>
                </div>
                <div class="no flex items-center gap-1 cursor-pointer">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.25533 14.75H8.33533C7.41533 14.75 6.66533 14.03 6.66533 13.13L6.66533 9.55H2.83533C2.00533 9.55 1.22533 9.16 0.735326 8.52C0.275326 7.9 0.135326 7.13 0.345326 6.4L1.62533 2.06C1.93533 1 2.95533 0.25 4.11533 0.25L15.0053 0.25C15.4153 0.25 15.7553 0.59 15.7553 1V7C15.7553 7.41 15.4153 7.75 15.0053 7.75H12.5453L9.95533 14.28C9.84533 14.57 9.56533 14.75 9.25533 14.75ZM4.11533 1.75C3.62533 1.75 3.19533 2.05 3.06533 2.48L1.79533 6.81C1.68533 7.19 1.84533 7.48 1.94533 7.61C2.15533 7.88 2.47533 8.04 2.84533 8.04H7.42533C7.83533 8.04 8.17533 8.38 8.17533 8.79L8.17533 13.12C8.17533 13.17 8.24533 13.24 8.34533 13.24H8.75533L11.2653 6.91V1.75L4.11533 1.75ZM12.7553 6.25H14.2553V1.75L12.7553 1.75V6.25Z"></path>
                  </svg>
                  <span className="font-semibold">No</span>
                </div>
              </div>
            </div>
          </div>
          <div className="reviewer-comment-del col-1">
            <span className="cursor-pointer transition duration-200 hover:text-red-400">
              <svg
                className="svg-inline--fa fa-xing"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="xing"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                data-fa-i2svg
              >
                <path
                  fill="currentColor"
                  d="M162.7 210c-1.8 3.3-25.2 44.4-70.1 123.5-4.9 8.3-10.8 12.5-17.7 12.5H9.8c-7.7 0-12.1-7.5-8.5-14.4l69-121.3c.2 0 .2-.1 0-.3l-43.9-75.6c-4.3-7.8.3-14.1 8.5-14.1H100c7.3 0 13.3 4.1 18 12.2l44.7 77.5zM382.6 46.1l-144 253v.3L330.2 466c3.9 7.1.2 14.1-8.5 14.1h-65.2c-7.6 0-13.6-4-18-12.2l-92.4-168.5c3.3-5.8 51.5-90.8 144.8-255.2 4.6-8.1 10.4-12.2 17.5-12.2h65.7c8 0 12.3 6.7 8.5 14.1z"
                />
              </svg>
            </span>
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
            <h2 class="me-2 mb-1 text-gray-800 text-2xl font-bold">
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
            <h1 className="text-gray-800 text-lg font-semibold mt-1 mb-3">
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
        <h3 className="text-gray-800 text-2xl font-bold mb-7">Filters</h3>

        <form className="search-form flex max-w-[350px]">
          <input
            className="w-[25rem] py-2 pr-[2px] pl-3 outline-none border border-gray-600 rounded-l-[4px] text-lg"
            type="text"
            name="search"
            placeholder="Search reviews"
          />
          <button type="button" className="bg-black rounded-r-[4px] py-2 px-4">
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

      <div className="add-comment py-4">
        <div className="comment-rating mb-4 flex items-center justify-between">
          <h2 class="text-gray-800 text-2xl font-bold">Leave some comments</h2>
          <div className="flex items-center gap-1">
            <Rate
              defaultValue={3}
              onChange={(value) => {
                setPostComment({
                  ...postComment,
                  saoBinhLuan: value ? value : 0,
                });
              }}
            />
            <h2 className="text-gray-800 text-2xl font-bold">Rating</h2>
          </div>
        </div>

        <form>
          <textarea
            className="min-h-[6rem] w-full resize-y border border-gray-900 rounded-md py-2 px-3 text-gray-500"
            required=""
            name="noiDung"
            id=""
            cols="100"
            rows="5"
            onChange={handleChangeForm}
          ></textarea>
          <button
            type="button"
            class="comment-submit bg-green-500 rounded-md mt-2 text-white font-medium py-2 px-3"
            onClick={handlePostComment}
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}
