import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const name = "user";
const initialState = {
  userInfo: {
    id: "",
    username: "",
  },
};

export const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { getUserInfo } = userSlice.actions;
export default userSlice.reducer;
