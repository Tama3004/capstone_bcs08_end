import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrLoaiCongViec: [],
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
  },
});

export const { getMenuLoaiCongViec, getJobDetail } = jobReducer.actions;
export default jobReducer.reducer;
