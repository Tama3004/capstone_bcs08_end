import { createSlice } from "@reduxjs/toolkit";
import { userLocalStorage } from "../../api/localService";

const initialState = {
  userLogin: userLocalStorage.get(),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setLogin: (state, actions) => {
      state.userLogin = actions.payload;
    },
  },
});

export const { setLogin } = userReducer.actions;

export default userReducer.reducer;
