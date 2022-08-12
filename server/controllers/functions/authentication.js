import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (token) => {
  try {
    return jsonwebtoken.verify(token, process.env.ACCESS_SECRET);
  } catch (e) {
    return null;
  }
};
export const encodeToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: "1h",
  });
};
