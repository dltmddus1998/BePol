import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const name = "login";
const initialState = {
  isLogin: false,
  accessToken: "",
};

export const loginSlice = createSlice({
  name,
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
