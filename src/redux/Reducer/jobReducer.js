import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrLoaiCongViec: [],
  JobRent: [],
  jobTitleDetail: [],
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
    getJobRent: (state, actions) => {
      state.JobRent = actions.payload;
    },
  },
});

export const { getMenuLoaiCongViec, getJobDetail, getJobRent } =
  jobReducer.actions;
export default jobReducer.reducer;
