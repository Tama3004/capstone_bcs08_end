import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrComments: [],
  saoCongViec: 0,
  danhGia: 0,
};

const commentsReducer = createSlice({
  name: "commentsReducer",
  initialState,
  reducers: {
    getComments: (state, actions) => {
      state.arrComments = actions.payload;
    },
    setSaoCongViec: (state, actions) => {
      state.saoCongViec = actions.payload;
    },
    setDanhGia: (state, actions) => {
      state.danhGia = actions.payload;
    },
  },
});

export const { getComments, setSaoCongViec, setDanhGia } =
  commentsReducer.actions;
export default commentsReducer.reducer;
