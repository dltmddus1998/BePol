import mongoose from "mongoose";
import User from "../models/user.js";

export const getUsername = async (userId) => {
  try {
    const { username } = await User.findById(userId, "username").exec();
    return username;
  } catch (err) {
    return null;
  }
};

export const findUser = async (code) => {
  try {
    const user = await User.findOne({ code });
    if (user) return user;
    else return { _id: null };
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (code, username, gender, age, email) => {
  try {
    const newUser = await User.create({ code, username, gender, age, email });
    return newUser.toObject();
  } catch (err) {
    console.log(err);
  }
};
