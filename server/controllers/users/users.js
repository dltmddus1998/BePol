import axios from "axios";
import dotenv from "dotenv";
import * as userRepository from "../../services/user.js";
import { encodeToken } from "../functions/authentication.js";
dotenv.config();

export const login = async (req, res) => {
  /**
   * 기능: 소셜로그인
   * 작성자: 나수민
   * 카카오 oauth 토큰 발급과 사용자 정보 요청
   */
  try {
    const response = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        code: req.body.code,
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      },
    });

    if (response) {
      const data = await axios({
        method: "post",
        url: "https://kapi.kakao.com/v2/user/me",
        headers: {
          authorization: `Bearer ${response.data.access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      if (data) {
        const user = await userRepository.findUser(data.data.id);

        if (user) {
          if (user._id) {
            const accessToken = encodeToken({
              id: user._id,
              username: user.username,
            });
            res.header("authorization", `Bearer ${accessToken}`);

            res.json({
              message: "Logged in successfully!",
              isUser: true,
              data: { id: user._id, username: user.username },
            });
          } else {
            res.json({
              message: "You should sign up",
              isUser: false,
              data: {
                subId: data.data.id,
                username: data.data.properties.nickname,
                email: data.data.kakao_account.email,
              },
            });
          }
        } else {
          res.sendStatus(500);
        }
      } else {
        res.status(401).json({ message: "Invalid access token" });
      }
    } else {
      res.status(401).json({ message: "Invalid authorization code" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export const logout = (req, res) => {
  delete req.headers["authorization"];
  res.status(200).json({ message: "Logged out!!" });
};

export const signup = async (req, res) => {
  try {
    const { subId, username, gender, age, email } = req.body;
    const newUser = await userRepository.createUser(
      subId,
      username,
      gender,
      age,
      email
    );
    if (newUser) {
      const accessToken = encodeToken({
        id: newUser._id,
        username: newUser.username,
      });
      res.header("authorization", `Bearer ${accessToken}`);
      res.json({
        message: "Account created",
        data: {
          id: newUser._id,
          username: newUser.username,
        },
      });
    } else res.sendStatus(500);
  } catch (err) {
    res.sendStatus(500);
  }
};
