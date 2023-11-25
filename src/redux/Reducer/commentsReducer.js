import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  arrComments: [],
};

const commentsReducer = createSlice({
  name: "commentsReducer",
  initialState,
  reducers: {
    setComments: (state, actions) => {
      state.arrComments = actions.payload;
    },
  },
});

export const { setComments } = commentsReducer.actions;
export default commentsReducer.reducer;
