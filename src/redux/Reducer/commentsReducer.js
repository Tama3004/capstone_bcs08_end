import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrComments: [],
  saoCongViec: 0,
  danhGia: 0,
  giaTien: 0,
  moTaNgan: "",
};

const commentsReducer = createSlice({
  name: "commentsReducer",
  initialState,
  reducers: {
    setComments: (state, actions) => {
      state.arrComments = actions.payload;
    },
    setSaoCongViec: (state, actions) => {
      state.saoCongViec = actions.payload;
    },
    setDanhGia: (state, actions) => {
      state.danhGia = actions.payload;
    },
    setGiaTien: (state, actions) => {
      state.giaTien = actions.payload;
    },
    setMotaNgan: (state, actions) => {
      state.moTaNgan = actions.payload;
    },
  },
});

export const {
  setComments,
  setSaoCongViec,
  setDanhGia,
  setGiaTien,
  setMotaNgan,
} = commentsReducer.actions;
export default commentsReducer.reducer;
