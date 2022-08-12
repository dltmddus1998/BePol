import { createSlice } from "@reduxjs/toolkit";

const name = "notification";
const initialState = {
  socketId: null,
  notifications: [],
  seen: true,
};

export const notificationSlice = createSlice({
  name,
  initialState,
  reducers: {
    socketConnect: (state, action) => {
      state.socketId = action.payload;
    },
    newComment: (state, action) => {
      if (state.notifications.length > 3) state.notifications.pop();
      state.notifications.unshift(action.payload);
    },
    checkNotification: (state, action) => {
      state.seen = action.payload;
    },
  },
});

export const { socketConnect, newComment, checkNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
