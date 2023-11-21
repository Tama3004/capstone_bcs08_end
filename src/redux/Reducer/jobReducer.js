import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrLoaiCongViec: [],
  jobTitleDetail: [],
  detailCongViec: [],
};

const jobReducer = createSlice({
  name: "jobReducer",
  initialState,
  reducers: {
    getMenuLoaiCongViec: (state, actions) => {
      state.arrLoaiCongViec = actions.payload;
    },
    getJobDetail: (state, actions) => {
      state.jobTitleDetail = actions.payload;
    },
    getDetailCongViec: (state, actions) => {
      state.detailCongViec = actions.payload;
    },
  },
});

export const { getMenuLoaiCongViec, getJobDetail, getDetailCongViec } =
  jobReducer.actions;
export default jobReducer.reducer;
