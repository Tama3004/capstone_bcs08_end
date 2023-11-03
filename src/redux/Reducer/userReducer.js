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
    updateUser: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { setLogin, updateUser } = userReducer.actions;

export default userReducer.reducer;
