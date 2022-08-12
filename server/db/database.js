import mongoose from "mongoose";
import config from "../config/config.js";

export default async () => {
  const connection = mongoose.connect(config.database.url);

  return connection;
};
