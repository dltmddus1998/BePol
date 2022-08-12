import { createSlice } from "@reduxjs/toolkit";

const name = "modal";
const initialState = {
  loginModal: false,
  statisticsModal: false,
};

export const modalSlice = createSlice({
  name,
  initialState,
  reducers: {
    showLoginModal: (state, action) => {
      state.loginModal = action.payload;
    },
    showStatisticsModal: (state, action) => {
      state.statisticsModal = action.payload;
    },
  },
});

export const { showLoginModal, showStatisticsModal } = modalSlice.actions;
export default modalSlice.reducer;
