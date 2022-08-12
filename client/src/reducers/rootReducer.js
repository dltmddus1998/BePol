import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import modalReducer from "./modalSlice";
import userInfoReducer from "./userInfoSlice";
import notificationReducer from "./notificationSlice";

const rootReducer = combineReducers({
  login: loginReducer,
  modal: modalReducer,
  user: userInfoReducer,
  notification: notificationReducer,
});

export default rootReducer;
